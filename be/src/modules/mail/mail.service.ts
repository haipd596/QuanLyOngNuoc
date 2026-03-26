import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
export class MailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

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
        'Thiếu cấu hình MAIL_HOST, MAIL_USER, MAIL_PASS hoặc MAIL_FROM',
      );
    }

    return {
      transporter: nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      }),
      from,
    };
  }

  private async sendWithRetry(
    input: SendMailInput,
    retryCount: number,
  ): Promise<SendMailResult> {
    let lastError: unknown;

    for (let attempt = 0; attempt <= retryCount; attempt += 1) {
      try {
        const { transporter, from } = this.createTransporter();
        const info = await transporter.sendMail({
          from,
          to: input.to,
          subject: input.subject,
          text: input.content ?? '',
          html: input.html,
        });

        const result = {
          messageId: String(info.messageId),
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

        return result;
      } catch (error) {
        lastError = error;
      }
    }

    await this.prisma.emailLog.create({
      data: {
        to: input.to,
        subject: input.subject,
        content: input.content ?? null,
        status: 'FAILED',
        error: lastError instanceof Error ? lastError.message : String(lastError),
      },
    });

    throw new InternalServerErrorException('Gửi email thất bại');
  }
}

