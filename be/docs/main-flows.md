# Luồng Chính User Và Admin

Tài liệu này tập trung vào các luồng cốt lõi, chưa bao gồm các tính năng nâng cao (Google Login, AI, ...).

## 1. User mới vào trang sẽ làm gì?

### 1.1 Luồng onboarding user (nhân viên bán hàng)
1. Mở trang đăng nhập.
2. Đăng nhập bằng email và mật khẩu.
3. Hệ thống điều hướng vào màn hình nghiệp vụ.
4. User thực hiện công việc hằng ngày:
- Tìm sản phẩm.
- Tạo đơn bán.
- Cập nhật thông tin khách hàng.
- Xem tồn kho nhanh.
- Theo dõi trạng thái đơn vừa tạo.

### 1.2 User có thể làm được gì?
- Xem danh sách sản phẩm và tồn kho (`/products`, `/inventory/summary`).
- Tạo đơn bán (`/sales-orders`).
- Hủy đơn nếu cần (`/sales-orders/:id/cancel`).
- Quản lý khách hàng (`/customers`).
- Xem lịch sử luân chuyển kho (`/inventory/movements`).

## 2. Luồng chính của user theo nghiệp vụ

### 2.1 Bán hàng tại quầy
1. Tìm sản phẩm theo tên hoặc SKU.
2. Kiểm tra tồn kho hiện tại.
3. Tạo đơn bán với danh sách hàng.
4. Hệ thống trừ kho tự động.
5. User theo dõi trạng thái đơn.

### 2.2 Điều chỉnh kho thực tế
1. User vào màn hình kho.
2. Chọn nhập/xuất/điều chỉnh.
3. Nhập số lượng và lý do.
4. Hệ thống cập nhật tồn và lưu lịch sử movement.

## 3. Admin vào hệ thống sẽ làm gì?

### 3.1 Luồng điều hành tổng quan
1. Đăng nhập.
2. Vào dashboard admin.
3. Xem nhanh:
- Tổng số sản phẩm, khách hàng, nhân viên, nhà cung cấp.
- Doanh thu trong ngày.
- Số mặt hàng sắp hết.
4. Nếu có bất thường: vào màn hình kiểm kê và báo cáo chi tiết.

### 3.2 Admin có thể làm được gì?
- Quản lý user/role (`/users`, `/roles`).
- Quản lý danh mục dữ liệu gốc (`/categories`, `/suppliers`, `/products`).
- Theo dõi đơn bán (`/sales-orders`).
- Kiểm kê kho (`/reports/inventory-audit`).
- Xem thống kê bán hàng (`/reports/sales-overview`).
- Theo dõi dashboard tổng hợp (`/reports/dashboard`).

## 4. Luồng kiểm kê và theo dõi của admin

### 4.1 Kiểm kê kho định kỳ
1. Mở báo cáo `inventory-audit`.
2. Xem danh sách hàng dưới ngưỡng.
3. Xem sản phẩm biến động kho cao.
4. Ra quyết định điều chỉnh tồn kho hoặc đặt nhập.

### 4.2 Theo dõi hiệu suất bán hàng
1. Chọn khoảng thời gian.
2. Xem tổng đơn, tổng doanh thu, tổng chiết khấu.
3. Xem cơ cấu trạng thái đơn.
4. Đánh giá chất lượng vận hành và xu hướng bán.

## 5. API cốt lõi phục vụ 2 nhóm vai trò

### 5.1 Auth
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `GET /api/v1/auth/me`

### 5.2 User nghiệp vụ
- `GET /api/v1/products`
- `POST /api/v1/sales-orders`
- `POST /api/v1/sales-orders/:id/cancel`
- `GET /api/v1/customers`
- `POST /api/v1/inventory/move`

### 5.3 Admin điều hành
- `GET /api/v1/reports/dashboard`
- `GET /api/v1/reports/inventory-audit`
- `GET /api/v1/reports/sales-overview?from=YYYY-MM-DD&to=YYYY-MM-DD`
- `GET /api/v1/users`
- `GET /api/v1/roles`

## 6. Nguyên tắc triển khai tiếp theo
- Chưa làm nâng cao, ưu tiên ổn định luồng cốt lõi.
- Mỗi API phải có validation đầu vào rõ ràng.
- Mỗi tác động kho phải có lịch sử movement để đối soát.
- Mỗi đơn bán phải liên kết dữ liệu tồn kho để tránh lệch số.
