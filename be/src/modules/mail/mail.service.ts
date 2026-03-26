import {
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../config/prisma.service';
import * as nodemailer from 'nodemailer';

type SendMailInput = {
  to: string;
  subject: string;
  content?: string;
  html?: string;
};

type SendMailResult = {
  messageId: string;
  to: string;
  subject: string;
};

@Injectable()
export class MailService implements OnModuleInit {
  private readonly logger = new Logger(MailService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  onModuleInit() {
    const resendApiKey = this.configService.get<string>('RESEND_API_KEY');
    const host = this.configService.get<string>('MAIL_HOST');
    const user = this.configService.get<string>('MAIL_USER');
    const pass = this.configService.get<string>('MAIL_PASS');
    const from = this.configService.get<string>('MAIL_FROM');

    if (!resendApiKey) {
      this.logger.warn(
        'RESEND_API_KEY chua duoc cau hinh. He thong se fallback sang SMTP.',
      );
    } else {
      this.logger.log('Mail provider: Resend API');
    }

    const smtpReady = Boolean(host && user && pass && from);
    if (!resendApiKey && !smtpReady) {
      this.logger.warn(
        'Thieu cau hinh gui mail: RESEND_API_KEY va SMTP (MAIL_HOST/MAIL_USER/MAIL_PASS/MAIL_FROM).',
      );
    }
  }

  async sendTestMail(input: SendMailInput): Promise<SendMailResult> {
    return this.sendWithRetry(input, 1);
  }

  async sendBusinessMailSafe(input: SendMailInput): Promise<void> {
    try {
      await this.sendWithRetry(input, 1);
    } catch {
      return;
    }
  }

  private createTransporter() {
    const host = this.configService.get<string>('MAIL_HOST');
    const port = Number(this.configService.get<string>('MAIL_PORT') ?? 587);
    const user = this.configService.get<string>('MAIL_USER');
    const pass = this.configService.get<string>('MAIL_PASS');
    const from = this.configService.get<string>('MAIL_FROM');

    if (!host || !user || !pass || !from) {
      throw new InternalServerErrorException(
        'Thieu cau hinh MAIL_HOST, MAIL_USER, MAIL_PASS hoac MAIL_FROM',
      );
    }

    return {
      transporter: nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
        connectionTimeout: 10_000,
        greetingTimeout: 10_000,
        socketTimeout: 15_000,
      }),
      from,
    };
  }

  private getResendConfig() {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    const from = this.configService.get<string>('MAIL_FROM');
    if (!apiKey || !from) {
      return null;
    }
    return { apiKey, from };
  }

  private async sendWithRetry(
    input: SendMailInput,
    retryCount: number,
  ): Promise<SendMailResult> {
    let lastError: unknown;
    const totalAttempts = retryCount + 1;

    for (let attempt = 0; attempt <= retryCount; attempt += 1) {
      try {
        const resendConfig = this.getResendConfig();
        const provider = resendConfig ? 'resend' : 'smtp';
        this.logger.log(
          `sendMail start attempt ${attempt + 1}/${totalAttempts} provider=${provider} to=${input.to} subject="${input.subject}"`,
        );

        const result = resendConfig
          ? await this.sendViaResend(input, resendConfig.apiKey, resendConfig.from)
          : await this.sendViaSmtp(input);

        const finalResult = {
          messageId: result.messageId,
          to: input.to,
          subject: input.subject,
        };

        await this.prisma.emailLog.create({
          data: {
            to: input.to,
            subject: input.subject,
            content: input.content ?? null,
            status: 'SUCCESS',
          },
        });

        this.logger.log(
          `sendMail success attempt ${attempt + 1}/${totalAttempts} to=${input.to} messageId=${finalResult.messageId}`,
        );

        return finalResult;
      } catch (error) {
        lastError = error;
        this.logger.error(
          `sendMail failed attempt ${attempt + 1}/${totalAttempts} to=${input.to} subject="${input.subject}" error=${this.formatError(error)}`,
        );
      }
    }

    await this.prisma.emailLog.create({
      data: {
        to: input.to,
        subject: input.subject,
        content: input.content ?? null,
        status: 'FAILED',
        error: this.formatError(lastError),
      },
    });

    this.logger.error(
      `sendMail final failure after ${totalAttempts} attempts to=${input.to} subject="${input.subject}"`,
    );

    throw new InternalServerErrorException('Gui email that bai');
  }

  private formatError(error: unknown) {
    if (!error) {
      return 'Unknown error';
    }

    if (error instanceof Error) {
      const code = (error as Error & { code?: string }).code;
      return code ? `${code}: ${error.message}` : error.message;
    }

    return String(error);
  }

  private async sendViaSmtp(input: SendMailInput) {
    const { transporter, from } = this.createTransporter();
    const info = await transporter.sendMail({
      from,
      to: input.to,
      subject: input.subject,
      text: input.content ?? '',
      html: input.html,
    });

    return {
      messageId: String(info.messageId),
    };
  }

  private async sendViaResend(
    input: SendMailInput,
    apiKey: string,
    from: string,
  ) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: [input.to],
          subject: input.subject,
          text: input.content ?? '',
          html: input.html,
        }),
        signal: controller.signal,
      });

      const body = (await response.json()) as {
        id?: string;
        message?: string;
        error?: { message?: string };
      };

      if (!response.ok || !body.id) {
        const message = body.error?.message || body.message || 'Resend API error';
        throw new Error(message);
      }

      return {
        messageId: body.id,
      };
    } finally {
      clearTimeout(timeout);
    }
  }
}
