import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'user@ongnuocviet.vn',
    description: 'Email đăng nhập',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'User@123',
    description: 'Mật khẩu đăng nhập',
  })
  @IsString()
  @MinLength(6)
  password!: string;
}
