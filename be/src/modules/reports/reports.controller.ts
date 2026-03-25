import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ApiPaginationQuery } from '../../common/swagger/api-pagination-query.decorator';
import { ApiStandardResponse } from '../../common/swagger/api-standard-response.decorator';
import { ReportsService } from './reports.service';

@Controller('reports')
@ApiTags('Reports')
@ApiBearerAuth('BearerAuth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('dashboard')
  @ResponseMessage('Lấy báo cáo tổng quan thành công')
  @ApiStandardResponse('Lấy báo cáo tổng quan thành công')
  dashboard() {
    return this.reportsService.dashboard();
  }

  @Get('inventory-audit')
  @ResponseMessage('Lấy báo cáo kiểm kê kho thành công')
  @ApiPaginationQuery()
  @ApiQuery({
    name: 'keyword',
    required: false,
    description: 'Tìm trong danh sách tồn thấp theo tên sản phẩm hoặc SKU',
    example: 'CADIVI',
  })
  @ApiStandardResponse('Lấy báo cáo kiểm kê kho thành công')
  inventoryAudit(@Query() query: PaginationQueryDto, @Query('keyword') keyword?: string) {
    return this.reportsService.inventoryAudit(query, keyword);
  }

  @Get('sales-overview')
  @ResponseMessage('Lấy báo cáo bán hàng thành công')
  @ApiQuery({
    name: 'from',
    required: false,
    description: 'Ngày bắt đầu, định dạng YYYY-MM-DD',
  })
  @ApiQuery({
    name: 'to',
    required: false,
    description: 'Ngày kết thúc, định dạng YYYY-MM-DD',
  })
  @ApiStandardResponse('Lấy báo cáo bán hàng thành công')
  salesOverview(@Query('from') from?: string, @Query('to') to?: string) {
    return this.reportsService.salesOverview(from, to);
  }
}
