import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CancelSalesOrderDto {
  @ApiProperty({
    example: 'Đổi sang loại sản phẩm khác',
    description: 'Lý do hủy đơn hàng',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  reason!: string;
}

