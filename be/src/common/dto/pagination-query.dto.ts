import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min, MaxLength } from 'class-validator';

export class PaginationQueryDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'Trang hiện tại, mặc định là 1',
    name: 'Page',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  Page?: number = 1;

  @ApiPropertyOptional({
    example: 10,
    description: 'Số bản ghi mỗi trang, mặc định là 10, tối đa 100',
    name: 'PageSize',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  PageSize?: number = 10;

  @ApiPropertyOptional({
    example: 'PVC',
    description: 'Từ khóa tìm kiếm theo từng API danh sách',
    name: 'Keyword',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  Keyword?: string;
}
