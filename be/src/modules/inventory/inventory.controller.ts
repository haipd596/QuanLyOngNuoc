import { Body, Controller, Get, Post } from '@nestjs/common';
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
import { MoveStockDto } from './dto/move-stock.dto';
import { InventoryService } from './inventory.service';

@Controller('inventory')
@ApiTags('Inventory')
@ApiBearerAuth('BearerAuth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'USER')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('summary')
  @ResponseMessage('Lấy tổng quan tồn kho thành công')
  @ApiPaginationQuery()
  @ApiQuery({
    name: 'keyword',
    required: false,
    description: 'Tìm theo tên sản phẩm hoặc SKU',
    example: 'ONV-PVC',
  })
  @ApiStandardPaginationResponse('Lấy tổng quan tồn kho thành công')
  summary(@Query() query: PaginationQueryDto, @Query('keyword') keyword?: string) {
    return this.inventoryService.summary(query, keyword);
  }

  @Get('movements')
  @ResponseMessage('Lấy lịch sử nhập xuất kho thành công')
  @ApiPaginationQuery()
  @ApiQuery({
    name: 'keyword',
    required: false,
    description:
      'Tìm theo ghi chú, tên sản phẩm, SKU hoặc loại giao dịch (IMPORT, EXPORT, ADJUST)',
    example: 'IMPORT',
  })
  @ApiStandardPaginationResponse('Lấy lịch sử nhập xuất kho thành công')
  movements(@Query() query: PaginationQueryDto, @Query('keyword') keyword?: string) {
    return this.inventoryService.movements(query, keyword);
  }

  @Post('move')
  @ResponseMessage('Cập nhật tồn kho thành công')
  @ApiStandardResponse('Cập nhật tồn kho thành công', 201)
  move(@Body() dto: MoveStockDto) {
    return this.inventoryService.moveStock(dto);
  }
}
