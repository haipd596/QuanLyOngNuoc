import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ROLE_ADMIN } from '../../common/constants/roles.constant';
import { Public } from '../../common/decorators/public.decorator';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ApiPaginationQuery } from '../../common/swagger/api-pagination-query.decorator';
import {
  ApiStandardPaginationResponse,
  ApiStandardResponse,
} from '../../common/swagger/api-standard-response.decorator';
import {
  buildPaginationInput,
  extractQueryFilters,
} from '../../common/utils/list-query.util';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
@ApiTags('Danh mục')
@ApiBearerAuth('BearerAuth')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Roles(ROLE_ADMIN)
  @ResponseMessage('Tạo danh mục thành công')
  @ApiStandardResponse('Tạo danh mục thành công', 201)
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  @Get()
  @Public()
  @ResponseMessage('Lấy danh sách danh mục thành công')
  @ApiPaginationQuery()
  @ApiQuery({
    name: 'Keyword',
    required: false,
    description: 'Tìm theo tên danh mục, slug hoặc mô tả',
    example: 'ống',
  })
  @ApiQuery({ name: 'Query.Id', required: false, example: 'cmai42t3b0000cat001' })
  @ApiQuery({ name: 'Query.Name', required: false, example: 'Ống nước' })
  @ApiQuery({ name: 'Query.Slug', required: false, example: 'ong-nuoc' })
  @ApiQuery({ name: 'Query.Description', required: false, example: 'Danh mục ống và phụ kiện' })
  @ApiStandardPaginationResponse('Lấy danh sách danh mục thành công', 200, {
    id: 'cmai42t3b0000cat001',
    name: 'Ống nước',
    slug: 'ong-nuoc',
    description: 'Danh mục ống và phụ kiện',
  })
  findAll(
    @Query('Keyword') keyword: string | undefined,
    @Query('Page') page: string | undefined,
    @Query('PageSize') pageSize: string | undefined,
    @Query() rawQuery: Record<string, unknown>,
  ) {
    const filters = extractQueryFilters(rawQuery, ['Id', 'Name', 'Slug', 'Description']);
    const paging = buildPaginationInput(page, pageSize);
    return this.categoriesService.findAll(paging, keyword, filters);
  }

  @Get('product-counts')
  @Public()
  @ResponseMessage('Lấy số lượng sản phẩm theo danh mục thành công')
  @ApiStandardResponse('Lấy số lượng sản phẩm theo danh mục thành công', 200, [
    {
      id: 'cmai42t3b0000cat001',
      name: 'Ống nước',
      slug: 'ong-nuoc',
      productCount: 12,
    },
  ])
  getProductCounts() {
    return this.categoriesService.getProductCounts();
  }

  @Get(':id')
  @Public()
  @ResponseMessage('Lấy chi tiết danh mục thành công')
  @ApiStandardResponse('Lấy chi tiết danh mục thành công')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @Roles(ROLE_ADMIN)
  @ResponseMessage('Cập nhật danh mục thành công')
  @ApiStandardResponse('Cập nhật danh mục thành công')
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoriesService.update(id, dto);
  }

  @Delete(':id')
  @Roles(ROLE_ADMIN)
  @ResponseMessage('Xóa danh mục thành công')
  @ApiStandardResponse('Xóa danh mục thành công')
  remove(
    @Param('id') id: string,
    @Query('force') force: string | undefined,
  ) {
    return this.categoriesService.remove(id, String(force).toLowerCase() === 'true');
  }
}
