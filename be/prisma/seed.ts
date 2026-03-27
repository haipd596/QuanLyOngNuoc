import {
  AuditAction,
  NotificationType,
  OrderStatus,
  PaymentStatus,
  PrismaClient,
  StockMovementType,
  UserStatus,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const ROLE_ADMIN = 'ADMIN';
const ROLE_SELLER = 'SELLER';
const ROLE_CUSTOMER = 'CUSTOMER';
const daysAgo = (day: number) => {
  const date = new Date();
  date.setDate(date.getDate() - day);
  return date;
};

async function clearDatabase() {
  await prisma.auditLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.emailLog.deleteMany();
  await prisma.aIStockRecommendation.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.salesOrderItem.deleteMany();
  await prisma.purchaseOrderItem.deleteMany();
  await prisma.stockMovement.deleteMany();
  await prisma.salesOrder.deleteMany();
  await prisma.purchaseOrder.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.supplier.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();
}

async function main() {
  await clearDatabase();

  const [adminRole, sellerRole, customerRole] = await Promise.all([
    prisma.role.create({
      data: {
        name: ROLE_ADMIN,
        description: 'Quản trị toàn hệ thống',
      },
    }),
    prisma.role.create({
      data: {
        name: ROLE_SELLER,
        description: 'Nguoi ban thao tac ban hang va kho',
      },
    }),
    prisma.role.create({
      data: {
        name: ROLE_CUSTOMER,
        description: 'Khach hang co tai khoan giao dich',
      },
    }),
  ]);

  const adminPassword = await bcrypt.hash('Admin@123', 10);
  const userPassword = await bcrypt.hash('User@123', 10);

  const adminUser = await prisma.user.create({
    data: {
      fullName: 'Nguyễn Quản Trị',
      email: 'admin@ongnuocviet.vn',
      passwordHash: adminPassword,
      phone: '0901000001',
      status: UserStatus.ACTIVE,
      roleId: adminRole.id,
      avatarUrl: 'https://i.pravatar.cc/300?img=12',
    },
  });

  const staffUsers = await prisma.user.createMany({
    data: [
      {
        fullName: 'Trần Bán Hàng',
        email: 'user@ongnuocviet.vn',
        passwordHash: userPassword,
        phone: '0901000002',
        status: UserStatus.ACTIVE,
        roleId: sellerRole.id,
        avatarUrl: 'https://i.pravatar.cc/300?img=17',
      },
      {
        fullName: 'Lê Thủ Kho',
        email: 'kho@ongnuocviet.vn',
        passwordHash: userPassword,
        phone: '0901000003',
        status: UserStatus.ACTIVE,
        roleId: sellerRole.id,
        avatarUrl: 'https://i.pravatar.cc/300?img=26',
      },
      {
        fullName: 'Pham Khach Hang',
        email: 'khach@ongnuocviet.vn',
        passwordHash: userPassword,
        phone: '0901000004',
        status: UserStatus.ACTIVE,
        roleId: customerRole.id,
        avatarUrl: 'https://i.pravatar.cc/300?img=32',
      },
    ],
  });

  const userAccount = await prisma.user.findUniqueOrThrow({
    where: { email: 'user@ongnuocviet.vn' },
  });
  const warehouseStaff = await prisma.user.findUniqueOrThrow({
    where: { email: 'kho@ongnuocviet.vn' },
  });

  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Ống nước',
        slug: 'ong-nuoc',
        description: 'Ống và phụ kiện dẫn nước',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Thiết bị điện',
        slug: 'thiet-bi-dien',
        description: 'CB, dây điện, thiết bị đóng cắt',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Phụ kiện lắp đặt',
        slug: 'phu-kien-lap-dat',
        description: 'Co nối, van khóa, băng tan, keo',
      },
    }),
  ]);

  const suppliers = await Promise.all([
    prisma.supplier.create({
      data: {
        name: 'Công ty Nhựa Miền Nam',
        phone: '02838118888',
        email: 'kinhdoanh@nhuamiennam.vn',
        address: 'KCN Tân Bình, TP.HCM',
        taxCode: '0312345678',
      },
    }),
    prisma.supplier.create({
      data: {
        name: 'Điện Gia Dụng Việt',
        phone: '02838229999',
        email: 'sale@diengiadungviet.vn',
        address: 'Quận 12, TP.HCM',
        taxCode: '0313456789',
      },
    }),
  ]);

  const products = await Promise.all([
    prisma.product.create({
      data: {
        sku: 'ONV-PVC-001',
        name: 'Ống PVC Bình Minh phi 21',
        slug: 'ong-pvc-binh-minh-phi-21',
        unit: 'Cây',
        importPrice: 42000,
        salePrice: 55000,
        stockQuantity: 150,
        minStockLevel: 30,
        categoryId: categories[0].id,
        supplierId: suppliers[0].id,
        description: 'Ống nhựa PVC dùng cho hệ thống cấp nước sinh hoạt',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'ONV-PVC-002',
        name: 'Ống PVC Bình Minh phi 27',
        slug: 'ong-pvc-binh-minh-phi-27',
        unit: 'Cây',
        importPrice: 56000,
        salePrice: 70000,
        stockQuantity: 95,
        minStockLevel: 25,
        categoryId: categories[0].id,
        supplierId: suppliers[0].id,
      },
    }),
    prisma.product.create({
      data: {
        sku: 'ONV-VAN-001',
        name: 'Van khóa nước tay gạt phi 21',
        slug: 'van-khoa-nuoc-tay-gat-phi-21',
        unit: 'Cái',
        importPrice: 35000,
        salePrice: 49000,
        stockQuantity: 40,
        minStockLevel: 20,
        categoryId: categories[2].id,
        supplierId: suppliers[0].id,
      },
    }),
    prisma.product.create({
      data: {
        sku: 'ONV-CB-001',
        name: 'CB Panasonic 1P 20A',
        slug: 'cb-panasonic-1p-20a',
        unit: 'Cái',
        importPrice: 88000,
        salePrice: 120000,
        stockQuantity: 60,
        minStockLevel: 15,
        categoryId: categories[1].id,
        supplierId: suppliers[1].id,
      },
    }),
    prisma.product.create({
      data: {
        sku: 'ONV-WIRE-001',
        name: 'Dây điện CADIVI 2.5mm',
        slug: 'day-dien-cadivi-2-5mm',
        unit: 'Cuộn',
        importPrice: 950000,
        salePrice: 1120000,
        stockQuantity: 18,
        minStockLevel: 20,
        categoryId: categories[1].id,
        supplierId: suppliers[1].id,
      },
    }),
  ]);

  await prisma.productImage.createMany({
    data: [
      {
        productId: products[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1581092919535-7146ff1a590d',
        isMain: true,
      },
      {
        productId: products[3].id,
        imageUrl: 'https://images.unsplash.com/photo-1621905252472-943afaa20e16',
        isMain: true,
      },
      {
        productId: products[4].id,
        imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952',
        isMain: true,
      },
    ],
  });

  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        fullName: 'Phạm Văn A',
        phone: '0911000001',
        email: 'phamvana@gmail.com',
        address: 'Gò Vấp, TP.HCM',
        note: 'Khách mua lẻ thường xuyên',
      },
    }),
    prisma.customer.create({
      data: {
        fullName: 'Công ty Xây Dựng Minh Tâm',
        phone: '0911000002',
        email: 'vat-tu@minhtam.vn',
        address: 'Thủ Đức, TP.HCM',
        note: 'Khách công trình',
      },
    }),
    prisma.customer.create({
      data: {
        fullName: 'Lê Thị B',
        phone: '0911000003',
        email: 'lethib@gmail.com',
        address: 'Bình Thạnh, TP.HCM',
      },
    }),
  ]);

  const purchaseOrder = await prisma.purchaseOrder.create({
    data: {
      orderCode: 'PO-20260325-001',
      supplierId: suppliers[0].id,
      createdById: adminUser.id,
      totalAmount: 14280000,
      status: OrderStatus.CONFIRMED,
      note: 'Nhập hàng đầu kỳ cho quý 2',
    },
  });

  await prisma.purchaseOrderItem.createMany({
    data: [
      {
        purchaseOrderId: purchaseOrder.id,
        productId: products[0].id,
        quantity: 120,
        importPrice: 42000,
        subtotal: 5040000,
      },
      {
        purchaseOrderId: purchaseOrder.id,
        productId: products[1].id,
        quantity: 90,
        importPrice: 56000,
        subtotal: 5040000,
      },
      {
        purchaseOrderId: purchaseOrder.id,
        productId: products[2].id,
        quantity: 120,
        importPrice: 35000,
        subtotal: 4200000,
      },
    ],
  });

  const salesOrder1 = await prisma.salesOrder.create({
    data: {
      orderCode: 'SO-20260325-001',
      customerId: customers[0].id,
      staffId: userAccount.id,
      totalAmount: 262000,
      discountAmount: 12000,
      finalAmount: 250000,
      paymentStatus: PaymentStatus.PAID,
      orderStatus: OrderStatus.COMPLETED,
      note: 'Bán tại quầy',
    },
  });

  const salesOrder2 = await prisma.salesOrder.create({
    data: {
      orderCode: 'SO-20260325-002',
      customerId: customers[1].id,
      staffId: warehouseStaff.id,
      totalAmount: 1680000,
      discountAmount: 80000,
      finalAmount: 1600000,
      paymentStatus: PaymentStatus.PARTIAL,
      orderStatus: OrderStatus.CONFIRMED,
      note: 'Đơn giao công trình',
    },
  });

  await prisma.salesOrderItem.createMany({
    data: [
      {
        salesOrderId: salesOrder1.id,
        productId: products[0].id,
        quantity: 2,
        unitPrice: 55000,
        subtotal: 110000,
      },
      {
        salesOrderId: salesOrder1.id,
        productId: products[2].id,
        quantity: 2,
        unitPrice: 49000,
        subtotal: 98000,
      },
      {
        salesOrderId: salesOrder1.id,
        productId: products[3].id,
        quantity: 1,
        unitPrice: 120000,
        subtotal: 120000,
      },
      {
        salesOrderId: salesOrder2.id,
        productId: products[1].id,
        quantity: 10,
        unitPrice: 70000,
        subtotal: 700000,
      },
      {
        salesOrderId: salesOrder2.id,
        productId: products[4].id,
        quantity: 1,
        unitPrice: 1120000,
        subtotal: 1120000,
      },
    ],
  });

  await prisma.payment.createMany({
    data: [
      {
        salesOrderId: salesOrder1.id,
        amount: 250000,
        method: 'Tiền mặt',
        note: 'Thanh toán đủ tại quầy',
      },
      {
        salesOrderId: salesOrder2.id,
        amount: 800000,
        method: 'Chuyển khoản',
        note: 'Đặt cọc 50%',
      },
    ],
  });

  await prisma.invoice.create({
    data: {
      salesOrderId: salesOrder1.id,
      invoiceCode: 'INV-20260325-001',
      pdfUrl: 'https://example.com/invoices/INV-20260325-001.pdf',
    },
  });

  await prisma.stockMovement.createMany({
    data: [
      {
        productId: products[0].id,
        type: StockMovementType.IMPORT,
        quantity: 120,
        purchaseOrderId: purchaseOrder.id,
        createdById: adminUser.id,
        note: 'Nhập theo PO-20260325-001',
      },
      {
        productId: products[1].id,
        type: StockMovementType.IMPORT,
        quantity: 90,
        purchaseOrderId: purchaseOrder.id,
        createdById: adminUser.id,
        note: 'Nhập theo PO-20260325-001',
      },
      {
        productId: products[2].id,
        type: StockMovementType.IMPORT,
        quantity: 120,
        purchaseOrderId: purchaseOrder.id,
        createdById: adminUser.id,
        note: 'Nhập theo PO-20260325-001',
      },
      {
        productId: products[0].id,
        type: StockMovementType.EXPORT,
        quantity: 2,
        salesOrderId: salesOrder1.id,
        createdById: userAccount.id,
        note: 'Xuất bán SO-20260325-001',
      },
      {
        productId: products[2].id,
        type: StockMovementType.EXPORT,
        quantity: 2,
        salesOrderId: salesOrder1.id,
        createdById: userAccount.id,
        note: 'Xuất bán SO-20260325-001',
      },
      {
        productId: products[4].id,
        type: StockMovementType.ADJUST,
        quantity: 18,
        createdById: warehouseStaff.id,
        note: 'Điều chỉnh tồn kho sau kiểm kê cuối ngày',
      },
    ],
  });

  for (let i = 1; i <= 24; i++) {
    const createdAt = daysAgo(i * 2);
    const customer = customers[i % customers.length];
    const staff = i % 2 === 0 ? userAccount : warehouseStaff;
    const productA = products[i % products.length];
    const productB = products[(i + 2) % products.length];
    const qtyA = (i % 5) + 1;
    const qtyB = ((i + 1) % 3) + 1;
    const unitA = Number(productA.salePrice);
    const unitB = Number(productB.salePrice);
    const subtotalA = qtyA * unitA;
    const subtotalB = qtyB * unitB;
    const totalAmount = subtotalA + subtotalB;
    const discountAmount = i % 4 === 0 ? 20000 : i % 3 === 0 ? 10000 : 0;
    const finalAmount = totalAmount - discountAmount;

    const orderStatus =
      i % 10 === 0
        ? OrderStatus.CANCELED
        : i % 4 === 0
          ? OrderStatus.CONFIRMED
          : OrderStatus.COMPLETED;

    const paymentStatus =
      orderStatus === OrderStatus.CANCELED
        ? PaymentStatus.UNPAID
        : i % 5 === 0
          ? PaymentStatus.PARTIAL
          : PaymentStatus.PAID;

    const salesOrder = await prisma.salesOrder.create({
      data: {
        orderCode: `SO-HIS-2026-${String(i).padStart(3, '0')}`,
        customerId: customer.id,
        staffId: staff.id,
        totalAmount,
        discountAmount,
        finalAmount,
        paymentStatus,
        orderStatus,
        note: 'Dữ liệu bán hàng lịch sử để hiển thị báo cáo',
        createdAt,
        updatedAt: createdAt,
      },
    });

    await prisma.salesOrderItem.createMany({
      data: [
        {
          salesOrderId: salesOrder.id,
          productId: productA.id,
          quantity: qtyA,
          unitPrice: unitA,
          subtotal: subtotalA,
        },
        {
          salesOrderId: salesOrder.id,
          productId: productB.id,
          quantity: qtyB,
          unitPrice: unitB,
          subtotal: subtotalB,
        },
      ],
    });

    if (orderStatus !== OrderStatus.CANCELED) {
      await prisma.stockMovement.createMany({
        data: [
          {
            productId: productA.id,
            type: StockMovementType.EXPORT,
            quantity: qtyA,
            salesOrderId: salesOrder.id,
            createdById: staff.id,
            note: `Xuất kho cho đơn ${salesOrder.orderCode}`,
            createdAt,
          },
          {
            productId: productB.id,
            type: StockMovementType.EXPORT,
            quantity: qtyB,
            salesOrderId: salesOrder.id,
            createdById: staff.id,
            note: `Xuất kho cho đơn ${salesOrder.orderCode}`,
            createdAt,
          },
        ],
      });
    }

    if (paymentStatus === PaymentStatus.PAID || paymentStatus === PaymentStatus.PARTIAL) {
      const amount = paymentStatus === PaymentStatus.PAID ? finalAmount : Math.round(finalAmount / 2);
      await prisma.payment.create({
        data: {
          salesOrderId: salesOrder.id,
          amount,
          method: paymentStatus === PaymentStatus.PAID ? 'Chuyển khoản' : 'Tiền mặt',
          note:
            paymentStatus === PaymentStatus.PAID
              ? 'Thanh toán đủ'
              : 'Thanh toán một phần',
          paidAt: createdAt,
        },
      });
    }

    if (paymentStatus === PaymentStatus.PAID && orderStatus === OrderStatus.COMPLETED) {
      await prisma.invoice.create({
        data: {
          salesOrderId: salesOrder.id,
          invoiceCode: `INV-HIS-2026-${String(i).padStart(3, '0')}`,
          pdfUrl: `https://example.com/invoices/INV-HIS-2026-${String(i).padStart(3, '0')}.pdf`,
          issuedAt: createdAt,
        },
      });
    }
  }

  for (let i = 1; i <= 3; i++) {
    const createdAt = daysAgo(10 + i * 15);
    const supplier = suppliers[i % suppliers.length];
    const productA = products[i % products.length];
    const productB = products[(i + 1) % products.length];
    const qtyA = 40 + i * 10;
    const qtyB = 25 + i * 8;
    const subtotalA = qtyA * Number(productA.importPrice);
    const subtotalB = qtyB * Number(productB.importPrice);
    const totalAmount = subtotalA + subtotalB;

    const po = await prisma.purchaseOrder.create({
      data: {
        orderCode: `PO-HIS-2026-${String(i).padStart(3, '0')}`,
        supplierId: supplier.id,
        createdById: adminUser.id,
        totalAmount,
        status: OrderStatus.COMPLETED,
        note: 'Phiếu nhập bổ sung hàng tồn kho',
        createdAt,
        updatedAt: createdAt,
      },
    });

    await prisma.purchaseOrderItem.createMany({
      data: [
        {
          purchaseOrderId: po.id,
          productId: productA.id,
          quantity: qtyA,
          importPrice: Number(productA.importPrice),
          subtotal: subtotalA,
        },
        {
          purchaseOrderId: po.id,
          productId: productB.id,
          quantity: qtyB,
          importPrice: Number(productB.importPrice),
          subtotal: subtotalB,
        },
      ],
    });

    await prisma.stockMovement.createMany({
      data: [
        {
          productId: productA.id,
          type: StockMovementType.IMPORT,
          quantity: qtyA,
          purchaseOrderId: po.id,
          createdById: adminUser.id,
          note: `Nhập kho theo ${po.orderCode}`,
          createdAt,
        },
        {
          productId: productB.id,
          type: StockMovementType.IMPORT,
          quantity: qtyB,
          purchaseOrderId: po.id,
          createdById: adminUser.id,
          note: `Nhập kho theo ${po.orderCode}`,
          createdAt,
        },
      ],
    });
  }

  await prisma.aIStockRecommendation.createMany({
    data: [
      {
        productId: products[4].id,
        currentStock: 18,
        averageDailySales: 2.4,
        recommendedQuantity: 40,
        riskLevel: 'CAO',
        note: 'Sản phẩm bán nhanh, tồn dưới ngưỡng an toàn',
      },
      {
        productId: products[2].id,
        currentStock: 40,
        averageDailySales: 1.2,
        recommendedQuantity: 15,
        riskLevel: 'TRUNG BÌNH',
        note: 'Nên đặt thêm để đủ bán trong 2 tuần tới',
      },
    ],
  });

  await prisma.notification.createMany({
    data: [
      {
        userId: adminUser.id,
        type: NotificationType.LOW_STOCK,
        title: 'Cảnh báo tồn kho thấp',
        content: 'Dây điện CADIVI 2.5mm đang dưới mức tồn tối thiểu.',
        isRead: false,
      },
      {
        userId: userAccount.id,
        type: NotificationType.ORDER,
        title: 'Đơn hàng mới đã tạo',
        content: 'Bạn vừa tạo thành công đơn SO-20260325-001.',
        isRead: true,
      },
      {
        userId: warehouseStaff.id,
        type: NotificationType.SYSTEM,
        title: 'Nhắc kiểm kê kho',
        content: 'Vui lòng kiểm tra tồn kho cuối ngày trước 18:00.',
        isRead: false,
      },
      {
        userId: adminUser.id,
        type: NotificationType.ORDER,
        title: 'Tổng hợp bán hàng theo ngày',
        content: 'Hệ thống đã cập nhật doanh thu ngày mới nhất.',
        isRead: false,
      },
    ],
  });

  await prisma.emailLog.createMany({
    data: [
      {
        to: 'phamvana@gmail.com',
        subject: 'Xác nhận đơn hàng SO-20260325-001',
        content: 'Đơn hàng của bạn đã được xác nhận và chuẩn bị giao.',
        status: 'SENT',
      },
      {
        to: 'admin@ongnuocviet.vn',
        subject: 'Cảnh báo tồn kho thấp',
        content: 'Dây điện CADIVI 2.5mm đã xuống dưới ngưỡng tồn kho.',
        status: 'SENT',
      },
      {
        to: 'vat-tu@minhtam.vn',
        subject: 'Thông tin đặt cọc đơn SO-20260325-002',
        content: 'Hệ thống đã ghi nhận khoản đặt cọc 800.000 VND.',
        status: 'SENT',
      },
      {
        to: 'admin@ongnuocviet.vn',
        subject: 'Báo cáo doanh thu tuần',
        content: 'Doanh thu tuần này tăng 18% so với tuần trước.',
        status: 'SENT',
      },
    ],
  });

  await prisma.auditLog.createMany({
    data: [
      {
        userId: adminUser.id,
        action: AuditAction.CREATE,
        entityName: 'PurchaseOrder',
        entityId: purchaseOrder.id,
        afterData: { orderCode: 'PO-20260325-001', totalAmount: 14280000 },
        ipAddress: '10.10.0.11',
        userAgent: 'Mozilla/5.0',
      },
      {
        userId: userAccount.id,
        action: AuditAction.CREATE,
        entityName: 'SalesOrder',
        entityId: salesOrder1.id,
        afterData: { orderCode: 'SO-20260325-001', finalAmount: 250000 },
        ipAddress: '10.10.0.21',
        userAgent: 'Mozilla/5.0',
      },
      {
        userId: warehouseStaff.id,
        action: AuditAction.UPDATE,
        entityName: 'StockMovement',
        entityId: products[4].id,
        beforeData: { stockQuantity: 16 },
        afterData: { stockQuantity: 18 },
        ipAddress: '10.10.0.31',
        userAgent: 'Mozilla/5.0',
      },
      {
        userId: adminUser.id,
        action: AuditAction.LOGIN,
        entityName: 'Auth',
        entityId: adminUser.id,
        ipAddress: '10.10.0.11',
        userAgent: 'Mozilla/5.0',
      },
      {
        userId: userAccount.id,
        action: AuditAction.LOGIN,
        entityName: 'Auth',
        entityId: userAccount.id,
        ipAddress: '10.10.0.21',
        userAgent: 'Mozilla/5.0',
      },
      {
        userId: adminUser.id,
        action: AuditAction.UPDATE,
        entityName: 'Report',
        entityId: 'dashboard',
        afterData: { refreshed: true, at: new Date().toISOString() },
        ipAddress: '10.10.0.11',
        userAgent: 'Mozilla/5.0',
      },
    ],
  });

  console.log('Đã seed dữ liệu mẫu thành công.');
  console.log(`Vai tro tao moi: ${ROLE_ADMIN}, ${ROLE_SELLER}, ${ROLE_CUSTOMER}`);
  console.log(`Số nhân viên tạo mới: ${staffUsers.count + 1}`);
  console.log('Tài khoản quản trị: admin@ongnuocviet.vn / Admin@123');
  console.log('Tài khoản nhân viên: user@ongnuocviet.vn / User@123');
}

main()
  .catch((error) => {
    console.error('Seed thất bại:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
