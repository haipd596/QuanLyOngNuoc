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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth('BearerAuth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
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
    name: 'keyword',
    required: false,
    description: 'Tìm theo họ tên, email hoặc số điện thoại',
    example: 'user',
  })
  @ApiStandardPaginationResponse('Lấy danh sách người dùng thành công')
  findAll(@Query() query: PaginationQueryDto, @Query('keyword') keyword?: string) {
    return this.usersService.findAll(query, keyword);
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
