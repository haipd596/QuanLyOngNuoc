import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import type { Request } from 'express';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ApiPaginationQuery } from '../../common/swagger/api-pagination-query.decorator';
import {
  ApiStandardPaginationResponse,
  ApiStandardResponse,
} from '../../common/swagger/api-standard-response.decorator';
import { ROLE_ADMIN } from '../../common/constants/roles.constant';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import {
  buildPaginationInput,
  extractQueryFilters,
} from '../../common/utils/list-query.util';

@Controller('products')
@ApiTags('San pham')
@ApiBearerAuth('BearerAuth')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('upload')
  @Roles(ROLE_ADMIN)
  @UseInterceptors(
    FileInterceptor('file', {
      dest: join(process.cwd(), 'uploads', 'products'),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (
        _req: unknown,
        file: { mimetype: string },
        cb: (error: Error | null, acceptFile: boolean) => void,
      ) => {
        if (!file.mimetype.startsWith('image/')) {
          cb(new BadRequestException('Chi ho tro file anh'), false);
          return;
        }
        cb(null, true);
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['file'],
    },
  })
  @ResponseMessage('Upload anh thanh cong')
  @ApiStandardResponse('Upload anh thanh cong', 201)
  uploadProductImage(
    @UploadedFile() file: { filename: string } | undefined,
    @Req() req: Request,
  ) {
    if (!file) {
      throw new BadRequestException('Vui long chon file anh');
    }

    const host = req.get('host');
    const baseUrl = `${req.protocol}://${host}`;
    const url = `${baseUrl}/uploads/products/${file.filename}`;
    return {
      filename: file.filename,
      url,
      path: `/uploads/products/${file.filename}`,
    };
  }

  @Post()
  @Roles(ROLE_ADMIN)
  @ResponseMessage('Tao san pham thanh cong')
  @ApiStandardResponse('Tao san pham thanh cong', 201)
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Get()
  @Public()
  @ResponseMessage('Lay danh sach san pham thanh cong')
  @ApiPaginationQuery()
  @ApiQuery({
    name: 'Keyword',
    required: false,
    description: 'Tim theo ten san pham, SKU hoac slug',
    example: 'PVC',
  })
  @ApiQuery({ name: 'Query.Id', required: false, example: 'cmai42t3b0000prd001' })
  @ApiQuery({ name: 'Query.Sku', required: false, example: 'ONV-PVC-001' })
  @ApiQuery({ name: 'Query.Name', required: false, example: 'Ong PVC Binh Minh phi 21' })
  @ApiQuery({ name: 'Query.Slug', required: false, example: 'ong-pvc-binh-minh-phi-21' })
  @ApiQuery({ name: 'Query.Unit', required: false, example: 'Cay' })
  @ApiQuery({ name: 'Query.Status', required: false, example: 'ACTIVE' })
  @ApiQuery({ name: 'Query.HotYN', required: false, example: 'true' })
  @ApiQuery({ name: 'Query.CategoryId', required: false, example: 'cmai42t3b0000cat001' })
  @ApiQuery({ name: 'Query.SupplierId', required: false, example: 'cmai42t3b0000sup001' })
  @ApiStandardPaginationResponse('Lay danh sach san pham thanh cong', 200, {
    id: 'cmai42t3b0000prd001',
    sku: 'ONV-PVC-001',
    name: 'Ong PVC Binh Minh phi 21',
    unit: 'Cay',
    salePrice: '55000',
    stockQuantity: 120,
  })
  findAll(
    @Query('Keyword') keyword: string | undefined,
    @Query('Page') page: string | undefined,
    @Query('PageSize') pageSize: string | undefined,
    @Query() rawQuery: Record<string, unknown>,
  ) {
    const filters = extractQueryFilters(rawQuery, [
      'Id',
      'Sku',
      'Name',
      'Slug',
      'Unit',
      'Status',
      'HotYN',
      'CategoryId',
      'SupplierId',
    ]);
    const paging = buildPaginationInput(page, pageSize);
    return this.productsService.findAll(paging, keyword, filters);
  }

  @Get('low-stock')
  @Roles(ROLE_ADMIN)
  @ResponseMessage('Lay danh sach san pham ton thap thanh cong')
  @ApiPaginationQuery()
  @ApiQuery({
    name: 'Keyword',
    required: false,
    description: 'Tim theo ten san pham, SKU hoac slug trong nhom ton thap',
    example: 'day dien',
  })
  @ApiQuery({ name: 'Query.Id', required: false, example: 'cmai42t3b0000prd005' })
  @ApiQuery({ name: 'Query.Sku', required: false, example: 'ONV-WIRE-001' })
  @ApiQuery({ name: 'Query.Name', required: false, example: 'Day dien CADIVI 2.5mm' })
  @ApiQuery({ name: 'Query.Slug', required: false, example: 'day-dien-cadivi-2-5mm' })
  @ApiQuery({ name: 'Query.Status', required: false, example: 'ACTIVE' })
  @ApiStandardPaginationResponse('Lay danh sach san pham ton thap thanh cong', 200, {
    id: 'cmai42t3b0000prd005',
    sku: 'ONV-WIRE-001',
    name: 'Day dien CADIVI 2.5mm',
    stockQuantity: 18,
    minStockLevel: 20,
  })
  lowStock(
    @Query('Keyword') keyword: string | undefined,
    @Query('Page') page: string | undefined,
    @Query('PageSize') pageSize: string | undefined,
    @Query() rawQuery: Record<string, unknown>,
  ) {
    const filters = extractQueryFilters(rawQuery, ['Id', 'Sku', 'Name', 'Slug', 'Status']);
    const paging = buildPaginationInput(page, pageSize);
    return this.productsService.findLowStock(paging, keyword, filters);
  }

  @Get(':id')
  @Public()
  @ResponseMessage('Lay chi tiet san pham thanh cong')
  @ApiStandardResponse('Lay chi tiet san pham thanh cong')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @Roles(ROLE_ADMIN)
  @ResponseMessage('Cap nhat san pham thanh cong')
  @ApiStandardResponse('Cap nhat san pham thanh cong')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  @Roles(ROLE_ADMIN)
  @ResponseMessage('Xoa san pham thanh cong')
  @ApiStandardResponse('Xoa san pham thanh cong')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
