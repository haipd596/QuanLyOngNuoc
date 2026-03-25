import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Trần Bán Hàng',
    description: 'Họ và tên người dùng',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  fullName!: string;

  @ApiProperty({
    example: 'staff@ongnuocviet.vn',
    description: 'Email người dùng',
  })
  @IsEmail()
  email!: string;

  @ApiPropertyOptional({
    example: 'User@123',
    description: 'Mật khẩu tài khoản',
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password?: string;

  @ApiPropertyOptional({
    example: '0909123456',
    description: 'Số điện thoại',
  })
  @IsOptional()
  @IsPhoneNumber('VN')
  phone?: string;

  @ApiPropertyOptional({
    example: 'cmai42t3b0000abc123xyz',
    description: 'ID vai trò',
  })
  @IsOptional()
  @IsString()
  roleId?: string;
}
