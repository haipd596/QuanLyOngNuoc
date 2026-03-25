import { BadRequestException, Injectable } from '@nestjs/common';
import { StockMovementType } from '@prisma/client';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import {
  buildPaginatedResult,
  normalizePagination,
} from '../../common/utils/pagination.util';
import { PrismaService } from '../../config/prisma.service';
import { MoveStockDto } from './dto/move-stock.dto';

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  async summary(query: PaginationQueryDto) {
    const { page, limit, skip } = normalizePagination(query);
    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        select: {
          id: true,
          sku: true,
          name: true,
          stockQuantity: true,
          minStockLevel: true,
          salePrice: true,
        },
        orderBy: { stockQuantity: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.product.count(),
    ]);

    return buildPaginatedResult(items, total, page, limit);
  }

  async movements(query: PaginationQueryDto) {
    const { page, limit, skip } = normalizePagination(query);
    const [items, total] = await Promise.all([
      this.prisma.stockMovement.findMany({
        include: {
          product: {
            select: { id: true, sku: true, name: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.stockMovement.count(),
    ]);

    return buildPaginatedResult(items, total, page, limit);
  }

  async moveStock(dto: MoveStockDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
      select: { id: true, stockQuantity: true },
    });
    if (!product) {
      throw new BadRequestException('Không tìm thấy sản phẩm');
    }

    let nextStock = product.stockQuantity;
    if (dto.type === StockMovementType.IMPORT) {
      nextStock += dto.quantity;
    }
    if (dto.type === StockMovementType.EXPORT) {
      nextStock -= dto.quantity;
    }
    if (dto.type === StockMovementType.ADJUST) {
      nextStock = dto.quantity;
    }

    if (nextStock < 0) {
      throw new BadRequestException('Tồn kho không được âm');
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.product.update({
        where: { id: dto.productId },
        data: { stockQuantity: nextStock },
      });

      return tx.stockMovement.create({
        data: {
          productId: dto.productId,
          type: dto.type,
          quantity: dto.quantity,
          note: dto.note,
          createdById: dto.createdById,
        },
      });
    });
  }
}
