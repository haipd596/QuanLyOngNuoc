import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderStatus, PaymentStatus, StockMovementType } from '@prisma/client';
import { PrismaService } from '../../config/prisma.service';
import { CreateSalesOrderDto } from './dto/create-sales-order.dto';
import { UpdateSalesOrderStatusDto } from './dto/update-sales-order-status.dto';

@Injectable()
export class SalesOrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSalesOrderDto) {
    const productIds = dto.items.map((item) => item.productId);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, sku: true, stockQuantity: true, salePrice: true },
    });

    if (products.length !== productIds.length) {
      throw new BadRequestException('Một số sản phẩm không tồn tại');
    }

    const productMap = new Map(products.map((p) => [p.id, p]));
    let totalAmount = 0;

    const normalizedItems = dto.items.map((item) => {
      const product = productMap.get(item.productId);
      if (!product) {
        throw new BadRequestException(`Không tìm thấy sản phẩm: ${item.productId}`);
      }
      if (product.stockQuantity < item.quantity) {
        throw new BadRequestException(`Tồn kho không đủ cho mã SKU ${product.sku}`);
      }
      const unitPrice = item.unitPrice ?? Number(product.salePrice);
      const subtotal = unitPrice * item.quantity;
      totalAmount += subtotal;
      return {
        productId: item.productId,
        quantity: item.quantity,
        unitPrice,
        subtotal,
      };
    });

    const discountAmount = dto.discountAmount ?? 0;
    const finalAmount = Math.max(totalAmount - discountAmount, 0);
    const orderCode = `SO-${Date.now()}`;

    return this.prisma.$transaction(async (tx) => {
      const order = await tx.salesOrder.create({
        data: {
          orderCode,
          customerId: dto.customerId,
          staffId: dto.staffId,
          totalAmount,
          discountAmount,
          finalAmount,
          paymentStatus: PaymentStatus.UNPAID,
          orderStatus: OrderStatus.PENDING,
          note: dto.note,
          items: {
            create: normalizedItems,
          },
        },
        include: { items: true },
      });

      for (const item of normalizedItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stockQuantity: { decrement: item.quantity },
          },
        });
        await tx.stockMovement.create({
          data: {
            productId: item.productId,
            type: StockMovementType.EXPORT,
            quantity: item.quantity,
            salesOrderId: order.id,
            createdById: dto.staffId,
            note: `Export for ${order.orderCode}`,
          },
        });
      }

      return order;
    });
  }

  findAll() {
    return this.prisma.salesOrder.findMany({
      include: {
        customer: true,
        staff: { select: { id: true, fullName: true, email: true } },
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const order = await this.prisma.salesOrder.findUnique({
      where: { id },
      include: {
        customer: true,
        staff: { select: { id: true, fullName: true, email: true } },
        items: { include: { product: true } },
      },
    });
    if (!order) {
      throw new NotFoundException('Không tìm thấy đơn bán hàng');
    }
    return order;
  }

  async updateStatus(id: string, dto: UpdateSalesOrderStatusDto) {
    await this.findOne(id);
    return this.prisma.salesOrder.update({
      where: { id },
      data: { orderStatus: dto.orderStatus },
    });
  }

  async cancel(id: string) {
    const order = await this.findOne(id);
    if (order.orderStatus === OrderStatus.CANCELED) {
      throw new BadRequestException('Đơn hàng đã bị hủy');
    }
    if (order.orderStatus === OrderStatus.COMPLETED) {
      throw new BadRequestException('Không thể hủy đơn hàng đã hoàn tất');
    }

    return this.prisma.$transaction(async (tx) => {
      for (const item of order.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stockQuantity: { increment: item.quantity },
          },
        });
        await tx.stockMovement.create({
          data: {
            productId: item.productId,
            type: StockMovementType.IMPORT,
            quantity: item.quantity,
            salesOrderId: order.id,
            createdById: order.staffId ?? undefined,
            note: `Rollback canceled ${order.orderCode}`,
          },
        });
      }

      return tx.salesOrder.update({
        where: { id: order.id },
        data: { orderStatus: OrderStatus.CANCELED },
      });
    });
  }
}
