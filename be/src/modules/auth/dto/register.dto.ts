import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'Nguyễn Văn User',
    description: 'Họ và tên người dùng',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  fullName!: string;

  @ApiProperty({
    example: 'newuser@ongnuocviet.vn',
    description: 'Email đăng ký',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'User@123',
    description: 'Mật khẩu đăng ký',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password!: string;

  @ApiPropertyOptional({
    example: 'cmai42t3b0000abc123xyz',
    description: 'ID vai trò, để trống sẽ dùng vai trò mặc định',
  })
  @IsOptional()
  @IsString()
  roleId?: string;
}
