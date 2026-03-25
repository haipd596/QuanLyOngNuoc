import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateSupplierDto {
  @ApiProperty({
    example: 'Công ty Nhựa Miền Nam',
    description: 'Tên nhà cung cấp',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  name!: string;

  @ApiPropertyOptional({
    example: '02838118888',
    description: 'Số điện thoại nhà cung cấp',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiPropertyOptional({
    example: 'sale@nhuamiennam.vn',
    description: 'Email nhà cung cấp',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    example: 'KCN Tân Bình, TP.HCM',
    description: 'Địa chỉ nhà cung cấp',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;

  @ApiPropertyOptional({
    example: '0312345678',
    description: 'Mã số thuế',
  })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  taxCode?: string;

  @ApiPropertyOptional({
    example: 'Đối tác nhập hàng định kỳ',
    description: 'Ghi chú',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  note?: string;
}
