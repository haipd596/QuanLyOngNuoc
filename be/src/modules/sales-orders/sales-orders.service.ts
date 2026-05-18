import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CheckoutType,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  Prisma,
  ShippingMethod,
  StockMovementType,
} from '@prisma/client';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import {
  buildPaginatedResult,
  normalizePagination,
} from '../../common/utils/pagination.util';
import { PrismaService } from '../../config/prisma.service';
import { MailService } from '../mail/mail.service';
import { CreateSalesOrderDto } from './dto/create-sales-order.dto';
import { GuestCheckoutDto } from './dto/guest-checkout.dto';
import { MyCheckoutDto } from './dto/my-checkout.dto';
import { UpdateSalesOrderStatusDto } from './dto/update-sales-order-status.dto';

@Injectable()
export class SalesOrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  async create(dto: CreateSalesOrderDto) {
    const { normalizedItems, totalAmount } = await this.buildNormalizedItems(dto.items);

    const discountAmount = dto.discountAmount ?? 0;
    const finalAmount = Math.max(totalAmount - discountAmount, 0);
    const orderCode = this.generateOrderCode();

    const order = await this.prisma.$transaction(async (tx) => {
      const created = await tx.salesOrder.create({
        data: {
          orderCode,
          checkoutType: CheckoutType.USER,
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
        await this.decrementStockOrThrow(tx, item.productId, item.quantity);
        await tx.stockMovement.create({
          data: {
            productId: item.productId,
            type: StockMovementType.EXPORT,
            quantity: item.quantity,
            salesOrderId: created.id,
            createdById: dto.staffId,
            note: `Export for ${created.orderCode}`,
          },
        });
      }

      return created;
    });

    try {
      await this.sendOrderMailHooks(order.id);
    } catch {
      // mail hook best-effort
    }

    return order;
  }

  async createGuest(dto: GuestCheckoutDto) {
    const { normalizedItems, totalAmount } = await this.buildNormalizedItems(dto.items);

    const discountAmount = dto.discountAmount ?? 0;
    const shippingFee = dto.shippingFee ?? 0;
    const finalAmount = Math.max(totalAmount - discountAmount + shippingFee, 0);
    const orderCode = this.generateOrderCode();

    const order = await this.prisma.$transaction(async (tx) => {
      const created = await tx.salesOrder.create({
        data: {
          orderCode,
          checkoutType: CheckoutType.GUEST,
          guestName: dto.guestName.trim(),
          guestPhone: dto.guestPhone.trim(),
          guestEmail: dto.guestEmail?.trim() || null,
          guestAddress: dto.guestAddress?.trim() || null,
          totalAmount,
          discountAmount,
          shippingFee,
          finalAmount,
          shippingMethod: dto.shippingMethod ?? 'STANDARD',
          paymentMethod: dto.paymentMethod,
          paymentStatus: PaymentStatus.UNPAID,
          orderStatus: OrderStatus.PENDING,
          note: dto.note,
          items: {
            create: normalizedItems,
          },
        },
        include: {
          items: true,
        },
      });

      for (const item of normalizedItems) {
        await this.decrementStockOrThrow(tx, item.productId, item.quantity);
        await tx.stockMovement.create({
          data: {
            productId: item.productId,
            type: StockMovementType.EXPORT,
            quantity: item.quantity,
            salesOrderId: created.id,
            note: `Export for ${created.orderCode} (guest checkout)`,
          },
        });
      }

      return created;
    });

    try {
      await this.sendOrderMailHooks(order.id);
    } catch {
      // mail hook best-effort
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
          { guestName: { contains: keyword } },
          { guestPhone: { contains: keyword } },
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
      throw new NotFoundException('Khong tim thay don ban hang');
    }
    return order;
  }

  async updateStatus(id: string, dto: UpdateSalesOrderStatusDto) {
    const order = await this.findOne(id);
    this.ensureOrderStatusTransition(order.orderStatus, dto.orderStatus);
    return this.prisma.salesOrder.update({
      where: { id },
      data: { orderStatus: dto.orderStatus },
    });
  }

  async createMyOrder(userId: string, dto: MyCheckoutDto) {
    if (!userId) {
      throw new UnauthorizedException('Khong tim thay nguoi dung');
    }

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('Khong tim thay nguoi dung');
    }

    const customer = await this.findOrCreateCustomerForUser(dto, user.fullName, user.email ?? null);
    const { normalizedItems, totalAmount } = await this.buildNormalizedItems(dto.items);
    const discountAmount = dto.discountAmount ?? 0;
    const shippingFee = dto.shippingFee ?? 0;
    const finalAmount = Math.max(totalAmount - discountAmount + shippingFee, 0);
    const orderCode = this.generateOrderCode();

    return this.prisma.$transaction(async (tx) => {
      const created = await tx.salesOrder.create({
        data: {
          orderCode,
          checkoutType: CheckoutType.USER,
          customerId: customer.id,
          totalAmount,
          discountAmount,
          shippingFee,
          finalAmount,
          shippingMethod: this.mapShippingMethod(dto.shippingMethod),
          paymentMethod: this.mapPaymentMethod(dto.paymentMethod),
          paymentStatus: PaymentStatus.UNPAID,
          orderStatus: OrderStatus.PENDING,
          note: dto.note,
          items: { create: normalizedItems },
        },
        include: { items: true, customer: true },
      });

      for (const item of normalizedItems) {
        await this.decrementStockOrThrow(tx, item.productId, item.quantity);
        await tx.stockMovement.create({
          data: {
            productId: item.productId,
            type: StockMovementType.EXPORT,
            quantity: item.quantity,
            salesOrderId: created.id,
            note: `Export for ${created.orderCode} (user checkout)`,
          },
        });
      }

      return created;
    });
  }

  async findMyOrders(userId: string, query: PaginationQueryDto) {
    const customer = await this.getCustomerByUser(userId);
    const { page, limit, skip } = normalizePagination(query);
    const where = { customerId: customer.id };

    const [items, total] = await Promise.all([
      this.prisma.salesOrder.findMany({
        where,
        include: { items: { include: { product: true } }, customer: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.salesOrder.count({ where }),
    ]);

    return buildPaginatedResult(items, total, page, limit);
  }

  async findMyOrderById(userId: string, id: string) {
    const customer = await this.getCustomerByUser(userId);
    const order = await this.prisma.salesOrder.findFirst({
      where: { id, customerId: customer.id },
      include: { items: { include: { product: true } }, customer: true },
    });
    if (!order) {
      throw new NotFoundException('Khong tim thay don hang');
    }
    return order;
  }

  async cancelMyOrder(userId: string, id: string) {
    const order = await this.findMyOrderById(userId, id);
    if (!(order.orderStatus === OrderStatus.PENDING || order.orderStatus === OrderStatus.CONFIRMED)) {
      throw new BadRequestException('Khong the huy don hang o trang thai hien tai');
    }
    return this.cancel(order.id);
  }

  async cancel(id: string) {
    const order = await this.findOne(id);
    if (order.orderStatus === OrderStatus.CANCELED) {
      throw new BadRequestException('Don hang da bi huy');
    }
    if (order.orderStatus === OrderStatus.COMPLETED) {
      throw new BadRequestException('Khong the huy don hang da hoan tat');
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

  async trackByGuest(orderCode: string, phone: string) {
    const normalizedOrderCode = orderCode.trim();
    const normalizedPhone = phone.trim();

    const order = await this.prisma.salesOrder.findFirst({
      where: {
        orderCode: normalizedOrderCode,
        OR: [
          { guestPhone: normalizedPhone },
          {
            customer: {
              is: {
                phone: normalizedPhone,
              },
            },
          },
        ],
      },
      include: {
        customer: true,
        items: { include: { product: true } },
      },
    });

    if (!order) {
      throw new NotFoundException('Khong tim thay don hang phu hop');
    }

    return order;
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

    const orderEmail = order.customer?.email?.trim() || order.guestEmail?.trim() || null;
    if (orderEmail) {
      await this.mailService.sendBusinessMailSafe({
        to: orderEmail,
        subject: `[${order.orderCode}] Xac nhan don hang`,
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

  private ensureOrderStatusTransition(current: OrderStatus, next: OrderStatus) {
    if (current === next) {
      return;
    }
    const map: Record<OrderStatus, OrderStatus[]> = {
      PENDING: [OrderStatus.CONFIRMED, OrderStatus.CANCELED],
      CONFIRMED: [OrderStatus.PACKING, OrderStatus.CANCELED],
      PACKING: [OrderStatus.SHIPPED],
      SHIPPED: [OrderStatus.COMPLETED],
      COMPLETED: [],
      CANCELED: [],
    };
    if (!map[current].includes(next)) {
      throw new BadRequestException(`Khong the chuyen trang thai tu ${current} sang ${next}`);
    }
  }

  private async getCustomerByUser(userId: string) {
    if (!userId) {
      throw new UnauthorizedException('Khong tim thay nguoi dung');
    }
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('Khong tim thay nguoi dung');
    }
    const customer = await this.prisma.customer.findFirst({
      where: {
        OR: [
          ...(user.phone ? [{ phone: user.phone }] : []),
          ...(user.email ? [{ email: user.email }] : []),
        ],
      },
    });
    if (!customer) {
      throw new NotFoundException('Khong tim thay ho so khach hang');
    }
    return customer;
  }

  private async findOrCreateCustomerForUser(dto: MyCheckoutDto, fallbackName: string, fallbackEmail: string | null) {
    const phone = dto.phone.trim();
    const email = dto.email?.trim() || fallbackEmail || null;
    const fullName = dto.fullName.trim() || fallbackName;
    const address = dto.address.trim();
    const note = dto.note?.trim() || null;

    const existing = await this.prisma.customer.findFirst({
      where: {
        OR: [
          { phone },
          ...(email ? [{ email }] : []),
        ],
      },
    });

    if (existing) {
      return this.prisma.customer.update({
        where: { id: existing.id },
        data: { fullName, phone, email, address, note },
      });
    }

    return this.prisma.customer.create({
      data: { fullName, phone, email, address, note },
    });
  }

  private mapShippingMethod(input?: string): ShippingMethod {
    if (!input) return ShippingMethod.STANDARD;
    return input.toUpperCase() === ShippingMethod.EXPRESS ? ShippingMethod.EXPRESS : ShippingMethod.STANDARD;
  }

  private mapPaymentMethod(input?: string): PaymentMethod {
    const normalized = (input || '').toUpperCase();
    if (normalized === 'BANK' || normalized === 'BANK_TRANSFER') return PaymentMethod.BANK_TRANSFER;
    if (normalized === 'WALLET' || normalized === 'MOMO') return PaymentMethod.MOMO;
    if (normalized === 'ZALOPAY') return PaymentMethod.ZALOPAY;
    return PaymentMethod.COD;
  }

  private async buildNormalizedItems(
    items: Array<{ productId: string; quantity: number; unitPrice?: number }>,
  ) {
    const mergedItems = Array.from(
      items
        .reduce((map, item) => {
          const current = map.get(item.productId);
          if (!current) {
            map.set(item.productId, { ...item });
            return map;
          }
          current.quantity += item.quantity;
          if (current.unitPrice === undefined) {
            current.unitPrice = item.unitPrice;
          }
          return map;
        }, new Map<string, { productId: string; quantity: number; unitPrice?: number }>())
        .values(),
    );
    const productIds = mergedItems.map((item) => item.productId);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, sku: true, stockQuantity: true, salePrice: true },
    });

    if (products.length !== productIds.length) {
      throw new BadRequestException('Một số sản phẩm không tồn tại');
    }

    const productMap = new Map(products.map((p) => [p.id, p]));
    let totalAmount = 0;

    const normalizedItems = mergedItems.map((item) => {
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

    return {
      normalizedItems,
      totalAmount,
    };
  }

  private generateOrderCode() {
    const random = Math.random().toString(36).slice(2, 7).toUpperCase();
    return `SO-${Date.now()}-${random}`;
  }

  private async decrementStockOrThrow(
    tx: Prisma.TransactionClient,
    productId: string,
    quantity: number,
  ) {
    const result = await tx.product.updateMany({
      where: {
        id: productId,
        stockQuantity: { gte: quantity },
      },
      data: {
        stockQuantity: { decrement: quantity },
      },
    });

    if (result.count !== 1) {
      throw new BadRequestException('Tồn kho không đủ, vui lòng kiểm tra lại đơn hàng');
    }
  }
}
