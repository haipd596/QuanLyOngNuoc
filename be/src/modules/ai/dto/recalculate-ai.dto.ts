import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class RecalculateAiDto {
  @ApiPropertyOptional({
    example: 14,
    description: 'Số ngày mục tiêu cần đủ hàng để bán',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  targetDays?: number;
}

