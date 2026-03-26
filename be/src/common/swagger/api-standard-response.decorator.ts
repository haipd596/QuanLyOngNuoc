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
          code: { type: 'number', example: 0 },
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: message },
          data: { example: dataExample },
          metaData: { type: 'object', nullable: true, example: null },
        },
        example: {
          code: 0,
          success: true,
          message,
          data: dataExample,
          metaData: null,
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
          code: { type: 'number', example: 0 },
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: message },
          data: {
            type: 'array',
            items: {
              type: 'object',
              example: itemExample,
            },
          },
          metaData: {
            type: 'object',
            properties: {
              page: { type: 'number', example: 1 },
              pageSize: { type: 'number', example: 10 },
              total: { type: 'number', example: 100 },
              totalPage: { type: 'number', example: 10 },
            },
          },
        },
        example: {
          code: 0,
          success: true,
          message,
          data: [
            itemExample,
          ],
          metaData: {
            page: 1,
            pageSize: 10,
            total: 100,
            totalPage: 10,
          },
        },
      },
    }),
  );
}
