import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ResponseMessage('Tạo vai trò thành công')
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.create(dto);
  }

  @Get()
  @ResponseMessage('Lấy danh sách vai trò thành công')
  findAll(@Query() query: PaginationQueryDto) {
    return this.rolesService.findAll(query);
  }

  @Get(':id')
  @ResponseMessage('Lấy chi tiết vai trò thành công')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Cập nhật vai trò thành công')
  update(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    return this.rolesService.update(id, dto);
  }

  @Delete(':id')
  @ResponseMessage('Xóa vai trò thành công')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
