import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class TrackOrderDto {
  @ApiProperty({
    example: 'SO-1742960000000',
    description: 'Mã đơn hàng',
  })
  @IsString()
  @MaxLength(50)
  orderCode!: string;

  @ApiProperty({
    example: '0901234567',
    description: 'Số điện thoại đã đặt đơn',
  })
  @IsString()
  @MaxLength(20)
  phone!: string;
}

