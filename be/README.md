# Backend - Quản Lý Ống Nước

## Mục tiêu
Backend được thiết kế theo hướng:
- Dễ hiểu
- Dễ mở rộng
- Dễ bàn giao
- Không lỗi thời

## Công nghệ
- NestJS
- TypeScript
- Prisma
- MySQL
- JWT

## Cấu trúc khởi đầu
```bash
src/
├─ common/
├─ config/
└─ modules/
   ├─ auth/
   ├─ users/
   ├─ roles/
   ├─ products/
   ├─ categories/
   ├─ suppliers/
   ├─ customers/
   ├─ inventory/
   ├─ purchase-orders/
   ├─ sales-orders/
   ├─ payments/
   ├─ reports/
   ├─ mails/
   ├─ notifications/
   ├─ ai/
   └─ audit-logs/
```

## Chạy dự án
1. Cài dependency trong `be/`.
2. Sao chép `.env.example` thành `.env`.
3. Kết nối MySQL.
4. Chạy lệnh đồng bộ Prisma.
5. Khởi động backend.

## Seed dữ liệu mẫu
- Chạy lệnh: `npm run seed`
- Dữ liệu seed có đủ bảng chính để mô phỏng hệ thống đã vận hành thực tế:
- Vai trò, người dùng, danh mục, nhà cung cấp, khách hàng.
- Sản phẩm, ảnh sản phẩm, nhập kho, xuất kho, điều chỉnh kho.
- Đơn bán, chi tiết đơn, thanh toán, hóa đơn.
- Thông báo, email log, audit log, gợi ý tồn kho.
- Có dữ liệu lịch sử nhiều ngày để biểu đồ và thống kê trực quan hơn.

## Tài khoản đăng nhập mẫu sau khi seed
- Admin:
- Email: `admin@ongnuocviet.vn`
- Mật khẩu: `Admin@123`
- User:
- Email: `user@ongnuocviet.vn`
- Mật khẩu: `User@123`

## API nền đã có
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh` (header `x-refresh-token`)
- `GET /api/v1/auth/me` (Bearer token)
- `GET/POST/PATCH/DELETE /api/v1/users` (`ADMIN`)
- `GET/POST/PATCH/DELETE /api/v1/roles` (`ADMIN`)
- `GET/POST/PATCH/DELETE /api/v1/categories` (`ADMIN`)
- `GET/POST/PATCH/DELETE /api/v1/suppliers` (`ADMIN`)
- `GET/POST/PATCH/DELETE /api/v1/customers` (`ADMIN`, `USER` trừ `DELETE`)
- `GET/POST/PATCH/DELETE /api/v1/products` (`USER` chỉ được `GET`)
- `GET /api/v1/products/low-stock` (`ADMIN`, `USER`)
- `GET /api/v1/inventory/summary` (`ADMIN`, `USER`)
- `GET /api/v1/inventory/movements` (`ADMIN`, `USER`)
- `POST /api/v1/inventory/move` (`ADMIN`, `USER`)
- `GET/POST /api/v1/sales-orders` (`ADMIN`, `USER`)
- `GET /api/v1/sales-orders/:id` (`ADMIN`, `USER`)
- `PATCH /api/v1/sales-orders/:id/status` (`ADMIN`, `USER`)
- `POST /api/v1/sales-orders/:id/cancel` (`ADMIN`, `USER`)
- `GET /api/v1/reports/dashboard` (`ADMIN`)
- `GET /api/v1/reports/inventory-audit` (`ADMIN`)
- `GET /api/v1/reports/sales-overview` (`ADMIN`)

## Tài liệu luồng chính
- Xem tại `be/docs/main-flows.md`
