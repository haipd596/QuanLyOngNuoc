import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const code = exception.getStatus();
      const payload = exception.getResponse();
      const message = this.extractMessage(payload);

      response.status(code).json({
        code,
        status: 'lỗi',
        data: null,
        message,
      });
      return;
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      status: 'lỗi',
      data: null,
      message: 'Lỗi hệ thống, vui lòng thử lại sau',
    });
  }

  private extractMessage(payload: string | object): string {
    if (typeof payload === 'string') {
      return payload;
    }

    const body = payload as { message?: string | string[] };
    if (Array.isArray(body.message)) {
      return body.message.join('; ');
    }
    if (typeof body.message === 'string') {
      return body.message;
    }
    return 'Yêu cầu không hợp lệ';
  }
}
