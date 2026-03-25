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
        type: 'object',
        properties: {
          code: { type: 'number', example: status },
          status: { type: 'string', example: 'thành công' },
          data: { example: dataExample },
          message: { type: 'string', example: message },
        },
        example: {
          code: status,
          status: 'thành công',
          data: dataExample,
          message,
        },
      },
    }),
  );
}

export function ApiStandardPaginationResponse(
  message: string,
  status = 200,
  itemExample: Record<string, unknown> = {},
) {
  return applyDecorators(
    ApiResponse({
      status,
      schema: {
        type: 'object',
        properties: {
          code: { type: 'number', example: status },
          status: { type: 'string', example: 'thành công' },
          data: {
            type: 'object',
            properties: {
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  example: itemExample,
                },
              },
              pagination: {
                type: 'object',
                properties: {
                  page: { type: 'number', example: 1 },
                  limit: { type: 'number', example: 10 },
                  total: { type: 'number', example: 100 },
                  totalPages: { type: 'number', example: 10 },
                  hasNextPage: { type: 'boolean', example: true },
                  hasPreviousPage: { type: 'boolean', example: false },
                },
              },
            },
          },
          message: { type: 'string', example: message },
        },
        example: {
          code: status,
          status: 'thành công',
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
