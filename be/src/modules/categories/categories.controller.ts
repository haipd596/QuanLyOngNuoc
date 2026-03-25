import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ResponseMessage('Tạo danh mục thành công')
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  @Get()
  @ResponseMessage('Lấy danh sách danh mục thành công')
  findAll(@Query() query: PaginationQueryDto) {
    return this.categoriesService.findAll(query);
  }

  @Get(':id')
  @ResponseMessage('Lấy chi tiết danh mục thành công')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Cập nhật danh mục thành công')
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoriesService.update(id, dto);
  }

  @Delete(':id')
  @ResponseMessage('Xóa danh mục thành công')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
