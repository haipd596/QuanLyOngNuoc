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

