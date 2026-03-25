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
