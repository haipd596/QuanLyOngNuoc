import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Ống nước', description: 'Tên danh mục' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @ApiProperty({ example: 'ong-nuoc', description: 'Slug danh mục' })
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  slug!: string;

  @ApiPropertyOptional({
    example: 'Danh mục ống và phụ kiện cấp thoát nước',
    description: 'Mô tả danh mục',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}
