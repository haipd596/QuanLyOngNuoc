import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    example: 'Phạm Văn A',
    description: 'Tên khách hàng',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  fullName!: string;

  @ApiPropertyOptional({
    example: '0911000001',
    description: 'Số điện thoại khách hàng',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiPropertyOptional({
    example: 'phamvana@gmail.com',
    description: 'Email khách hàng',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    example: 'Gò Vấp, TP.HCM',
    description: 'Địa chỉ khách hàng',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;

  @ApiPropertyOptional({
    example: 'Khách mua lẻ thường xuyên',
    description: 'Ghi chú',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  note?: string;
}
