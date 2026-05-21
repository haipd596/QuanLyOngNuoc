import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { INTERNAL_ROLES } from '../../common/constants/roles.constant';
import { Public } from '../../common/decorators/public.decorator';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ApiPaginationQuery } from '../../common/swagger/api-pagination-query.decorator';
import { ApiStandardPaginationResponse, ApiStandardResponse } from '../../common/swagger/api-standard-response.decorator';
import { buildPaginationInput, extractQueryFilters } from '../../common/utils/list-query.util';
import { ContactMessagesService } from './contact-messages.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { UpdateContactMessageDto } from './dto/update-contact-message.dto';

@Controller('contact-messages')
@ApiTags('Lien he')
export class ContactMessagesController {
  constructor(private readonly contactMessagesService: ContactMessagesService) {}

  @Post()
  @Public()
  @ResponseMessage('Gui lien he thanh cong')
  @ApiStandardResponse('Gui lien he thanh cong', 201)
  create(@Body() dto: CreateContactMessageDto) {
    return this.contactMessagesService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('BearerAuth')
  @Roles(...INTERNAL_ROLES)
  @ResponseMessage('Lay danh sach lien he thanh cong')
  @ApiPaginationQuery()
  @ApiQuery({ name: 'Keyword', required: false, example: 'nguyen' })
  @ApiQuery({ name: 'Query.Id', required: false })
  @ApiQuery({ name: 'Query.FullName', required: false })
  @ApiQuery({ name: 'Query.Email', required: false })
  @ApiQuery({ name: 'Query.Phone', required: false })
  @ApiQuery({ name: 'Query.Status', required: false, example: 'NEW' })
  @ApiStandardPaginationResponse('Lay danh sach lien he thanh cong')
  findAll(
    @Query('Keyword') keyword: string | undefined,
    @Query('Page') page: string | undefined,
    @Query('PageSize') pageSize: string | undefined,
    @Query() rawQuery: Record<string, unknown>,
  ) {
    const filters = extractQueryFilters(rawQuery, ['Id', 'FullName', 'Email', 'Phone', 'Status']);
    const paging = buildPaginationInput(page, pageSize);
    return this.contactMessagesService.findAll(paging, keyword, filters);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('BearerAuth')
  @Roles(...INTERNAL_ROLES)
  @ResponseMessage('Lay chi tiet lien he thanh cong')
  @ApiStandardResponse('Lay chi tiet lien he thanh cong')
  findOne(@Param('id') id: string) {
    return this.contactMessagesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('BearerAuth')
  @Roles(...INTERNAL_ROLES)
  @ResponseMessage('Cap nhat lien he thanh cong')
  @ApiStandardResponse('Cap nhat lien he thanh cong')
  update(@Param('id') id: string, @Body() dto: UpdateContactMessageDto) {
    return this.contactMessagesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('BearerAuth')
  @Roles(...INTERNAL_ROLES)
  @ResponseMessage('Xoa lien he thanh cong')
  @ApiStandardResponse('Xoa lien he thanh cong')
  remove(@Param('id') id: string) {
    return this.contactMessagesService.remove(id);
  }
}
