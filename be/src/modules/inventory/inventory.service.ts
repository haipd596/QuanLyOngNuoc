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

  async summary(
    query: PaginationQueryDto,
    keyword?: string,
    filters?: Record<string, string>,
  ) {
    const { page, limit, skip } = normalizePagination(query);
    const andConditions: Record<string, unknown>[] = [];

    if (keyword) {
      andConditions.push({
        OR: [
          { name: { contains: keyword } },
          { sku: { contains: keyword } },
        ],
      });
    }

    if (filters?.Id) andConditions.push({ id: { equals: filters.Id } });
    if (filters?.Sku) andConditions.push({ sku: { contains: filters.Sku } });
    if (filters?.Name) andConditions.push({ name: { contains: filters.Name } });
    if (filters?.Status)
      andConditions.push({ status: { equals: filters.Status } });
    if (filters?.CategoryId)
      andConditions.push({ categoryId: { equals: filters.CategoryId } });
    if (filters?.SupplierId)
      andConditions.push({ supplierId: { equals: filters.SupplierId } });

    const where = andConditions.length > 0 ? { AND: andConditions } : undefined;

    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
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
      this.prisma.product.count({ where }),
    ]);

    return buildPaginatedResult(items, total, page, limit);
  }

  async movements(
    query: PaginationQueryDto,
    keyword?: string,
    filters?: Record<string, string>,
  ) {
    const { page, limit, skip } = normalizePagination(query);
    const enumKeyword = keyword?.toUpperCase();
    const isStockTypeKeyword =
      enumKeyword === StockMovementType.IMPORT ||
      enumKeyword === StockMovementType.EXPORT ||
      enumKeyword === StockMovementType.ADJUST;

    const andConditions: Record<string, unknown>[] = [];

    if (keyword) {
      andConditions.push({
        OR: [
          { note: { contains: keyword } },
          ...(isStockTypeKeyword
            ? [{ type: { equals: enumKeyword as StockMovementType } }]
            : []),
          {
            product: {
              is: {
                OR: [
                  { name: { contains: keyword } },
                  { sku: { contains: keyword } },
                ],
              },
            },
          },
        ],
      });
    }

    if (filters?.Id) andConditions.push({ id: { equals: filters.Id } });
    if (filters?.ProductId)
      andConditions.push({ productId: { equals: filters.ProductId } });
    if (filters?.Type) {
      const type = filters.Type.toUpperCase();
      if (
        type === StockMovementType.IMPORT ||
        type === StockMovementType.EXPORT ||
        type === StockMovementType.ADJUST
      ) {
        andConditions.push({ type: { equals: type as StockMovementType } });
      }
    }
    if (filters?.CreatedById)
      andConditions.push({ createdById: { equals: filters.CreatedById } });
    if (filters?.PurchaseOrderId)
      andConditions.push({ purchaseOrderId: { equals: filters.PurchaseOrderId } });
    if (filters?.SalesOrderId)
      andConditions.push({ salesOrderId: { equals: filters.SalesOrderId } });
    if (filters?.Note) andConditions.push({ note: { contains: filters.Note } });
    if (filters?.ProductName || filters?.ProductSku) {
      andConditions.push({
        product: {
          is: {
            ...(filters.ProductName
              ? { name: { contains: filters.ProductName } }
              : {}),
            ...(filters.ProductSku ? { sku: { contains: filters.ProductSku } } : {}),
          },
        },
      });
    }

    const where = andConditions.length > 0 ? { AND: andConditions } : undefined;

    const [items, total] = await Promise.all([
      this.prisma.stockMovement.findMany({
        where,
        include: {
          product: {
            select: { id: true, sku: true, name: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.stockMovement.count({ where }),
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
