import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomersService } from './customers.service';

@Controller('customers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @Roles('ADMIN', 'USER')
  @ResponseMessage('Tạo khách hàng thành công')
  create(@Body() dto: CreateCustomerDto) {
    return this.customersService.create(dto);
  }

  @Get()
  @Roles('ADMIN', 'USER')
  @ResponseMessage('Lấy danh sách khách hàng thành công')
  findAll(@Query() query: PaginationQueryDto) {
    return this.customersService.findAll(query);
  }

  @Get(':id')
  @Roles('ADMIN', 'USER')
  @ResponseMessage('Lấy chi tiết khách hàng thành công')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'USER')
  @ResponseMessage('Cập nhật khách hàng thành công')
  update(@Param('id') id: string, @Body() dto: UpdateCustomerDto) {
    return this.customersService.update(id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ResponseMessage('Xóa khách hàng thành công')
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
