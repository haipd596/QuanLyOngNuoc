# Ma trận API theo vai trò và màn hình

Base URL: `/api/v1`

## 1) Màn hình Đăng nhập

| Màn hình | API | Method | Vai trò | Mục đích |
|---|---|---|---|---|
| Đăng nhập | `/auth/login` | `POST` | `USER`, `ADMIN` | Đăng nhập hệ thống |
| Tạo tài khoản | `/auth/register` | `POST` | `ADMIN` | Tạo tài khoản người dùng mới |
| Nền hệ thống | `/auth/refresh` | `POST` | `USER`, `ADMIN` | Làm mới access token |
| Thông tin tài khoản | `/auth/me` | `GET` | `USER`, `ADMIN` | Lấy thông tin tài khoản đang đăng nhập |

## 2) Màn hình Dashboard User

| Màn hình | API | Method | Vai trò | Mục đích |
|---|---|---|---|---|
| Danh sách sản phẩm | `/products` | `GET` | `USER`, `ADMIN` | Xem và tìm sản phẩm |
| Cảnh báo tồn thấp | `/products/low-stock` | `GET` | `USER`, `ADMIN` | Xem sản phẩm tồn kho thấp |
| Tổng quan kho | `/inventory/summary` | `GET` | `USER`, `ADMIN` | Xem tổng quan tồn kho |
| Lịch sử kho | `/inventory/movements` | `GET` | `USER`, `ADMIN` | Xem lịch sử nhập/xuất/điều chỉnh kho |

Chuẩn query list áp dụng:
- `Keyword`, `Page`, `PageSize`
- `Query.<TênCột>`

## 3) Màn hình Bán hàng

| Màn hình | API | Method | Vai trò | Mục đích |
|---|---|---|---|---|
| Tạo đơn bán | `/sales-orders` | `POST` | `USER`, `ADMIN` | Tạo đơn bán hàng |
| Danh sách đơn bán | `/sales-orders` | `GET` | `USER`, `ADMIN` | Xem và tìm đơn bán |
| Chi tiết đơn bán | `/sales-orders/:id` | `GET` | `USER`, `ADMIN` | Xem chi tiết đơn |
| Cập nhật trạng thái đơn | `/sales-orders/:id/status` | `PATCH` | `USER`, `ADMIN` | Đổi trạng thái đơn hàng |
| Hủy đơn | `/sales-orders/:id/cancel` | `POST` | `USER`, `ADMIN` | Hủy đơn bán hàng |

## 4) Màn hình Khách hàng

| Màn hình | API | Method | Vai trò | Mục đích |
|---|---|---|---|---|
| Danh sách khách hàng | `/customers` | `GET` | `USER`, `ADMIN` | Xem và tìm khách hàng |
| Chi tiết khách hàng | `/customers/:id` | `GET` | `USER`, `ADMIN` | Xem chi tiết khách hàng |
| Tạo khách hàng | `/customers` | `POST` | `USER`, `ADMIN` | Tạo mới khách hàng |
| Sửa khách hàng | `/customers/:id` | `PATCH` | `USER`, `ADMIN` | Cập nhật khách hàng |
| Xóa khách hàng | `/customers/:id` | `DELETE` | `ADMIN` | Xóa khách hàng |

## 5) Màn hình Kho hàng thao tác

| Màn hình | API | Method | Vai trò | Mục đích |
|---|---|---|---|---|
| Nhập/Xuất/Điều chỉnh kho | `/inventory/move` | `POST` | `USER`, `ADMIN` | Tạo giao dịch nhập/xuất/điều chỉnh kho |

## 6) Màn hình Quản trị hệ thống

### 6.1 Quản lý người dùng

| Màn hình | API | Method | Vai trò | Mục đích |
|---|---|---|---|---|
| Danh sách người dùng | `/users` | `GET` | `ADMIN` | Xem và tìm người dùng |
| Chi tiết người dùng | `/users/:id` | `GET` | `ADMIN` | Xem chi tiết người dùng |
| Tạo người dùng | `/users` | `POST` | `ADMIN` | Tạo người dùng |
| Sửa người dùng | `/users/:id` | `PATCH` | `ADMIN` | Cập nhật người dùng |
| Xóa người dùng | `/users/:id` | `DELETE` | `ADMIN` | Xóa người dùng |

### 6.2 Quản lý vai trò

| Màn hình | API | Method | Vai trò | Mục đích |
|---|---|---|---|---|
| Danh sách vai trò | `/roles` | `GET` | `ADMIN` | Xem và tìm vai trò |
| Chi tiết vai trò | `/roles/:id` | `GET` | `ADMIN` | Xem chi tiết vai trò |
| Tạo vai trò | `/roles` | `POST` | `ADMIN` | Tạo vai trò |
| Sửa vai trò | `/roles/:id` | `PATCH` | `ADMIN` | Cập nhật vai trò |
| Xóa vai trò | `/roles/:id` | `DELETE` | `ADMIN` | Xóa vai trò |

### 6.3 Quản lý danh mục

| Màn hình | API | Method | Vai trò | Mục đích |
|---|---|---|---|---|
| Danh sách danh mục | `/categories` | `GET` | `ADMIN` | Xem và tìm danh mục |
| Chi tiết danh mục | `/categories/:id` | `GET` | `ADMIN` | Xem chi tiết danh mục |
| Tạo danh mục | `/categories` | `POST` | `ADMIN` | Tạo danh mục |
| Sửa danh mục | `/categories/:id` | `PATCH` | `ADMIN` | Cập nhật danh mục |
| Xóa danh mục | `/categories/:id` | `DELETE` | `ADMIN` | Xóa danh mục |

### 6.4 Quản lý nhà cung cấp

| Màn hình | API | Method | Vai trò | Mục đích |
|---|---|---|---|---|
| Danh sách nhà cung cấp | `/suppliers` | `GET` | `ADMIN` | Xem và tìm nhà cung cấp |
| Chi tiết nhà cung cấp | `/suppliers/:id` | `GET` | `ADMIN` | Xem chi tiết nhà cung cấp |
| Tạo nhà cung cấp | `/suppliers` | `POST` | `ADMIN` | Tạo nhà cung cấp |
| Sửa nhà cung cấp | `/suppliers/:id` | `PATCH` | `ADMIN` | Cập nhật nhà cung cấp |
| Xóa nhà cung cấp | `/suppliers/:id` | `DELETE` | `ADMIN` | Xóa nhà cung cấp |

### 6.5 Quản lý sản phẩm

| Màn hình | API | Method | Vai trò | Mục đích |
|---|---|---|---|---|
| Danh sách sản phẩm | `/products` | `GET` | `USER`, `ADMIN` | Xem và tìm sản phẩm |
| Tạo sản phẩm | `/products` | `POST` | `ADMIN` | Tạo sản phẩm mới |
| Sửa sản phẩm | `/products/:id` | `PATCH` | `ADMIN` | Cập nhật sản phẩm |
| Xóa sản phẩm | `/products/:id` | `DELETE` | `ADMIN` | Xóa sản phẩm |

## 7) Màn hình Báo cáo (Admin)

| Màn hình | API | Method | Vai trò | Mục đích |
|---|---|---|---|---|
| Dashboard tổng quan | `/reports/dashboard` | `GET` | `ADMIN` | Xem tổng quan hệ thống |
| Kiểm kê kho | `/reports/inventory-audit` | `GET` | `ADMIN` | Xem tồn thấp và kiểm kê kho |
| Báo cáo bán hàng | `/reports/sales-overview?from=&to=` | `GET` | `ADMIN` | Xem doanh thu và trạng thái đơn theo thời gian |

## 8) Bộ lọc `Query.<TênCột>` theo API danh sách

### `/users`
- `Query.Id`
- `Query.FullName`
- `Query.Email`
- `Query.Phone`
- `Query.Status`
- `Query.RoleId`

### `/roles`
- `Query.Id`
- `Query.Name`
- `Query.Description`

### `/categories`
- `Query.Id`
- `Query.Name`
- `Query.Slug`
- `Query.Description`

### `/suppliers`
- `Query.Id`
- `Query.Name`
- `Query.Phone`
- `Query.Email`
- `Query.Address`
- `Query.TaxCode`

### `/customers`
- `Query.Id`
- `Query.FullName`
- `Query.Phone`
- `Query.Email`
- `Query.Address`

### `/products`
- `Query.Id`
- `Query.Sku`
- `Query.Name`
- `Query.Slug`
- `Query.Unit`
- `Query.Status`
- `Query.CategoryId`
- `Query.SupplierId`

### `/products/low-stock`
- `Query.Id`
- `Query.Sku`
- `Query.Name`
- `Query.Slug`
- `Query.Status`

### `/inventory/summary`
- `Query.Id`
- `Query.Sku`
- `Query.Name`
- `Query.Status`
- `Query.CategoryId`
- `Query.SupplierId`

### `/inventory/movements`
- `Query.Id`
- `Query.ProductId`
- `Query.Type`
- `Query.CreatedById`
- `Query.PurchaseOrderId`
- `Query.SalesOrderId`
- `Query.Note`
- `Query.ProductName`
- `Query.ProductSku`

### `/sales-orders`
- `Query.Id`
- `Query.OrderCode`
- `Query.CustomerId`
- `Query.CustomerName`
- `Query.StaffId`
- `Query.StaffName`
- `Query.PaymentStatus`
- `Query.OrderStatus`
- `Query.Note`

### `/reports/inventory-audit`
- `Query.Id`
- `Query.Sku`
- `Query.Name`
- `Query.Status`

## 9) OAuth Google

| Man hinh | API | Method | Vai tro | Muc dich |
|---|---|---|---|---|
| Dang nhap Google | `/auth/google` | `GET` | `USER`, `ADMIN` | Chuyen huong den Google OAuth |
| Callback Google | `/auth/google/callback` | `GET` | `USER`, `ADMIN` | Dang nhap/tao lien ket tai khoan bang Google |

## 10) Mail Service

| Man hinh | API | Method | Vai tro | Muc dich |
|---|---|---|---|---|
| Gui mail test | `/mail/test-send` | `POST` | `ADMIN` | Kiem tra cau hinh SMTP va gui mail |

Hook nghiep vu:
- Tao don thanh cong: gui mail xac nhan cho khach (neu co email)
- Ton kho xuong nguong: gui canh bao cho ADMIN
- Loi mail khong lam fail request nghiep vu, he thong chi log vao `EmailLog`

## 11) AI quan ly kho co ban

| Man hinh | API | Method | Vai tro | Muc dich |
|---|---|---|---|---|
| Danh sach goi y nhap hang | `/ai/restock-recommendations` | `GET` | `USER`, `ADMIN` | Xem goi y nhap hang tu du lieu ban |
| Tinh lai goi y | `/ai/recalculate` | `POST` | `ADMIN` | Chay lai rule-based de cap nhat goi y |

Cong thuc ban dau:
- `averageDailySales`: trung binh `SalesOrderItem.quantity` trong 30 ngay gan nhat
- `recommendedQuantity = max(0, targetDays * averageDailySales - currentStock)`
- Ket qua luu vao `AIStockRecommendation`

## 12) Bo loc Query.<TenCot> bo sung

### `/ai/restock-recommendations`
- `Query.Id`
- `Query.ProductId`
- `Query.ProductName`
- `Query.ProductSku`
- `Query.RiskLevel`

## 13) Ban hang cho khach (khong can dang nhap)

| Man hinh | API | Method | Vai tro | Muc dich |
|---|---|---|---|---|
| Dat don guest | `/sales-orders/guest-checkout` | `POST` | `PUBLIC` | Khach dat don khong can tai khoan |
| Tra cuu don guest | `/sales-orders/track?orderCode=&phone=` | `GET` | `PUBLIC` | Khach tra cuu tinh trang don |
