import { OrderStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSalesOrderStatusDto {
  @ApiProperty({
    enum: OrderStatus,
    example: 'CONFIRMED',
    description: 'Trạng thái đơn hàng mới',
  })
  @IsEnum(OrderStatus)
  orderStatus!: OrderStatus;
}
