import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderStatus, PaymentStatus, StockMovementType } from '@prisma/client';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import {
  buildPaginatedResult,
  normalizePagination,
} from '../../common/utils/pagination.util';
import { PrismaService } from '../../config/prisma.service';
import { CreateSalesOrderDto } from './dto/create-sales-order.dto';
import { UpdateSalesOrderStatusDto } from './dto/update-sales-order-status.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class SalesOrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

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

    const order = await this.prisma.$transaction(async (tx) => {
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
        include: {
          items: true,
          customer: true,
        },
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

    try {
      await this.sendOrderMailHooks(order.id);
    } catch {
      // Mail hook là best-effort, không làm fail request tạo đơn.
    }
    return order;
  }

  async findAll(
    query: PaginationQueryDto,
    keyword?: string,
    filters?: Record<string, string>,
  ) {
    const { page, limit, skip } = normalizePagination(query);
    const andConditions: Record<string, unknown>[] = [];

    if (keyword) {
      andConditions.push({
        OR: [
          { orderCode: { contains: keyword } },
          { note: { contains: keyword } },
          {
            customer: {
              is: {
                fullName: { contains: keyword },
              },
            },
          },
          {
            staff: {
              is: {
                fullName: { contains: keyword },
              },
            },
          },
        ],
      });
    }

    if (filters?.Id) andConditions.push({ id: { equals: filters.Id } });
    if (filters?.OrderCode)
      andConditions.push({ orderCode: { contains: filters.OrderCode } });
    if (filters?.CustomerId)
      andConditions.push({ customerId: { equals: filters.CustomerId } });
    if (filters?.StaffId) andConditions.push({ staffId: { equals: filters.StaffId } });
    if (filters?.PaymentStatus)
      andConditions.push({ paymentStatus: { equals: filters.PaymentStatus } });
    if (filters?.OrderStatus)
      andConditions.push({ orderStatus: { equals: filters.OrderStatus } });
    if (filters?.Note) andConditions.push({ note: { contains: filters.Note } });
    if (filters?.CustomerName) {
      andConditions.push({
        customer: {
          is: { fullName: { contains: filters.CustomerName } },
        },
      });
    }
    if (filters?.StaffName) {
      andConditions.push({
        staff: {
          is: { fullName: { contains: filters.StaffName } },
        },
      });
    }

    const where = andConditions.length > 0 ? { AND: andConditions } : undefined;

    const [items, total] = await Promise.all([
      this.prisma.salesOrder.findMany({
        where,
        include: {
          customer: true,
          staff: { select: { id: true, fullName: true, email: true } },
          items: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.salesOrder.count({ where }),
    ]);

    return buildPaginatedResult(items, total, page, limit);
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

  private async sendOrderMailHooks(orderId: string) {
    const order = await this.prisma.salesOrder.findUnique({
      where: { id: orderId },
      include: {
        customer: true,
        items: {
          include: {
            product: {
              select: {
                name: true,
                sku: true,
                stockQuantity: true,
                minStockLevel: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      return;
    }

    if (order.customer?.email) {
      await this.mailService.sendBusinessMailSafe({
        to: order.customer.email,
        subject: `[${order.orderCode}] Xác nhận đơn hàng`,
        content: `Don hang ${order.orderCode} da duoc tao thanh cong. Tong thanh toan: ${order.finalAmount}.`,
      });
    }

    const lowStockLines = order.items
      .filter((item) => item.product.stockQuantity <= item.product.minStockLevel)
      .map(
        (item) =>
          `- ${item.product.name} (${item.product.sku}): con ${item.product.stockQuantity}, nguong ${item.product.minStockLevel}`,
      );

    if (lowStockLines.length === 0) {
      return;
    }

    const adminUsers = await this.prisma.user.findMany({
      where: {
        role: {
          is: {
            name: 'ADMIN',
          },
        },
      },
      select: {
        email: true,
      },
    });

    const adminEmails = adminUsers
      .map((user) => user.email?.trim())
      .filter((email): email is string => Boolean(email));

    await Promise.all(
      adminEmails.map((email) =>
        this.mailService.sendBusinessMailSafe({
          to: email,
          subject: '[Canh bao ton kho] San pham duoi nguong',
          content: `He thong ghi nhan san pham ton thap sau don ${order.orderCode}:\n${lowStockLines.join('\n')}`,
        }),
      ),
    );
  }
}
