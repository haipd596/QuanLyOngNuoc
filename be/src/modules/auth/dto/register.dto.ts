import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'Nguyen Van User',
    description: 'Ho va ten nguoi dung',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  fullName!: string;

  @ApiProperty({
    example: 'newuser@ongnuocviet.vn',
    description: 'Email dang ky',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: '0901000003',
    description: 'So dien thoai dang ky',
  })
  @IsString()
  @Matches(/^(0|\+84)[0-9]{9,10}$/, {
    message: 'So dien thoai khong hop le',
  })
  phone!: string;

  @ApiProperty({
    example: '1998-10-20',
    description: 'Ngay sinh (YYYY-MM-DD)',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiProperty({
    example: 'User@123',
    description: 'Mat khau dang ky',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password!: string;

  @ApiProperty({
    example: 'User@123',
    description: 'Xac nhan lai mat khau dang ky',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  confirmPassword!: string;
}
