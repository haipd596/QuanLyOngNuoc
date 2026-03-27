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
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';
import {
  buildPaginationInput,
  extractQueryFilters,
} from '../../common/utils/list-query.util';

@Controller('roles')
@ApiTags('Vai trò')
@ApiBearerAuth('BearerAuth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(ROLE_ADMIN)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ResponseMessage('Tạo vai trò thành công')
  @ApiStandardResponse('Tạo vai trò thành công', 201)
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.create(dto);
  }

  @Get()
  @ResponseMessage('Lấy danh sách vai trò thành công')
  @ApiPaginationQuery()
  @ApiQuery({
    name: 'Keyword',
    required: false,
    description: 'Tìm theo tên vai trò hoặc mô tả',
    example: 'ADMIN',
  })
  @ApiQuery({ name: 'Query.Id', required: false, example: 'cmai42t3b0000role001' })
  @ApiQuery({ name: 'Query.Name', required: false, example: 'ADMIN' })
  @ApiQuery({ name: 'Query.Description', required: false, example: 'Quản trị toàn hệ thống' })
  @ApiStandardPaginationResponse('Lấy danh sách vai trò thành công', 200, {
    id: 'cmai42t3b0000role001',
    name: 'ADMIN',
    description: 'Quản trị toàn hệ thống',
  })
  findAll(
    @Query('Keyword') keyword: string | undefined,
    @Query('Page') page: string | undefined,
    @Query('PageSize') pageSize: string | undefined,
    @Query() rawQuery: Record<string, unknown>,
  ) {
    const filters = extractQueryFilters(rawQuery, ['Id', 'Name', 'Description']);
    const paging = buildPaginationInput(page, pageSize);
    return this.rolesService.findAll(paging, keyword, filters);
  }

  @Get(':id')
  @ResponseMessage('Lấy chi tiết vai trò thành công')
  @ApiStandardResponse('Lấy chi tiết vai trò thành công')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Cập nhật vai trò thành công')
  @ApiStandardResponse('Cập nhật vai trò thành công')
  update(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    return this.rolesService.update(id, dto);
  }

  @Delete(':id')
  @ResponseMessage('Xóa vai trò thành công')
  @ApiStandardResponse('Xóa vai trò thành công')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
