import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { StockMovementType } from '@prisma/client';

export class MoveStockDto {
  @IsString()
  productId!: string;

  @IsEnum(StockMovementType)
  type!: StockMovementType;

  @IsInt()
  @Min(1)
  quantity!: number;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsString()
  createdById?: string;
}

