# Backend - Quản Lý Ống Nước

## Chạy dự án
1. Cài dependency trong `be/`.
2. Sao chép `.env.example` thành `.env`.
3. Kết nối MySQL.
4. Đồng bộ Prisma.
5. Chạy backend.

## Seed dữ liệu mẫu
- Lệnh: `npm run seed`
- Tài khoản mẫu:
- Admin: `admin@ongnuocviet.vn` / `Admin@123`
- Seller: `user@ongnuocviet.vn` / `User@123`
- Customer: `khach@ongnuocviet.vn` / `User@123`

## Chuẩn query danh sách
Tất cả API danh sách dùng:
- `Keyword`: từ khóa tìm kiếm tổng quát.
- `Page`: trang hiện tại.
- `PageSize`: số bản ghi mỗi trang.
- `Query.<TênCột>`: lọc theo cột cụ thể của từng bảng.

Ví dụ:
- `GET /api/v1/products?Keyword=PVC&Page=1&PageSize=10&Query.Sku=ONV-PVC`

## Chuẩn response toàn hệ thống
### Thành công (danh sách)
```json
{
  "code": 0,
  "success": true,
  "message": "Lấy danh sách thành công",
  "data": [],
  "metaData": {
    "page": 1,
    "pageSize": 10,
    "total": 100,
    "totalPage": 10
  }
}
```

### Thành công (không phân trang)
```json
{
  "code": 0,
  "success": true,
  "message": "Thành công",
  "data": {},
  "metaData": null
}
```

### Lỗi
```json
{
  "code": 400,
  "success": false,
  "message": "Nội dung lỗi",
  "data": null,
  "metaData": null
}
```

## Swagger
- URL: `http://localhost:3000/api/docs`
- Có ví dụ JSON cho request body.
- Có mô tả query `Keyword`, `Page`, `PageSize`.
- Có mô tả các filter `Query.<TênCột>` theo từng API danh sách.

## Tài liệu
- Ma trận API: `be/docs/api-matrix.md`
- Luồng nghiệp vụ: `be/docs/main-flows.md`
