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
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomersService } from './customers.service';
import {
  buildPaginationInput,
  extractQueryFilters,
} from '../../common/utils/list-query.util';

@Controller('customers')
@ApiTags('Khách hàng')
@ApiBearerAuth('BearerAuth')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @Roles('ADMIN', 'USER')
  @ResponseMessage('Tạo khách hàng thành công')
  @ApiStandardResponse('Tạo khách hàng thành công', 201)
  create(@Body() dto: CreateCustomerDto) {
    return this.customersService.create(dto);
  }

  @Get()
  @Roles('ADMIN', 'USER')
  @ResponseMessage('Lấy danh sách khách hàng thành công')
  @ApiPaginationQuery()
  @ApiQuery({
    name: 'Keyword',
    required: false,
    description: 'Tìm theo tên, số điện thoại, email hoặc địa chỉ khách hàng',
    example: 'Phạm',
  })
  @ApiQuery({ name: 'Query.Id', required: false, example: 'cmai42t3b0000cus001' })
  @ApiQuery({ name: 'Query.FullName', required: false, example: 'Phạm Văn A' })
  @ApiQuery({ name: 'Query.Phone', required: false, example: '0911000001' })
  @ApiQuery({ name: 'Query.Email', required: false, example: 'phamvana@gmail.com' })
  @ApiQuery({ name: 'Query.Address', required: false, example: 'Gò Vấp, TP.HCM' })
  @ApiStandardPaginationResponse('Lấy danh sách khách hàng thành công', 200, {
    id: 'cmai42t3b0000cus001',
    fullName: 'Phạm Văn A',
    phone: '0911000001',
    email: 'phamvana@gmail.com',
    address: 'Gò Vấp, TP.HCM',
  })
  findAll(
    @Query('Keyword') keyword: string | undefined,
    @Query('Page') page: string | undefined,
    @Query('PageSize') pageSize: string | undefined,
    @Query() rawQuery: Record<string, unknown>,
  ) {
    const filters = extractQueryFilters(rawQuery, [
      'Id',
      'FullName',
      'Phone',
      'Email',
      'Address',
    ]);
    const paging = buildPaginationInput(page, pageSize);
    return this.customersService.findAll(paging, keyword, filters);
  }

  @Get(':id')
  @Roles('ADMIN', 'USER')
  @ResponseMessage('Lấy chi tiết khách hàng thành công')
  @ApiStandardResponse('Lấy chi tiết khách hàng thành công')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'USER')
  @ResponseMessage('Cập nhật khách hàng thành công')
  @ApiStandardResponse('Cập nhật khách hàng thành công')
  update(@Param('id') id: string, @Body() dto: UpdateCustomerDto) {
    return this.customersService.update(id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ResponseMessage('Xóa khách hàng thành công')
  @ApiStandardResponse('Xóa khách hàng thành công')
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
