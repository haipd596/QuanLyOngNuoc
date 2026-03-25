import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreateSalesOrderDto } from './dto/create-sales-order.dto';
import { UpdateSalesOrderStatusDto } from './dto/update-sales-order-status.dto';
import { SalesOrdersService } from './sales-orders.service';

@Controller('sales-orders')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'USER')
export class SalesOrdersController {
  constructor(private readonly salesOrdersService: SalesOrdersService) {}

  @Post()
  @ResponseMessage('Tạo đơn bán hàng thành công')
  create(@Body() dto: CreateSalesOrderDto) {
    return this.salesOrdersService.create(dto);
  }

  @Get()
  @ResponseMessage('Lấy danh sách đơn bán hàng thành công')
  findAll(@Query() query: PaginationQueryDto) {
    return this.salesOrdersService.findAll(query);
  }

  @Get(':id')
  @ResponseMessage('Lấy chi tiết đơn bán hàng thành công')
  findOne(@Param('id') id: string) {
    return this.salesOrdersService.findOne(id);
  }

  @Patch(':id/status')
  @ResponseMessage('Cập nhật trạng thái đơn hàng thành công')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateSalesOrderStatusDto) {
    return this.salesOrdersService.updateStatus(id, dto);
  }

  @Post(':id/cancel')
  @ResponseMessage('Hủy đơn hàng thành công')
  cancel(@Param('id') id: string) {
    return this.salesOrdersService.cancel(id);
  }
}
