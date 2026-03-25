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
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
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
    name: 'keyword',
    required: false,
    description: 'Tìm theo tên sản phẩm, SKU hoặc slug',
    example: 'PVC',
  })
  @ApiStandardPaginationResponse('Lấy danh sách sản phẩm thành công')
  findAll(@Query() query: PaginationQueryDto) {
    return this.productsService.findAll(query, query.keyword);
  }

  @Get('low-stock')
  @Roles('ADMIN', 'USER')
  @ResponseMessage('Lấy danh sách sản phẩm tồn thấp thành công')
  @ApiPaginationQuery()
  @ApiQuery({
    name: 'keyword',
    required: false,
    description: 'Tìm theo tên sản phẩm, SKU hoặc slug trong nhóm tồn thấp',
    example: 'dây điện',
  })
  @ApiStandardPaginationResponse('Lấy danh sách sản phẩm tồn thấp thành công')
  lowStock(@Query() query: PaginationQueryDto) {
    return this.productsService.findLowStock(query, query.keyword);
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
