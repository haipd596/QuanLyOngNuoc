import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum ShippingMethodEnum {
  STANDARD = 'STANDARD',
  EXPRESS = 'EXPRESS',
}

export enum PaymentMethodEnum {
  COD = 'COD',
  BANK_TRANSFER = 'BANK_TRANSFER',
  MOMO = 'MOMO',
  ZALOPAY = 'ZALOPAY',
}

class GuestCheckoutItemInputDto {
  @ApiProperty({ example: 'cmai42t3b0000prd001', description: 'ID sản phẩm' })
  @IsString()
  productId!: string;

  @ApiProperty({ example: 2, description: 'Số lượng mua' })
  @IsInt()
  @Min(1)
  quantity!: number;

  @ApiPropertyOptional({ example: 55000, description: 'Giá bán tại thời điểm đặt đơn' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  unitPrice?: number;
}

export class GuestCheckoutDto {
  @ApiProperty({ example: 'Nguyen Van A', description: 'Tên khách mua hàng' })
  @IsString()
  @MaxLength(120)
  guestName!: string;

  @ApiProperty({ example: '0901234567', description: 'Số điện thoại khách' })
  @IsString()
  @MaxLength(20)
  guestPhone!: string;

  @ApiPropertyOptional({ example: 'guest@example.com', description: 'Email khách (nếu có)' })
  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  guestEmail?: string;

  @ApiPropertyOptional({
    example: '123 Le Loi, Quan 1, TP.HCM',
    description: 'Địa chỉ giao hàng',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  guestAddress?: string;

  @ApiPropertyOptional({ example: 10000, description: 'Giảm giá toàn đơn (VND)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  discountAmount?: number;

  @ApiPropertyOptional({
    enum: ShippingMethodEnum,
    default: ShippingMethodEnum.STANDARD,
    description: 'Phương thức vận chuyển: STANDARD (tiêu chuẩn) | EXPRESS (hỏa tốc)',
    example: ShippingMethodEnum.STANDARD,
  })
  @IsOptional()
  @IsEnum(ShippingMethodEnum)
  shippingMethod?: ShippingMethodEnum;

  @ApiPropertyOptional({ example: 25000, description: 'Phí vận chuyển (VND)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  shippingFee?: number;

  @ApiProperty({
    enum: PaymentMethodEnum,
    default: PaymentMethodEnum.COD,
    description: 'Phương thức thanh toán: COD | BANK_TRANSFER | MOMO | ZALOPAY',
    example: PaymentMethodEnum.COD,
  })
  @IsEnum(PaymentMethodEnum)
  paymentMethod!: PaymentMethodEnum;

  @ApiPropertyOptional({ example: 'Giao giờ hành chính', description: 'Ghi chú đơn hàng' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;

  @ApiProperty({ type: 'array', description: 'Danh sách sản phẩm trong đơn' })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => GuestCheckoutItemInputDto)
  items!: GuestCheckoutItemInputDto[];
}
