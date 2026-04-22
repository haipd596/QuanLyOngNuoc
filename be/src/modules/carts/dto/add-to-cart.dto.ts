import { IsInt, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddToCartDto {
  @ApiProperty({ example: 'sess-12345', description: 'Mã session do Frontend tạo' })
  @IsString()
  sessionId!: string;

  @ApiProperty({ example: 'cuid-product-xxx', description: 'ID sản phẩm' })
  @IsString()
  productId!: string;

  @ApiProperty({ example: 1, description: 'Số lượng mua' })
  @IsInt()
  @Min(1)
  quantity!: number;
}
