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
import { ROLE_ADMIN } from '../../common/constants/roles.constant';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import {
  buildPaginationInput,
  extractQueryFilters,
} from '../../common/utils/list-query.util';

@Controller('users')
@ApiTags('Người dùng')
@ApiBearerAuth('BearerAuth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(ROLE_ADMIN)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ResponseMessage('Tạo người dùng thành công')
  @ApiStandardResponse('Tạo người dùng thành công', 201)
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  @ResponseMessage('Lấy danh sách người dùng thành công')
  @ApiPaginationQuery()
  @ApiQuery({
    name: 'Keyword',
    required: false,
    description: 'Tìm theo họ tên, email hoặc số điện thoại',
    example: 'user',
  })
  @ApiQuery({ name: 'Query.Id', required: false, example: 'cmai42t3b0000abc123xyz' })
  @ApiQuery({ name: 'Query.FullName', required: false, example: 'Trần Bán Hàng' })
  @ApiQuery({ name: 'Query.Email', required: false, example: 'user@ongnuocviet.vn' })
  @ApiQuery({ name: 'Query.Phone', required: false, example: '0909123456' })
  @ApiQuery({ name: 'Query.Status', required: false, example: 'ACTIVE' })
  @ApiQuery({ name: 'Query.RoleId', required: false, example: 'cmai42t3b0000role001' })
  @ApiStandardPaginationResponse('Lấy danh sách người dùng thành công', 200, {
    id: 'cmai42t3b0000abc123xyz',
    fullName: 'Trần Bán Hàng',
    email: 'user@ongnuocviet.vn',
    phone: '0909123456',
    roleId: 'cmai42t3b0000role001',
    status: 'ACTIVE',
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
      'Email',
      'Phone',
      'Status',
      'RoleId',
    ]);
    const paging = buildPaginationInput(page, pageSize);
    return this.usersService.findAll(paging, keyword, filters);
  }

  @Get(':id')
  @ResponseMessage('Lấy chi tiết người dùng thành công')
  @ApiStandardResponse('Lấy chi tiết người dùng thành công')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Cập nhật người dùng thành công')
  @ApiStandardResponse('Cập nhật người dùng thành công')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @ResponseMessage('Xóa người dùng thành công')
  @ApiStandardResponse('Xóa người dùng thành công')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
