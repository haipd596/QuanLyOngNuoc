import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
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

class MyCheckoutItemDto {
  @ApiProperty({ example: 'cmai42t3b0000prd001' })
  @IsString()
  productId!: string;

  @ApiProperty({ example: 2 })
  @IsInt()
  @Min(1)
  quantity!: number;
}

export class MyCheckoutDto {
  @ApiProperty({ example: 'Nguyen Van A' })
  @IsString()
  fullName!: string;

  @ApiProperty({ example: '0901234567' })
  @IsString()
  phone!: string;

  @ApiPropertyOptional({ example: 'a@gmail.com' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ example: '123 Nguyen Hue, Quan 1, TP.HCM' })
  @IsString()
  address!: string;

  @ApiPropertyOptional({ example: 10000 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  discountAmount?: number;

  @ApiPropertyOptional({ example: 15000 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  shippingFee?: number;

  @ApiPropertyOptional({ example: 'STANDARD' })
  @IsOptional()
  @IsString()
  shippingMethod?: string;

  @ApiPropertyOptional({ example: 'COD' })
  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @ApiPropertyOptional({ example: 'Giao gio hanh chinh' })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ type: [MyCheckoutItemDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => MyCheckoutItemDto)
  items!: MyCheckoutItemDto[];
}
