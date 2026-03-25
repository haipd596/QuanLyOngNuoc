import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'ONV-PVC-001', description: 'Mã SKU sản phẩm' })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  sku!: string;

  @ApiProperty({
    example: 'Ống PVC Bình Minh phi 21',
    description: 'Tên sản phẩm',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  name!: string;

  @ApiProperty({
    example: 'ong-pvc-binh-minh-phi-21',
    description: 'Slug sản phẩm',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(170)
  slug!: string;

  @ApiProperty({ example: 'Cây', description: 'Đơn vị tính' })
  @IsString()
  unit!: string;

  @ApiProperty({ example: 42000, description: 'Giá nhập' })
  @IsNumber()
  @Min(0)
  importPrice!: number;

  @ApiProperty({ example: 55000, description: 'Giá bán' })
  @IsNumber()
  @Min(0)
  salePrice!: number;

  @ApiPropertyOptional({ example: 120, description: 'Số lượng tồn kho hiện tại' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stockQuantity?: number;

  @ApiPropertyOptional({ example: 30, description: 'Ngưỡng tồn kho tối thiểu' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minStockLevel?: number;

  @ApiPropertyOptional({
    example: 'cmai42t3b0000abc123xyz',
    description: 'ID danh mục',
  })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiPropertyOptional({
    example: 'cmai42t3b0000def456uvw',
    description: 'ID nhà cung cấp',
  })
  @IsOptional()
  @IsString()
  supplierId?: string;

  @ApiPropertyOptional({
    example: 'Ống nhựa PVC dùng cho hệ thống cấp nước',
    description: 'Mô tả sản phẩm',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}
