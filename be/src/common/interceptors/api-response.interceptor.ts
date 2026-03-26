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
    const message =
      this.reflector.getAllAndOverride<string>(RESPONSE_MESSAGE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? 'Thành công';

    return next.handle().pipe(
      map((data: unknown) => {
        if (
          data &&
          typeof data === 'object' &&
          'items' in data &&
          'pagination' in data
        ) {
          const pagination = (data as { pagination: { page: number; limit: number; total: number; totalPages: number } }).pagination;
          return {
            code: 0,
            success: true,
            message,
            data: (data as { items: unknown[] }).items,
            metaData: {
              page: pagination.page,
              pageSize: pagination.limit,
              total: pagination.total,
              totalPage: pagination.totalPages,
            },
          };
        }

        return {
          code: 0,
          success: true,
          message,
          data,
          metaData: null,
        };
      }),
    );
  }
}
