import { Body, Controller, Get, Post } from '@nestjs/common';
import { MoveStockDto } from './dto/move-stock.dto';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('summary')
  summary() {
    return this.inventoryService.summary();
  }

  @Get('movements')
  movements() {
    return this.inventoryService.movements();
  }

  @Post('move')
  move(@Body() dto: MoveStockDto) {
    return this.inventoryService.moveStock(dto);
  }
}

