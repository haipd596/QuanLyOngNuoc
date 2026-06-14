import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({
    example:
      'Ống nhựa PVC dùng cho hệ thống cấp thoát nước dân dụng, bền, chịu lực tốt, phù hợp thi công công trình dân dụng và thương mại.',
    description: 'Mô tả sản phẩm',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @MinLength(50)
  @MaxLength(2000)
  description!: string;
}
