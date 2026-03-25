import { OrderStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateSalesOrderStatusDto {
  @IsEnum(OrderStatus)
  orderStatus!: OrderStatus;
}

