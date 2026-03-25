# Backend - Quản Lý Ống Nước

## Mục tiêu
Backend được thiết kế theo hướng:
- Dễ hiểu.
- Dễ mở rộng.
- Dễ bàn giao.
- Không lỗi thời.

## Công nghệ
- NestJS
- TypeScript
- Prisma
- MySQL
- JWT

## Chạy dự án
1. Cài dependency trong `be/`.
2. Sao chép `.env.example` thành `.env`.
3. Kết nối MySQL.
4. Đồng bộ Prisma.
5. Khởi động backend.

## Seed dữ liệu mẫu
- Chạy lệnh: `npm run seed`
- Dữ liệu seed có đủ bảng chính để mô phỏng hệ thống đã vận hành:
- Vai trò, người dùng, danh mục, nhà cung cấp, khách hàng.
- Sản phẩm, ảnh sản phẩm, nhập kho, xuất kho, điều chỉnh kho.
- Đơn bán, chi tiết đơn, thanh toán, hóa đơn.
- Thông báo, email log, audit log, gợi ý tồn kho.
- Có dữ liệu lịch sử nhiều ngày để thống kê trực quan.

## Tài khoản đăng nhập mẫu sau khi seed
- Admin: `admin@ongnuocviet.vn` / `Admin@123`
- User: `user@ongnuocviet.vn` / `User@123`

## Chuẩn response toàn hệ thống
Mọi API đều trả đúng cấu trúc:

```json
{
  "code": 200,
  "status": "success",
  "data": {},
  "message": "Thành công"
}
```

Khi lỗi:

```json
{
  "code": 400,
  "status": "error",
  "data": null,
  "message": "Nội dung lỗi"
}
```

## Chuẩn phân trang API danh sách
Tất cả API danh sách dùng query:
- `page`: trang hiện tại (mặc định `1`)
- `limit`: số bản ghi mỗi trang (mặc định `10`, tối đa `100`)

Ví dụ:
- `GET /api/v1/products?page=1&limit=10`
- `GET /api/v1/users?page=2&limit=20`

Response danh sách:

```json
{
  "code": 200,
  "status": "success",
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 150,
      "totalPages": 15,
      "hasNextPage": true,
      "hasPreviousPage": false
    }
  },
  "message": "Lấy danh sách thành công"
}
```

## API hiện có
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `GET /api/v1/auth/me`

- `GET/POST/PATCH/DELETE /api/v1/users` (`ADMIN`)
- `GET/POST/PATCH/DELETE /api/v1/roles` (`ADMIN`)
- `GET/POST/PATCH/DELETE /api/v1/categories` (`ADMIN`)
- `GET/POST/PATCH/DELETE /api/v1/suppliers` (`ADMIN`)
- `GET/POST/PATCH/DELETE /api/v1/customers` (`ADMIN`, `USER` trừ `DELETE`)
- `GET/POST/PATCH/DELETE /api/v1/products` (`USER` chỉ được `GET`)
- `GET /api/v1/products/low-stock`

- `GET /api/v1/inventory/summary`
- `GET /api/v1/inventory/movements`
- `POST /api/v1/inventory/move`

- `GET/POST /api/v1/sales-orders`
- `GET /api/v1/sales-orders/:id`
- `PATCH /api/v1/sales-orders/:id/status`
- `POST /api/v1/sales-orders/:id/cancel`

- `GET /api/v1/reports/dashboard`
- `GET /api/v1/reports/inventory-audit`
- `GET /api/v1/reports/sales-overview`

## Tài liệu luồng nghiệp vụ
- Xem tại `be/docs/main-flows.md`

## Swagger
- URL: `http://localhost:3000/api/docs`
- Dùng nút `Authorize` và chọn `BearerAuth` để test API có xác thực.
- Swagger đã được gắn:
- `Tag` theo từng module (`Auth`, `Users`, `Products`, `Inventory`, `Sales Orders`, `Reports`, ...).
- Mô tả query phân trang (`page`, `limit`) cho API danh sách.
- Mẫu response chuẩn `code`, `status`, `data`, `message` cho endpoint chính.
