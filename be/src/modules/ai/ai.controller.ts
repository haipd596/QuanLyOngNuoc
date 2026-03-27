import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ApiPaginationQuery } from '../../common/swagger/api-pagination-query.decorator';
import {
  ApiStandardPaginationResponse,
  ApiStandardResponse,
} from '../../common/swagger/api-standard-response.decorator';
import {
  buildPaginationInput,
  extractQueryFilters,
} from '../../common/utils/list-query.util';
import {
  INTERNAL_ROLES,
  ROLE_ADMIN,
} from '../../common/constants/roles.constant';
import { AiService } from './ai.service';
import { RecalculateAiDto } from './dto/recalculate-ai.dto';

@Controller('ai')
@ApiTags('AI Inventory')
@ApiBearerAuth('BearerAuth')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('restock-recommendations')
  @Roles(...INTERNAL_ROLES)
  @ResponseMessage('Lấy danh sách gợi ý nhập hàng thành công')
  @ApiPaginationQuery()
  @ApiQuery({
    name: 'Keyword',
    required: false,
    description: 'Tìm theo tên sản phẩm, SKU hoặc risk level',
    example: 'PVC',
  })
  @ApiQuery({ name: 'Query.Id', required: false, example: 'cmai42t3b0000ai001' })
  @ApiQuery({
    name: 'Query.ProductId',
    required: false,
    example: 'cmai42t3b0000prd001',
  })
  @ApiQuery({ name: 'Query.ProductName', required: false, example: 'Ống PVC Bình Minh phi 21' })
  @ApiQuery({ name: 'Query.ProductSku', required: false, example: 'ONV-PVC-001' })
  @ApiQuery({ name: 'Query.RiskLevel', required: false, example: 'HIGH' })
  @ApiStandardPaginationResponse('Lấy danh sách gợi ý nhập hàng thành công', 200, {
    id: 'cmai42t3b0000ai001',
    productId: 'cmai42t3b0000prd001',
    currentStock: 12,
    averageDailySales: 3.4,
    recommendedQuantity: 36,
    riskLevel: 'HIGH',
  })
  findRestockRecommendations(
    @Query('Keyword') keyword: string | undefined,
    @Query('Page') page: string | undefined,
    @Query('PageSize') pageSize: string | undefined,
    @Query() rawQuery: Record<string, unknown>,
  ) {
    const filters = extractQueryFilters(rawQuery, [
      'Id',
      'ProductId',
      'ProductName',
      'ProductSku',
      'RiskLevel',
    ]);
    const paging = buildPaginationInput(page, pageSize);
    return this.aiService.findRestockRecommendations(paging, keyword, filters);
  }

  @Post('recalculate')
  @Roles(ROLE_ADMIN)
  @ResponseMessage('Tính lại gợi ý nhập hàng thành công')
  @ApiStandardResponse('Tính lại gợi ý nhập hàng thành công', 201)
  recalculate(@Body() dto: RecalculateAiDto) {
    return this.aiService.recalculate(dto.targetDays);
  }
}
