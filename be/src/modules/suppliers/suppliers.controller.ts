import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SuppliersService } from './suppliers.service';
import {
  buildPaginationInput,
  extractQueryFilters,
} from '../../common/utils/list-query.util';

@Controller('suppliers')
@ApiTags('Nhà cung cấp')
@ApiBearerAuth('BearerAuth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  @ResponseMessage('Tạo nhà cung cấp thành công')
  @ApiStandardResponse('Tạo nhà cung cấp thành công', 201)
  create(@Body() dto: CreateSupplierDto) {
    return this.suppliersService.create(dto);
  }

  @Get()
  @ResponseMessage('Lấy danh sách nhà cung cấp thành công')
  @ApiPaginationQuery()
  @ApiQuery({
    name: 'Keyword',
    required: false,
    description: 'Tìm theo tên, số điện thoại, email, mã số thuế hoặc địa chỉ',
    example: 'Miền Nam',
  })
  @ApiQuery({ name: 'Query.Id', required: false, example: 'cmai42t3b0000sup001' })
  @ApiQuery({ name: 'Query.Name', required: false, example: 'Công ty Nhựa Miền Nam' })
  @ApiQuery({ name: 'Query.Phone', required: false, example: '02838118888' })
  @ApiQuery({ name: 'Query.Email', required: false, example: 'sale@nhuamiennam.vn' })
  @ApiQuery({ name: 'Query.Address', required: false, example: 'KCN Tân Bình, TP.HCM' })
  @ApiQuery({ name: 'Query.TaxCode', required: false, example: '0312345678' })
  @ApiStandardPaginationResponse('Lấy danh sách nhà cung cấp thành công', 200, {
    id: 'cmai42t3b0000sup001',
    name: 'Công ty Nhựa Miền Nam',
    phone: '02838118888',
    email: 'sale@nhuamiennam.vn',
  })
  findAll(
    @Query('Keyword') keyword: string | undefined,
    @Query('Page') page: string | undefined,
    @Query('PageSize') pageSize: string | undefined,
    @Query() rawQuery: Record<string, unknown>,
  ) {
    const filters = extractQueryFilters(rawQuery, [
      'Id',
      'Name',
      'Phone',
      'Email',
      'Address',
      'TaxCode',
    ]);
    const paging = buildPaginationInput(page, pageSize);
    return this.suppliersService.findAll(paging, keyword, filters);
  }

  @Get(':id')
  @ResponseMessage('Lấy chi tiết nhà cung cấp thành công')
  @ApiStandardResponse('Lấy chi tiết nhà cung cấp thành công')
  findOne(@Param('id') id: string) {
    return this.suppliersService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Cập nhật nhà cung cấp thành công')
  @ApiStandardResponse('Cập nhật nhà cung cấp thành công')
  update(@Param('id') id: string, @Body() dto: UpdateSupplierDto) {
    return this.suppliersService.update(id, dto);
  }

  @Delete(':id')
  @ResponseMessage('Xóa nhà cung cấp thành công')
  @ApiStandardResponse('Xóa nhà cung cấp thành công')
  remove(@Param('id') id: string) {
    return this.suppliersService.remove(id);
  }
}
