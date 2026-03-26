import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
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
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import {
  buildPaginationInput,
  extractQueryFilters,
} from '../../common/utils/list-query.util';

@Controller('products')
@ApiTags('Sản phẩm')
@ApiBearerAuth('BearerAuth')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles('ADMIN')
  @ResponseMessage('Tạo sản phẩm thành công')
  @ApiStandardResponse('Tạo sản phẩm thành công', 201)
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Get()
  @Roles('ADMIN', 'USER')
  @ResponseMessage('Lấy danh sách sản phẩm thành công')
  @ApiPaginationQuery()
  @ApiQuery({
    name: 'Keyword',
    required: false,
    description: 'Tìm theo tên sản phẩm, SKU hoặc slug',
    example: 'PVC',
  })
  @ApiQuery({ name: 'Query.Id', required: false, example: 'cmai42t3b0000prd001' })
  @ApiQuery({ name: 'Query.Sku', required: false, example: 'ONV-PVC-001' })
  @ApiQuery({ name: 'Query.Name', required: false, example: 'Ống PVC Bình Minh phi 21' })
  @ApiQuery({ name: 'Query.Slug', required: false, example: 'ong-pvc-binh-minh-phi-21' })
  @ApiQuery({ name: 'Query.Unit', required: false, example: 'Cây' })
  @ApiQuery({ name: 'Query.Status', required: false, example: 'ACTIVE' })
  @ApiQuery({ name: 'Query.CategoryId', required: false, example: 'cmai42t3b0000cat001' })
  @ApiQuery({ name: 'Query.SupplierId', required: false, example: 'cmai42t3b0000sup001' })
  @ApiStandardPaginationResponse('Lấy danh sách sản phẩm thành công', 200, {
    id: 'cmai42t3b0000prd001',
    sku: 'ONV-PVC-001',
    name: 'Ống PVC Bình Minh phi 21',
    unit: 'Cây',
    salePrice: '55000',
    stockQuantity: 120,
  })
  findAll(
    @Query('Keyword') keyword: string | undefined,
    @Query('Page') page: string | undefined,
    @Query('PageSize') pageSize: string | undefined,
    @Query() rawQuery: Record<string, unknown>,
  ) {
    const filters = extractQueryFilters(rawQuery, [
      'Id',
      'Sku',
      'Name',
      'Slug',
      'Unit',
      'Status',
      'CategoryId',
      'SupplierId',
    ]);
    const paging = buildPaginationInput(page, pageSize);
    return this.productsService.findAll(paging, keyword, filters);
  }

  @Get('low-stock')
  @Roles('ADMIN', 'USER')
  @ResponseMessage('Lấy danh sách sản phẩm tồn thấp thành công')
  @ApiPaginationQuery()
  @ApiQuery({
    name: 'Keyword',
    required: false,
    description: 'Tìm theo tên sản phẩm, SKU hoặc slug trong nhóm tồn thấp',
    example: 'dây điện',
  })
  @ApiQuery({ name: 'Query.Id', required: false, example: 'cmai42t3b0000prd005' })
  @ApiQuery({ name: 'Query.Sku', required: false, example: 'ONV-WIRE-001' })
  @ApiQuery({ name: 'Query.Name', required: false, example: 'Dây điện CADIVI 2.5mm' })
  @ApiQuery({ name: 'Query.Slug', required: false, example: 'day-dien-cadivi-2-5mm' })
  @ApiQuery({ name: 'Query.Status', required: false, example: 'ACTIVE' })
  @ApiStandardPaginationResponse('Lấy danh sách sản phẩm tồn thấp thành công', 200, {
    id: 'cmai42t3b0000prd005',
    sku: 'ONV-WIRE-001',
    name: 'Dây điện CADIVI 2.5mm',
    stockQuantity: 18,
    minStockLevel: 20,
  })
  lowStock(
    @Query('Keyword') keyword: string | undefined,
    @Query('Page') page: string | undefined,
    @Query('PageSize') pageSize: string | undefined,
    @Query() rawQuery: Record<string, unknown>,
  ) {
    const filters = extractQueryFilters(rawQuery, ['Id', 'Sku', 'Name', 'Slug', 'Status']);
    const paging = buildPaginationInput(page, pageSize);
    return this.productsService.findLowStock(paging, keyword, filters);
  }

  @Get(':id')
  @Roles('ADMIN', 'USER')
  @ResponseMessage('Lấy chi tiết sản phẩm thành công')
  @ApiStandardResponse('Lấy chi tiết sản phẩm thành công')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @ResponseMessage('Cập nhật sản phẩm thành công')
  @ApiStandardResponse('Cập nhật sản phẩm thành công')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ResponseMessage('Xóa sản phẩm thành công')
  @ApiStandardResponse('Xóa sản phẩm thành công')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
