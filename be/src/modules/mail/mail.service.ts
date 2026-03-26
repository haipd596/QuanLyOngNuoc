import {
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import * as nodemailer from 'nodemailer';
import { PrismaService } from '../../config/prisma.service';

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

type MailProvider = 'resend' | 'smtp' | 'log';

@Injectable()
export class MailService implements OnModuleInit {
  private readonly logger = new Logger(MailService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  onModuleInit() {
    const providers = this.getProviderSequence();
    const provider = providers[0];

    if (provider === 'resend') {
      if (providers.includes('smtp')) {
        this.logger.log('Mail provider: Resend API (fallback SMTP khi Resend loi)');
      } else {
        this.logger.log('Mail provider: Resend API');
      }
      return;
    }

    if (provider === 'log') {
      this.logger.warn('Mail provider: log (khong gui mail that)');
      return;
    }

    const smtp = this.getSmtpConfig();
    if (!smtp) {
      this.logger.warn(
        'Thieu cau hinh gui mail: RESEND_API_KEY hoac SMTP (MAIL_HOST/MAIL_USER|MAIL_USERNAME/MAIL_PASS|MAIL_PASSWORD/MAIL_FROM).',
      );
      return;
    }

    this.logger.log(`Mail provider: SMTP ${smtp.host}:${smtp.port}`);
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

  private async sendWithRetry(
    input: SendMailInput,
    retryCount: number,
  ): Promise<SendMailResult> {
    let lastError: unknown;
    const totalAttempts = retryCount + 1;

    for (let attempt = 0; attempt <= retryCount; attempt += 1) {
      const providers = this.getProviderSequence();

      for (const provider of providers) {
        try {
          this.logger.log(
            `sendMail start attempt ${attempt + 1}/${totalAttempts} provider=${provider} to=${input.to} subject="${input.subject}"`,
          );

          let messageId: string;

          if (provider === 'resend') {
            const resend = this.getResendConfig();
            if (!resend) {
              throw new InternalServerErrorException('Thieu cau hinh RESEND_API_KEY hoac MAIL_FROM');
            }
            messageId = await this.sendViaResend(input, resend.apiKey, resend.from);
          } else if (provider === 'log') {
            messageId = this.sendViaLog(input);
          } else {
            messageId = await this.sendViaSmtp(input);
          }

          await this.prisma.emailLog.create({
            data: {
              to: input.to,
              subject: input.subject,
              content: input.content ?? null,
              status: 'SUCCESS',
            },
          });

          this.logger.log(
            `sendMail success attempt ${attempt + 1}/${totalAttempts} provider=${provider} to=${input.to} messageId=${messageId}`,
          );

          return {
            messageId,
            to: input.to,
            subject: input.subject,
          };
        } catch (error) {
          lastError = error;
          this.logger.error(
            `sendMail failed attempt ${attempt + 1}/${totalAttempts} provider=${provider} to=${input.to} subject="${input.subject}" error=${this.formatError(error)}`,
          );
        }
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

  private getProviderSequence(): MailProvider[] {
    const resend = this.getResendConfig();
    const smtp = this.getSmtpConfig();
    const mailer = (this.configService.get<string>('MAIL_MAILER') ?? 'smtp')
      .trim()
      .toLowerCase();

    if (resend && smtp) {
      return ['resend', 'smtp'];
    }

    if (resend) {
      return ['resend'];
    }

    if (mailer === 'log') {
      return ['log'];
    }

    return ['smtp'];
  }

  private getResendConfig() {
    const apiKey = this.configService.get<string>('RESEND_API_KEY')?.trim();
    const from = this.getMailFrom();
    if (!apiKey || !from) {
      return null;
    }
    return { apiKey, from };
  }

  private getSmtpConfig() {
    const host = this.configService.get<string>('MAIL_HOST')?.trim();
    const port = Number(this.configService.get<string>('MAIL_PORT') ?? 587);
    const user =
      this.configService.get<string>('MAIL_USER')?.trim() ||
      this.configService.get<string>('MAIL_USERNAME')?.trim();
    const pass =
      this.configService.get<string>('MAIL_PASS')?.trim() ||
      this.configService.get<string>('MAIL_PASSWORD')?.trim();
    const from = this.getMailFrom();

    if (!host || !user || !pass || !from) {
      return null;
    }

    return {
      host,
      port,
      user,
      pass,
      from,
    };
  }

  private getMailFrom() {
    const mailFrom = this.configService.get<string>('MAIL_FROM')?.trim();
    if (mailFrom) {
      return mailFrom;
    }

    const fromAddress = this.configService.get<string>('MAIL_FROM_ADDRESS')?.trim();
    const fromName = this.configService.get<string>('MAIL_FROM_NAME')?.trim();

    if (!fromAddress) {
      return null;
    }

    return fromName ? `${fromName} <${fromAddress}>` : fromAddress;
  }

  private async sendViaSmtp(input: SendMailInput): Promise<string> {
    const smtp = this.getSmtpConfig();
    if (!smtp) {
      throw new InternalServerErrorException(
        'Thieu cau hinh SMTP: MAIL_HOST, MAIL_PORT, MAIL_USER|MAIL_USERNAME, MAIL_PASS|MAIL_PASSWORD, MAIL_FROM',
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.port === 465,
      auth: { user: smtp.user, pass: smtp.pass },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });

    const info = await transporter.sendMail({
      from: smtp.from,
      to: input.to,
      subject: input.subject,
      text: input.content ?? '',
      html: input.html,
    });

    return String(info.messageId);
  }

  private sendViaLog(input: SendMailInput): string {
    const messageId = `log-${Date.now()}-${randomUUID().slice(0, 8)}`;
    this.logger.log(
      `[MAIL_LOG] messageId=${messageId} to=${input.to} subject="${input.subject}" content="${input.content ?? ''}"`,
    );
    return messageId;
  }

  private async sendViaResend(
    input: SendMailInput,
    apiKey: string,
    from: string,
  ): Promise<string> {
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

      return body.id;
    } finally {
      clearTimeout(timeout);
    }
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
}
