# Ma Trận API Theo Vai Trò Và Màn Hình

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
| Danh sách sản phẩm | `/products?page=&limit=&keyword=` | `GET` | `USER`, `ADMIN` | Xem và tìm sản phẩm |
| Cảnh báo tồn thấp | `/products/low-stock?page=&limit=&keyword=` | `GET` | `USER`, `ADMIN` | Xem sản phẩm tồn kho thấp |
| Tổng quan kho | `/inventory/summary?page=&limit=&keyword=` | `GET` | `USER`, `ADMIN` | Xem tổng quan tồn kho |
| Lịch sử kho | `/inventory/movements?page=&limit=&keyword=` | `GET` | `USER`, `ADMIN` | Xem lịch sử nhập/xuất/điều chỉnh kho |

## 3) Màn hình Bán hàng

| Màn hình | API | Method | Vai trò | Mục đích |
|---|---|---|---|---|
| Tạo đơn bán | `/sales-orders` | `POST` | `USER`, `ADMIN` | Tạo đơn bán hàng |
| Danh sách đơn bán | `/sales-orders?page=&limit=&keyword=` | `GET` | `USER`, `ADMIN` | Xem và tìm đơn bán |
| Chi tiết đơn bán | `/sales-orders/:id` | `GET` | `USER`, `ADMIN` | Xem chi tiết đơn |
| Cập nhật trạng thái đơn | `/sales-orders/:id/status` | `PATCH` | `USER`, `ADMIN` | Đổi trạng thái đơn hàng |
| Hủy đơn | `/sales-orders/:id/cancel` | `POST` | `USER`, `ADMIN` | Hủy đơn bán hàng |

## 4) Màn hình Khách hàng

| Màn hình | API | Method | Vai trò | Mục đích |
|---|---|---|---|---|
| Danh sách khách hàng | `/customers?page=&limit=&keyword=` | `GET` | `USER`, `ADMIN` | Xem và tìm khách hàng |
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
| Danh sách người dùng | `/users?page=&limit=&keyword=` | `GET` | `ADMIN` | Xem và tìm người dùng |
| Chi tiết người dùng | `/users/:id` | `GET` | `ADMIN` | Xem chi tiết người dùng |
| Tạo người dùng | `/users` | `POST` | `ADMIN` | Tạo người dùng |
| Sửa người dùng | `/users/:id` | `PATCH` | `ADMIN` | Cập nhật người dùng |
| Xóa người dùng | `/users/:id` | `DELETE` | `ADMIN` | Xóa người dùng |

### 6.2 Quản lý vai trò

| Màn hình | API | Method | Vai trò | Mục đích |
|---|---|---|---|---|
| Danh sách vai trò | `/roles?page=&limit=&keyword=` | `GET` | `ADMIN` | Xem và tìm vai trò |
| Chi tiết vai trò | `/roles/:id` | `GET` | `ADMIN` | Xem chi tiết vai trò |
| Tạo vai trò | `/roles` | `POST` | `ADMIN` | Tạo vai trò |
| Sửa vai trò | `/roles/:id` | `PATCH` | `ADMIN` | Cập nhật vai trò |
| Xóa vai trò | `/roles/:id` | `DELETE` | `ADMIN` | Xóa vai trò |

### 6.3 Quản lý danh mục

| Màn hình | API | Method | Vai trò | Mục đích |
|---|---|---|---|---|
| Danh sách danh mục | `/categories?page=&limit=&keyword=` | `GET` | `ADMIN` | Xem và tìm danh mục |
| Chi tiết danh mục | `/categories/:id` | `GET` | `ADMIN` | Xem chi tiết danh mục |
| Tạo danh mục | `/categories` | `POST` | `ADMIN` | Tạo danh mục |
| Sửa danh mục | `/categories/:id` | `PATCH` | `ADMIN` | Cập nhật danh mục |
| Xóa danh mục | `/categories/:id` | `DELETE` | `ADMIN` | Xóa danh mục |

### 6.4 Quản lý nhà cung cấp

| Màn hình | API | Method | Vai trò | Mục đích |
|---|---|---|---|---|
| Danh sách nhà cung cấp | `/suppliers?page=&limit=&keyword=` | `GET` | `ADMIN` | Xem và tìm nhà cung cấp |
| Chi tiết nhà cung cấp | `/suppliers/:id` | `GET` | `ADMIN` | Xem chi tiết nhà cung cấp |
| Tạo nhà cung cấp | `/suppliers` | `POST` | `ADMIN` | Tạo nhà cung cấp |
| Sửa nhà cung cấp | `/suppliers/:id` | `PATCH` | `ADMIN` | Cập nhật nhà cung cấp |
| Xóa nhà cung cấp | `/suppliers/:id` | `DELETE` | `ADMIN` | Xóa nhà cung cấp |

### 6.5 Quản lý sản phẩm

| Màn hình | API | Method | Vai trò | Mục đích |
|---|---|---|---|---|
| Tạo sản phẩm | `/products` | `POST` | `ADMIN` | Tạo sản phẩm mới |
| Sửa sản phẩm | `/products/:id` | `PATCH` | `ADMIN` | Cập nhật sản phẩm |
| Xóa sản phẩm | `/products/:id` | `DELETE` | `ADMIN` | Xóa sản phẩm |

## 7) Màn hình Báo cáo (Admin)

| Màn hình | API | Method | Vai trò | Mục đích |
|---|---|---|---|---|
| Dashboard tổng quan | `/reports/dashboard` | `GET` | `ADMIN` | Xem tổng quan hệ thống |
| Kiểm kê kho | `/reports/inventory-audit?page=&limit=&keyword=` | `GET` | `ADMIN` | Xem tồn thấp và kiểm kê kho |
| Báo cáo bán hàng | `/reports/sales-overview?from=&to=` | `GET` | `ADMIN` | Xem doanh thu và trạng thái đơn theo thời gian |

## 8) Quy ước tìm kiếm `keyword` theo API danh sách

| API danh sách | Tìm kiếm theo |
|---|---|
| `/users` | `fullName`, `email`, `phone` |
| `/roles` | `name`, `description` |
| `/categories` | `name`, `slug`, `description` |
| `/suppliers` | `name`, `phone`, `email`, `address`, `taxCode` |
| `/customers` | `fullName`, `phone`, `email`, `address` |
| `/products` | `name`, `sku`, `slug` |
| `/products/low-stock` | `name`, `sku`, `slug` (trong tập tồn thấp) |
| `/inventory/summary` | `name`, `sku` |
| `/inventory/movements` | `note`, `name`, `sku`, `type` (`IMPORT`, `EXPORT`, `ADJUST`) |
| `/sales-orders` | `orderCode`, `note`, `customer.fullName`, `staff.fullName` |
| `/reports/inventory-audit` | `name`, `sku` (trong tập tồn thấp) |
