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

export class UpdateMyProfileDto {
  @ApiProperty({ example: 'Nguyen Van A', required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  fullName?: string;

  @ApiProperty({ example: 'newuser@ongnuocviet.vn', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: '0901000003', required: false })
  @IsOptional()
  @IsString()
  @Matches(/^(0|\+84)[0-9]{9,10}$/, {
    message: 'So dien thoai khong hop le',
  })
  phone?: string;

  @ApiProperty({ example: '1998-10-20', required: false })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;
}
