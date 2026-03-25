import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  RESPONSE_MESSAGE_KEY,
} from '../decorators/response-message.decorator';

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse<{ statusCode: number }>();

    const message =
      this.reflector.getAllAndOverride<string>(RESPONSE_MESSAGE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? 'Thành công';

    return next.handle().pipe(
      map((data) => ({
        code: response.statusCode,
        status: 'success',
        data,
        message,
      })),
    );
  }
}

