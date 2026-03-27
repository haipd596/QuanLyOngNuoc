import { Body, Controller, Get, Post } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiQuery } from '@nestjs/swagger';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ApiPaginationQuery } from '../../common/swagger/api-pagination-query.decorator';
import {
  ApiStandardPaginationResponse,
  ApiStandardResponse,
} from '../../common/swagger/api-standard-response.decorator';
import { INTERNAL_ROLES } from '../../common/constants/roles.constant';
import { MoveStockDto } from './dto/move-stock.dto';
import { InventoryService } from './inventory.service';
import {
  buildPaginationInput,
  extractQueryFilters,
} from '../../common/utils/list-query.util';

@Controller('inventory')
@ApiTags('Kho hàng')
@ApiBearerAuth('BearerAuth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(...INTERNAL_ROLES)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('summary')
  @ResponseMessage('Lấy tổng quan tồn kho thành công')
  @ApiPaginationQuery()
  @ApiQuery({
    name: 'Keyword',
    required: false,
    description: 'Tìm theo tên sản phẩm hoặc SKU',
    example: 'ONV-PVC',
  })
  @ApiQuery({ name: 'Query.Id', required: false, example: 'cmai42t3b0000prd001' })
  @ApiQuery({ name: 'Query.Sku', required: false, example: 'ONV-PVC-001' })
  @ApiQuery({ name: 'Query.Name', required: false, example: 'Ống PVC Bình Minh phi 21' })
  @ApiQuery({ name: 'Query.Status', required: false, example: 'ACTIVE' })
  @ApiQuery({ name: 'Query.CategoryId', required: false, example: 'cmai42t3b0000cat001' })
  @ApiQuery({ name: 'Query.SupplierId', required: false, example: 'cmai42t3b0000sup001' })
  @ApiStandardPaginationResponse('Lấy tổng quan tồn kho thành công', 200, {
    id: 'cmai42t3b0000prd001',
    sku: 'ONV-PVC-001',
    name: 'Ống PVC Bình Minh phi 21',
    stockQuantity: 120,
    minStockLevel: 30,
    salePrice: '55000',
  })
  summary(
    @Query('Keyword') keyword: string | undefined,
    @Query('Page') page: string | undefined,
    @Query('PageSize') pageSize: string | undefined,
    @Query() rawQuery: Record<string, unknown>,
  ) {
    const filters = extractQueryFilters(rawQuery, [
      'Id',
      'Sku',
      'Name',
      'Status',
      'CategoryId',
      'SupplierId',
    ]);
    const paging = buildPaginationInput(page, pageSize);
    return this.inventoryService.summary(paging, keyword, filters);
  }

  @Get('movements')
  @ResponseMessage('Lấy lịch sử nhập xuất kho thành công')
  @ApiPaginationQuery()
  @ApiQuery({
    name: 'Keyword',
    required: false,
    description:
      'Tìm theo ghi chú, tên sản phẩm, SKU hoặc loại giao dịch (IMPORT, EXPORT, ADJUST)',
    example: 'IMPORT',
  })
  @ApiQuery({ name: 'Query.Id', required: false, example: 'cmai42t3b0000mov001' })
  @ApiQuery({ name: 'Query.ProductId', required: false, example: 'cmai42t3b0000prd001' })
  @ApiQuery({ name: 'Query.Type', required: false, example: 'IMPORT' })
  @ApiQuery({ name: 'Query.CreatedById', required: false, example: 'cmai42t3b0000staff001' })
  @ApiQuery({ name: 'Query.PurchaseOrderId', required: false, example: 'cmai42t3b0000po001' })
  @ApiQuery({ name: 'Query.SalesOrderId', required: false, example: 'cmai42t3b0000so001' })
  @ApiQuery({ name: 'Query.Note', required: false, example: 'Nhập thêm hàng' })
  @ApiQuery({ name: 'Query.ProductName', required: false, example: 'Ống PVC Bình Minh phi 21' })
  @ApiQuery({ name: 'Query.ProductSku', required: false, example: 'ONV-PVC-001' })
  @ApiStandardPaginationResponse('Lấy lịch sử nhập xuất kho thành công', 200, {
    id: 'cmai42t3b0000mov001',
    productId: 'cmai42t3b0000prd001',
    type: 'IMPORT',
    quantity: 50,
    note: 'Nhập thêm hàng mới',
  })
  movements(
    @Query('Keyword') keyword: string | undefined,
    @Query('Page') page: string | undefined,
    @Query('PageSize') pageSize: string | undefined,
    @Query() rawQuery: Record<string, unknown>,
  ) {
    const filters = extractQueryFilters(rawQuery, [
      'Id',
      'ProductId',
      'Type',
      'CreatedById',
      'PurchaseOrderId',
      'SalesOrderId',
      'Note',
      'ProductName',
      'ProductSku',
    ]);
    const paging = buildPaginationInput(page, pageSize);
    return this.inventoryService.movements(paging, keyword, filters);
  }

  @Post('move')
  @ResponseMessage('Cập nhật tồn kho thành công')
  @ApiStandardResponse('Cập nhật tồn kho thành công', 201)
  move(@Body() dto: MoveStockDto) {
    return this.inventoryService.moveStock(dto);
  }
}
