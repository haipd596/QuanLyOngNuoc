import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SuppliersService } from './suppliers.service';

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
    name: 'keyword',
    required: false,
    description: 'Tìm theo tên, số điện thoại, email, mã số thuế hoặc địa chỉ',
    example: 'Miền Nam',
  })
  @ApiStandardPaginationResponse('Lấy danh sách nhà cung cấp thành công', 200, {
    id: 'cmai42t3b0000sup001',
    name: 'Công ty Nhựa Miền Nam',
    phone: '02838118888',
    email: 'sale@nhuamiennam.vn',
  })
  findAll(@Query() query: PaginationQueryDto) {
    return this.suppliersService.findAll(query, query.keyword);
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
