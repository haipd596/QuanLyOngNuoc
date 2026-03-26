import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import {
  buildPaginatedResult,
  normalizePagination,
} from '../../common/utils/pagination.util';
import { PrismaService } from '../../config/prisma.service';

@Injectable()
export class AiService {
  constructor(private readonly prisma: PrismaService) {}

  async recalculate(targetDays?: number) {
    const defaultTargetDays = Number(process.env.AI_TARGET_DAYS ?? 14);
    const normalizedTargetDays =
      Number.isFinite(targetDays) && Number(targetDays) > 0
        ? Number(targetDays)
        : defaultTargetDays;
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const [products, salesGroups] = await Promise.all([
      this.prisma.product.findMany({
        select: {
          id: true,
          stockQuantity: true,
          minStockLevel: true,
        },
      }),
      this.prisma.salesOrderItem.groupBy({
        by: ['productId'],
        _sum: {
          quantity: true,
        },
        where: {
          salesOrder: {
            createdAt: {
              gte: since,
            },
          },
        },
      }),
    ]);

    const salesMap = new Map(
      salesGroups.map((item) => [item.productId, item._sum.quantity ?? 0]),
    );

    const recommendations = products.map((product) => {
      const totalQtyLast30Days = salesMap.get(product.id) ?? 0;
      const averageDailySales = totalQtyLast30Days / 30;
      const recommendedQuantity = Math.max(
        0,
        Math.ceil(normalizedTargetDays * averageDailySales - product.stockQuantity),
      );

      let riskLevel = 'LOW';
      if (product.stockQuantity <= product.minStockLevel) {
        riskLevel = 'HIGH';
      } else if (recommendedQuantity > 0) {
        riskLevel = 'MEDIUM';
      }

      return {
        productId: product.id,
        currentStock: product.stockQuantity,
        averageDailySales,
        recommendedQuantity,
        riskLevel,
        note: `targetDays=${normalizedTargetDays}`,
      };
    });

    await this.prisma.$transaction(async (tx) => {
      await tx.aIStockRecommendation.deleteMany({});
      if (recommendations.length > 0) {
        await tx.aIStockRecommendation.createMany({
          data: recommendations,
        });
      }
    });

    return {
      recalculatedCount: recommendations.length,
      targetDays: normalizedTargetDays,
      generatedAt: new Date(),
    };
  }

  async findRestockRecommendations(
    query: PaginationQueryDto,
    keyword?: string,
    filters?: Record<string, string>,
  ) {
    const { page, limit, skip } = normalizePagination(query);
    const andConditions: Record<string, unknown>[] = [];

    if (keyword) {
      andConditions.push({
        OR: [
          {
            product: {
              is: {
                name: { contains: keyword },
              },
            },
          },
          {
            product: {
              is: {
                sku: { contains: keyword },
              },
            },
          },
          { riskLevel: { contains: keyword } },
        ],
      });
    }

    if (filters?.Id) andConditions.push({ id: { equals: filters.Id } });
    if (filters?.ProductId)
      andConditions.push({ productId: { equals: filters.ProductId } });
    if (filters?.RiskLevel)
      andConditions.push({ riskLevel: { equals: filters.RiskLevel } });
    if (filters?.ProductName) {
      andConditions.push({
        product: {
          is: {
            name: { contains: filters.ProductName },
          },
        },
      });
    }
    if (filters?.ProductSku) {
      andConditions.push({
        product: {
          is: {
            sku: { contains: filters.ProductSku },
          },
        },
      });
    }

    const where = andConditions.length > 0 ? { AND: andConditions } : undefined;

    const [items, total] = await Promise.all([
      this.prisma.aIStockRecommendation.findMany({
        where,
        include: {
          product: {
            select: {
              id: true,
              sku: true,
              name: true,
              stockQuantity: true,
              minStockLevel: true,
            },
          },
        },
        orderBy: [{ riskLevel: 'desc' }, { recommendedQuantity: 'desc' }],
        skip,
        take: limit,
      }),
      this.prisma.aIStockRecommendation.count({ where }),
    ]);

    return buildPaginatedResult(items, total, page, limit);
  }
}

