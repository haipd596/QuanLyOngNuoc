import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    example: 'user@ongnuocviet.vn',
    description: 'Email tai khoan can doi mat khau',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'OldPassword@123',
    description: 'Mat khau hien tai',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  oldPassword!: string;

  @ApiProperty({
    example: 'NewPassword@123',
    description: 'Mat khau moi',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  newPassword!: string;

  @ApiProperty({
    example: 'NewPassword@123',
    description: 'Xac nhan mat khau moi',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  confirmNewPassword!: string;
}
