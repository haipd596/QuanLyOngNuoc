import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { StockMovementType } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MoveStockDto {
  @ApiProperty({
    example: 'cmai42t3b0000xxx111yyy',
    description: 'ID sản phẩm',
  })
  @IsString()
  productId!: string;

  @ApiProperty({
    example: 'IMPORT',
    enum: StockMovementType,
    description: 'Loại điều chỉnh kho',
  })
  @IsEnum(StockMovementType)
  type!: StockMovementType;

  @ApiProperty({
    example: 10,
    description: 'Số lượng tác động kho',
  })
  @IsInt()
  @Min(1)
  quantity!: number;

  @ApiPropertyOptional({
    example: 'Nhập thêm hàng mới',
    description: 'Ghi chú điều chỉnh kho',
  })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiPropertyOptional({
    example: 'cmai42t3b0000staff001',
    description: 'ID nhân viên thực hiện',
  })
  @IsOptional()
  @IsString()
  createdById?: string;
}
