import { Body, Controller, Get, Post } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { MoveStockDto } from './dto/move-stock.dto';
import { InventoryService } from './inventory.service';

@Controller('inventory')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'USER')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('summary')
  @ResponseMessage('Lấy tổng quan tồn kho thành công')
  summary(@Query() query: PaginationQueryDto) {
    return this.inventoryService.summary(query);
  }

  @Get('movements')
  @ResponseMessage('Lấy lịch sử nhập xuất kho thành công')
  movements(@Query() query: PaginationQueryDto) {
    return this.inventoryService.movements(query);
  }

  @Post('move')
  @ResponseMessage('Cập nhật tồn kho thành công')
  move(@Body() dto: MoveStockDto) {
    return this.inventoryService.moveStock(dto);
  }
}
