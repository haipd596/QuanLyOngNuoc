import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiQuery } from '@nestjs/swagger';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ApiPaginationQuery } from '../../common/swagger/api-pagination-query.decorator';
import {
  ApiStandardPaginationResponse,
  ApiStandardResponse,
} from '../../common/swagger/api-standard-response.decorator';
import { CreateSalesOrderDto } from './dto/create-sales-order.dto';
import { UpdateSalesOrderStatusDto } from './dto/update-sales-order-status.dto';
import { SalesOrdersService } from './sales-orders.service';

@Controller('sales-orders')
@ApiTags('Đơn bán hàng')
@ApiBearerAuth('BearerAuth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'USER')
export class SalesOrdersController {
  constructor(private readonly salesOrdersService: SalesOrdersService) {}

  @Post()
  @ResponseMessage('Tạo đơn bán hàng thành công')
  @ApiStandardResponse('Tạo đơn bán hàng thành công', 201)
  create(@Body() dto: CreateSalesOrderDto) {
    return this.salesOrdersService.create(dto);
  }

  @Get()
  @ResponseMessage('Lấy danh sách đơn bán hàng thành công')
  @ApiPaginationQuery()
  @ApiQuery({
    name: 'keyword',
    required: false,
    description: 'Tìm theo mã đơn, ghi chú, tên khách hàng hoặc tên nhân viên',
    example: 'SO-2026',
  })
  @ApiStandardPaginationResponse('Lấy danh sách đơn bán hàng thành công', 200, {
    id: 'cmai42t3b0000so001',
    orderCode: 'SO-20260325-001',
    totalAmount: '262000',
    finalAmount: '250000',
    paymentStatus: 'PAID',
    orderStatus: 'COMPLETED',
  })
  findAll(@Query() query: PaginationQueryDto) {
    return this.salesOrdersService.findAll(query, query.keyword);
  }

  @Get(':id')
  @ResponseMessage('Lấy chi tiết đơn bán hàng thành công')
  @ApiStandardResponse('Lấy chi tiết đơn bán hàng thành công')
  findOne(@Param('id') id: string) {
    return this.salesOrdersService.findOne(id);
  }

  @Patch(':id/status')
  @ResponseMessage('Cập nhật trạng thái đơn hàng thành công')
  @ApiStandardResponse('Cập nhật trạng thái đơn hàng thành công')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateSalesOrderStatusDto) {
    return this.salesOrdersService.updateStatus(id, dto);
  }

  @Post(':id/cancel')
  @ResponseMessage('Hủy đơn hàng thành công')
  @ApiStandardResponse('Hủy đơn hàng thành công', 201)
  cancel(@Param('id') id: string) {
    return this.salesOrdersService.cancel(id);
  }
}
