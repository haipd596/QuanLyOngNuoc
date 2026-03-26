import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function ApiPaginationQuery() {
  return applyDecorators(
    ApiQuery({
      name: 'Page',
      required: false,
      example: 1,
      description: 'Trang hiện tại, mặc định là 1',
    }),
    ApiQuery({
      name: 'PageSize',
      required: false,
      example: 10,
      description: 'Số bản ghi mỗi trang, mặc định 10, tối đa 100',
    }),
  );
}
