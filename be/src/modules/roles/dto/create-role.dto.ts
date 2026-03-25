import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'ADMIN',
    description: 'Tên vai trò',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name!: string;

  @ApiPropertyOptional({
    example: 'Quản trị toàn hệ thống',
    description: 'Mô tả vai trò',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}
