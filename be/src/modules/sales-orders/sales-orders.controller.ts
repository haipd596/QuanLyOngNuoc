import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ApiPaginationQuery } from '../../common/swagger/api-pagination-query.decorator';
import {
  ApiStandardPaginationResponse,
  ApiStandardResponse,
} from '../../common/swagger/api-standard-response.decorator';
import { INTERNAL_ROLES } from '../../common/constants/roles.constant';
import {
  buildPaginationInput,
  extractQueryFilters,
} from '../../common/utils/list-query.util';
import { CreateSalesOrderDto } from './dto/create-sales-order.dto';
import { GuestCheckoutDto } from './dto/guest-checkout.dto';
import { TrackOrderDto } from './dto/track-order.dto';
import { UpdateSalesOrderStatusDto } from './dto/update-sales-order-status.dto';
import { SalesOrdersService } from './sales-orders.service';

@Controller('sales-orders')
@ApiTags('Don ban hang')
export class SalesOrdersController {
  constructor(private readonly salesOrdersService: SalesOrdersService) {}

  @Post('guest-checkout')
  @ResponseMessage('Dat don guest thanh cong')
  @ApiStandardResponse('Dat don guest thanh cong', 201)
  guestCheckout(@Body() dto: GuestCheckoutDto) {
    return this.salesOrdersService.createGuest(dto);
  }

  @Get('track')
  @ResponseMessage('Tra cuu don hang thanh cong')
  @ApiQuery({ name: 'orderCode', required: true, example: 'SO-1742960000000' })
  @ApiQuery({ name: 'phone', required: true, example: '0901234567' })
  @ApiStandardResponse('Tra cuu don hang thanh cong')
  trackOrder(@Query() query: TrackOrderDto) {
    return this.salesOrdersService.trackByGuest(query.orderCode, query.phone);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('BearerAuth')
  @Roles(...INTERNAL_ROLES)
  @ResponseMessage('Tao don ban hang thanh cong')
  @ApiStandardResponse('Tao don ban hang thanh cong', 201)
  create(@Body() dto: CreateSalesOrderDto) {
    return this.salesOrdersService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('BearerAuth')
  @Roles(...INTERNAL_ROLES)
  @ResponseMessage('Lay danh sach don ban hang thanh cong')
  @ApiPaginationQuery()
  @ApiQuery({
    name: 'Keyword',
    required: false,
    description: 'Tim theo ma don, ghi chu, ten khach, ten nhan vien, guestName hoac guestPhone',
    example: 'SO-2026',
  })
  @ApiQuery({ name: 'Query.Id', required: false, example: 'cmai42t3b0000so001' })
  @ApiQuery({ name: 'Query.OrderCode', required: false, example: 'SO-20260325-001' })
  @ApiQuery({ name: 'Query.CustomerId', required: false, example: 'cmai42t3b0000cus001' })
  @ApiQuery({ name: 'Query.CustomerName', required: false, example: 'Pham Van A' })
  @ApiQuery({ name: 'Query.StaffId', required: false, example: 'cmai42t3b0000staff001' })
  @ApiQuery({ name: 'Query.StaffName', required: false, example: 'Tran Ban Hang' })
  @ApiQuery({ name: 'Query.PaymentStatus', required: false, example: 'PAID' })
  @ApiQuery({ name: 'Query.OrderStatus', required: false, example: 'COMPLETED' })
  @ApiQuery({ name: 'Query.Note', required: false, example: 'Ban tai quay' })
  @ApiStandardPaginationResponse('Lay danh sach don ban hang thanh cong', 200, {
    id: 'cmai42t3b0000so001',
    orderCode: 'SO-20260325-001',
    totalAmount: '262000',
    finalAmount: '250000',
    paymentStatus: 'PAID',
    orderStatus: 'COMPLETED',
  })
  findAll(
    @Query('Keyword') keyword: string | undefined,
    @Query('Page') page: string | undefined,
    @Query('PageSize') pageSize: string | undefined,
    @Query() rawQuery: Record<string, unknown>,
  ) {
    const filters = extractQueryFilters(rawQuery, [
      'Id',
      'OrderCode',
      'CustomerId',
      'CustomerName',
      'StaffId',
      'StaffName',
      'PaymentStatus',
      'OrderStatus',
      'Note',
    ]);
    const paging = buildPaginationInput(page, pageSize);
    return this.salesOrdersService.findAll(paging, keyword, filters);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('BearerAuth')
  @Roles(...INTERNAL_ROLES)
  @ResponseMessage('Lay chi tiet don ban hang thanh cong')
  @ApiStandardResponse('Lay chi tiet don ban hang thanh cong')
  findOne(@Param('id') id: string) {
    return this.salesOrdersService.findOne(id);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('BearerAuth')
  @Roles(...INTERNAL_ROLES)
  @ResponseMessage('Cap nhat trang thai don hang thanh cong')
  @ApiStandardResponse('Cap nhat trang thai don hang thanh cong')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateSalesOrderStatusDto) {
    return this.salesOrdersService.updateStatus(id, dto);
  }

  @Post(':id/cancel')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('BearerAuth')
  @Roles(...INTERNAL_ROLES)
  @ResponseMessage('Huy don hang thanh cong')
  @ApiStandardResponse('Huy don hang thanh cong', 201)
  cancel(@Param('id') id: string) {
    return this.salesOrdersService.cancel(id);
  }
}
