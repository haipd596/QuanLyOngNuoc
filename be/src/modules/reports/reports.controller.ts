import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('dashboard')
  dashboard() {
    return this.reportsService.dashboard();
  }

  @Get('inventory-audit')
  inventoryAudit() {
    return this.reportsService.inventoryAudit();
  }

  @Get('sales-overview')
  salesOverview(@Query('from') from?: string, @Query('to') to?: string) {
    return this.reportsService.salesOverview(from, to);
  }
}

