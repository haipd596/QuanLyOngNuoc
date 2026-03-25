# Backend - Quan Ly Ong Nuoc

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
- Google OAuth
- Mail service

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
2. Copy `.env.example` thành `.env`.
3. Kết nối MySQL.
4. Chạy migrate Prisma.
5. Khởi động backend.

## API nền đã có
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh` (header `x-refresh-token`)
- `GET /api/v1/auth/me` (Bearer token)
- `GET/POST/PATCH/DELETE /api/v1/users`
- `GET/POST/PATCH/DELETE /api/v1/roles`
- `GET/POST/PATCH/DELETE /api/v1/categories`
- `GET/POST/PATCH/DELETE /api/v1/suppliers`
- `GET/POST/PATCH/DELETE /api/v1/customers`
- `GET/POST/PATCH/DELETE /api/v1/products`
- `GET /api/v1/products/low-stock`
- `GET /api/v1/inventory/summary`
- `GET /api/v1/inventory/movements`
- `POST /api/v1/inventory/move`
