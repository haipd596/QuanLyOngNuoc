import { Injectable } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { PrismaService } from '../../config/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async dashboard() {
    const [totalProducts, totalCustomers, totalUsers, totalSuppliers, totalOrders] =
      await Promise.all([
        this.prisma.product.count(),
        this.prisma.customer.count(),
        this.prisma.user.count(),
        this.prisma.supplier.count(),
        this.prisma.salesOrder.count(),
      ]);

    const lowStock = await this.prisma.$queryRaw<
      Array<{ count: bigint }>
    >`SELECT COUNT(*) as count FROM Product WHERE stockQuantity <= minStockLevel`;

    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const end = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const todayRevenue = await this.prisma.salesOrder.aggregate({
      _sum: { finalAmount: true },
      where: {
        createdAt: { gte: start, lt: end },
        orderStatus: { not: OrderStatus.CANCELED },
      },
    });

    return {
      totalProducts,
      totalCustomers,
      totalUsers,
      totalSuppliers,
      totalOrders,
      lowStockProducts: Number(lowStock[0]?.count ?? 0),
      todayRevenue: Number(todayRevenue._sum.finalAmount ?? 0),
    };
  }

  async inventoryAudit() {
    const lowStock = await this.prisma.$queryRaw<
      Array<{ id: string; sku: string; name: string; stockQuantity: number; minStockLevel: number }>
    >`SELECT id, sku, name, stockQuantity, minStockLevel FROM Product WHERE stockQuantity <= minStockLevel ORDER BY stockQuantity ASC`;

    const movements = await this.prisma.stockMovement.groupBy({
      by: ['productId'],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 10,
    });

    const productIds = movements.map((m) => m.productId);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, sku: true, name: true },
    });
    const productMap = new Map(products.map((p) => [p.id, p]));

    return {
      lowStock,
      topMovedProducts: movements.map((m) => ({
        productId: m.productId,
        sku: productMap.get(m.productId)?.sku ?? '',
        name: productMap.get(m.productId)?.name ?? '',
        movedQuantity: Number(m._sum.quantity ?? 0),
      })),
    };
  }

  async salesOverview(from?: string, to?: string) {
    const now = new Date();
    const start = from ? new Date(from) : new Date(now.getFullYear(), now.getMonth(), 1);
    const end = to ? new Date(to) : new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const [aggregate, byStatus] = await Promise.all([
      this.prisma.salesOrder.aggregate({
        _count: { id: true },
        _sum: { finalAmount: true, discountAmount: true },
        where: {
          createdAt: { gte: start, lt: end },
          orderStatus: { not: OrderStatus.CANCELED },
        },
      }),
      this.prisma.salesOrder.groupBy({
        by: ['orderStatus'],
        _count: { id: true },
        where: {
          createdAt: { gte: start, lt: end },
        },
      }),
    ]);

    return {
      from: start,
      to: end,
      totalOrders: aggregate._count.id,
      totalRevenue: Number(aggregate._sum.finalAmount ?? 0),
      totalDiscount: Number(aggregate._sum.discountAmount ?? 0),
      statusBreakdown: byStatus.map((s) => ({
        orderStatus: s.orderStatus,
        count: s._count.id,
      })),
    };
  }
}

