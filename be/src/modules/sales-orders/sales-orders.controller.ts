import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateSalesOrderDto } from './dto/create-sales-order.dto';
import { UpdateSalesOrderStatusDto } from './dto/update-sales-order-status.dto';
import { SalesOrdersService } from './sales-orders.service';

@Controller('sales-orders')
export class SalesOrdersController {
  constructor(private readonly salesOrdersService: SalesOrdersService) {}

  @Post()
  create(@Body() dto: CreateSalesOrderDto) {
    return this.salesOrdersService.create(dto);
  }

  @Get()
  findAll() {
    return this.salesOrdersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesOrdersService.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateSalesOrderStatusDto) {
    return this.salesOrdersService.updateStatus(id, dto);
  }

  @Post(':id/cancel')
  cancel(@Param('id') id: string) {
    return this.salesOrdersService.cancel(id);
  }
}

