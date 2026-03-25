import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class SalesOrderItemInputDto {
  @ApiProperty({
    example: 'cmai42t3b0000prd001',
    description: 'ID sản phẩm',
  })
  @IsString()
  productId!: string;

  @ApiProperty({
    example: 2,
    description: 'Số lượng mua',
  })
  @IsInt()
  @Min(1)
  quantity!: number;

  @ApiPropertyOptional({
    example: 55000,
    description: 'Giá bán tại thời điểm tạo đơn',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  unitPrice?: number;
}

export class CreateSalesOrderDto {
  @ApiPropertyOptional({
    example: 'cmai42t3b0000cus001',
    description: 'ID khách hàng',
  })
  @IsOptional()
  @IsString()
  customerId?: string;

  @ApiPropertyOptional({
    example: 'cmai42t3b0000staff001',
    description: 'ID nhân viên tạo đơn',
  })
  @IsOptional()
  @IsString()
  staffId?: string;

  @ApiPropertyOptional({
    example: 10000,
    description: 'Giảm giá toàn đơn',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  discountAmount?: number;

  @ApiPropertyOptional({
    example: 'Giao trong ngày',
    description: 'Ghi chú đơn hàng',
  })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({
    type: 'array',
    description: 'Danh sách sản phẩm trong đơn',
    example: [
      {
        productId: 'cmai42t3b0000prd001',
        quantity: 2,
        unitPrice: 55000,
      },
      {
        productId: 'cmai42t3b0000prd002',
        quantity: 1,
        unitPrice: 120000,
      },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => SalesOrderItemInputDto)
  items!: SalesOrderItemInputDto[];
}
