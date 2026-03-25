import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SuppliersService } from './suppliers.service';

@Controller('suppliers')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  @ResponseMessage('Tạo nhà cung cấp thành công')
  create(@Body() dto: CreateSupplierDto) {
    return this.suppliersService.create(dto);
  }

  @Get()
  @ResponseMessage('Lấy danh sách nhà cung cấp thành công')
  findAll(@Query() query: PaginationQueryDto) {
    return this.suppliersService.findAll(query);
  }

  @Get(':id')
  @ResponseMessage('Lấy chi tiết nhà cung cấp thành công')
  findOne(@Param('id') id: string) {
    return this.suppliersService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Cập nhật nhà cung cấp thành công')
  update(@Param('id') id: string, @Body() dto: UpdateSupplierDto) {
    return this.suppliersService.update(id, dto);
  }

  @Delete(':id')
  @ResponseMessage('Xóa nhà cung cấp thành công')
  remove(@Param('id') id: string) {
    return this.suppliersService.remove(id);
  }
}
