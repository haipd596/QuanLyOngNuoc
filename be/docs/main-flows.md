# Luong Chinh User va Admin

Tai lieu nay tap trung vao cac luong cot loi, khong bao gom tinh nang nang cao (Google login, AI, ...).

## 1. User moi vao trang se lam gi?

### 1.1 Luong Onboarding User (nhan vien ban hang)
1. Mo trang dang nhap.
2. Dang nhap bang email + mat khau.
3. He thong dieu huong vao dashboard user.
4. User thuc hien cac nghiep vu hang ngay:
- Tim san pham.
- Tao don ban.
- Cap nhat thong tin khach hang.
- Xem ton kho nhanh.
- Theo doi trang thai don vua tao.

### 1.2 User co the lam duoc gi?
- Xem danh sach san pham va ton kho (`/products`, `/inventory/summary`).
- Tao don ban (`/sales-orders`).
- Huy don neu can (`/sales-orders/:id/cancel`).
- Quan ly khach hang (`/customers`).
- Xem lich su luan chuyen kho (`/inventory/movements`).

## 2. Luong chinh cua User theo nghiep vu

### 2.1 Ban hang tai quay
1. Tim san pham theo ten/SKU.
2. Kiem tra ton kho hien tai.
3. Tao don ban voi danh sach hang.
4. He thong tru kho tu dong.
5. User theo doi trang thai don.

### 2.2 Dieu chinh kho thuc te
1. User vao man hinh kho.
2. Chon nhap/xuat/dieu chinh.
3. Nhap so luong va ly do.
4. He thong cap nhat ton + luu lich su movement.

## 3. Admin vao he thong se lam gi?

### 3.1 Luong dieu hanh tong quan
1. Dang nhap.
2. Vao dashboard admin.
3. Xem nhanh:
- Tong so san pham, khach hang, nhan vien, nha cung cap.
- Doanh thu trong ngay.
- So mat hang sap het.
4. Neu co bat thuong: vao man hinh kiem ke va bao cao chi tiet.

### 3.2 Admin co the lam duoc gi?
- Quan ly user/role (`/users`, `/roles`).
- Quan ly danh muc du lieu goc (`/categories`, `/suppliers`, `/products`).
- Theo doi don ban (`/sales-orders`).
- Kiem ke kho (`/reports/inventory-audit`).
- Xem thong ke ban hang (`/reports/sales-overview`).
- Theo doi dashboard tong hop (`/reports/dashboard`).

## 4. Luong kiem ke va theo doi cua Admin

### 4.1 Kiem ke kho dinh ky
1. Mo bao cao `inventory-audit`.
2. Xem danh sach hang duoi nguong.
3. Xem san pham bien dong kho cao.
4. Ra quyet dinh dieu chinh ton kho hoac dat nhap.

### 4.2 Theo doi hieu suat ban hang
1. Chon khoang thoi gian.
2. Xem tong don, tong doanh thu, tong chiet khau.
3. Xem co cau trang thai don.
4. Danh gia chat luong van hanh va xu huong ban.

## 5. API cot loi phuc vu 2 nhom vai tro

### 5.1 Auth
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `GET /api/v1/auth/me`

### 5.2 User nghiep vu
- `GET /api/v1/products`
- `POST /api/v1/sales-orders`
- `POST /api/v1/sales-orders/:id/cancel`
- `GET /api/v1/customers`
- `POST /api/v1/inventory/move`

### 5.3 Admin dieu hanh
- `GET /api/v1/reports/dashboard`
- `GET /api/v1/reports/inventory-audit`
- `GET /api/v1/reports/sales-overview?from=YYYY-MM-DD&to=YYYY-MM-DD`
- `GET /api/v1/users`
- `GET /api/v1/roles`

## 6. Nguyen tac trien khai tiep theo
- Chua can nang cao, uu tien on dinh luong cot loi.
- Moi API can co validation dau vao ro rang.
- Moi tac dong kho phai co lich su movement de doi soat.
- Moi don ban phai lien ket du lieu ton kho de tranh lech so.
