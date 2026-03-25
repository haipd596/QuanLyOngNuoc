import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiStandardResponse(
  message: string,
  status = 200,
  dataExample: unknown = {},
) {
  return applyDecorators(
    ApiResponse({
      status,
      schema: {
        example: {
          code: status,
          status: 'success',
          data: dataExample,
          message,
        },
      },
    }),
  );
}

export function ApiStandardPaginationResponse(message: string, status = 200) {
  return applyDecorators(
    ApiResponse({
      status,
      schema: {
        example: {
          code: status,
          status: 'success',
          data: {
            items: [],
            pagination: {
              page: 1,
              limit: 10,
              total: 100,
              totalPages: 10,
              hasNextPage: true,
              hasPreviousPage: false,
            },
          },
          message,
        },
      },
    }),
  );
}

