import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class TestSendMailDto {
  @ApiProperty({
    example: 'admin@ongnuocviet.vn',
    description: 'Email người nhận',
  })
  @IsEmail()
  to!: string;

  @ApiProperty({
    example: 'Test gửi mail từ hệ thống',
    description: 'Tiêu đề email',
  })
  @IsString()
  @MaxLength(255)
  subject!: string;

  @ApiPropertyOptional({
    example: 'Đây là email test.',
    description: 'Nội dung dạng text',
  })
  @IsOptional()
  @IsString()
  content?: string;
}

