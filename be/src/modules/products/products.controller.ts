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
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles('ADMIN')
  @ResponseMessage('Tạo sản phẩm thành công')
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Get()
  @Roles('ADMIN', 'USER')
  @ResponseMessage('Lấy danh sách sản phẩm thành công')
  findAll(@Query() query: PaginationQueryDto, @Query('search') search?: string) {
    return this.productsService.findAll(query, search);
  }

  @Get('low-stock')
  @Roles('ADMIN', 'USER')
  @ResponseMessage('Lấy danh sách sản phẩm tồn thấp thành công')
  lowStock(@Query() query: PaginationQueryDto) {
    return this.productsService.findLowStock(query);
  }

  @Get(':id')
  @Roles('ADMIN', 'USER')
  @ResponseMessage('Lấy chi tiết sản phẩm thành công')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @ResponseMessage('Cập nhật sản phẩm thành công')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ResponseMessage('Xóa sản phẩm thành công')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
