import { Controller, Get, Query } from '@nestjs/common';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ReportsService } from './reports.service';

@Controller('reports')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('dashboard')
  @ResponseMessage('Lấy báo cáo tổng quan thành công')
  dashboard() {
    return this.reportsService.dashboard();
  }

  @Get('inventory-audit')
  @ResponseMessage('Lấy báo cáo kiểm kê kho thành công')
  inventoryAudit(@Query() query: PaginationQueryDto) {
    return this.reportsService.inventoryAudit(query);
  }

  @Get('sales-overview')
  @ResponseMessage('Lấy báo cáo bán hàng thành công')
  salesOverview(@Query('from') from?: string, @Query('to') to?: string) {
    return this.reportsService.salesOverview(from, to);
  }
}
