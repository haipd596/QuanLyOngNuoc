# VIEW_INVESTOR_SHORTEN Control

## 📌 Tổng Quan

`VIEW_INVESTOR_SHORTEN` là một control dùng để khai báo thông tin nhà đầu tư với **các trường rút gọn** so với `VIEW_INVESTOR`.

Điều này hữu ích khi bạn chỉ cần những thông tin cơ bản nhất của nhà đầu tư mà không cần đầy đủ chi tiết như ngày sinh, giới tính, quốc tịch, v.v.

---

## 🎯 Mục Đích Sử Dụng

Sử dụng `VIEW_INVESTOR_SHORTEN` khi:
- ✅ Cần khai báo nhà đầu tư nhưng với thông tin **tối thiểu**
- ✅ Muốn giảm số lượng trường để UX đơn giản hơn
- ✅ Form có quá nhiều thông tin khác, cần tập trung vào những trường quan trọng nhất

---

## 📋 Các Trường Được Hỗ Trợ

### Cá Nhân (Individual)

| Trường | Bắt buộc | Loại | Ghi chú |
|---|---|---|---|
| **TenNhaDauTu** | ✅ | Input | Tên nhà đầu tư |
| **GiayToPhapLy** | ✅ | Input | CCCD/Hộ chiếu |
| **SoDienThoai** | ✅ | Input | Có kiểm tra định dạng |
| **Fax** | ❌ | Input | Tùy chọn |
| **Email** | ❌ | Input | Có kiểm tra email |
| **DiaChi** | ✅ | Input | Nơi ở hiện tại |

**So với VIEW_INVESTOR — Trường được BỎ:**
- ❌ NgaySinh
- ❌ GioiTinh
- ❌ QuocTich
- ❌ NgayCap
- ❌ NoiCap
- ❌ MaSoThue
- ❌ DiaChiThuongTru

### Tổ Chức (Organization)

#### Thông Tin Tổ Chức

| Trường | Bắt buộc | Loại | Ghi chú |
|---|---|---|---|
| **TenNhaDauTu** | ✅ | Input | Tên công ty |
| **GiayToPhapLy** | ✅ | Input | Số giấy tờ pháp lý |
| **NgayCap** | ✅ | DatePicker | Ngày cấp (DD/MM/YYYY) |
| **NoiCap** | ✅ | Input | Nơi cấp |
| **MaSoThue** | ❌ | Input | Có kiểm tra định dạng |
| **SoDienThoai** | ✅ | Input | Có kiểm tra định dạng |
| **Fax** | ❌ | Input | Tùy chọn |
| **Email** | ❌ | Input | Có kiểm tra email |
| **DiaChi** | ✅ | Input | Địa chỉ trụ sở |

**So với VIEW_INVESTOR — Trường được BỎ:**
- ❌ Website

#### Thông Tin Người Đại Diện (NDD)

| Trường | Bắt buộc | Loại | Ghi chú |
|---|---|---|---|
| **NguoiDaiDien** | ✅ | Input | Họ tên |
| **ChucDanhNDD** | ✅ | Input | Chức danh |
| **GiayToPhapLyNDD** | ✅ | Input | CCCD/Hộ chiếu |

**So với VIEW_INVESTOR — Trường được BỎ:**
- ❌ NgaySinh
- ❌ GioiTinh
- ❌ QuocTich
- ❌ NgayCapGTNDD
- ❌ NoiCapGTNDD
- ❌ SoDienThoaiNDD
- ❌ FaxNDD
- ❌ EmailNDD
- ❌ DiaChiNDD
- ❌ DiaChiTTNDD

---

## 🔧 Cấu Trúc Thư Mục

```
ViewInvestorShorten/
├── Builder/
│   ├── index.tsx          (Form builder UI, config vai trò)
│   └── style.scss         (Styling)
├── Viewer/
│   ├── index.tsx          (Main component, Form.List manager)
│   ├── Individual.tsx     (Form cho cá nhân)
│   └── Org.tsx            (Form cho tổ chức)
├── type.ts                (TypeScript types)
└── README.md              (File này)
```

---

## 💻 Cách Sử Dụng

### 1. Trong Form Builder (Design Mode)

Kéo thả control **"Nhà đầu tư (rút gọn)"** từ sidebar vào form.

### 2. Chọn Vai Trò Nhà Đầu Tư

Trong Builder panel, chọn vai trò:
- **Nhà đầu tư** (default)
- **Nhà đầu tư góp vốn**
- **Nhà đầu tư nhận góp vốn**
- **Nhà đầu tư chuyển nhượng**
- **Nhà đầu tư nhận chuyển nhượng**

### 3. Khi Người Dùng Điền Form (Viewer Mode)

- Chọn loại: **Cá nhân** hoặc **Tổ chức**
- Nhập các trường tương ứng
- Click **"Thêm nhà đầu tư"** để thêm nhà đầu tư tiếp theo
- Click **"X"** (nút delete) để xóa nhà đầu tư (chỉ khi có 2+ nhà đầu tư)

---

## 📊 Data Structure (Form Output)

```typescript
// Khi submit form, dữ liệu sẽ có dạng:
{
  "NhaDauTu": [
    {
      // Loại cá nhân
      "Loai": "CaNhan",
      "VaiTro": "Thuong",
      "TenNhaDauTu": "Nguyen Van A",
      "GiayToPhapLy": "123456789",
      "SoDienThoai": "0901234567",
      "Fax": "",
      "Email": "nguyenvana@example.com",
      "DiaChi": "123 Nguyen Hue, HCMC"
    },
    {
      // Loại tổ chức
      "Loai": "ToChuc",
      "VaiTro": "GopVon",
      "TenNhaDauTu": "ABC Corp",
      "GiayToPhapLy": "MST-001",
      "MaSoThue": "0123456789",
      "SoDienThoai": "024-1234567",
      "Fax": "",
      "Email": "contact@abc.com",
      "DiaChi": "456 Tran Hung Dao, Hanoi",
      "NguoiDaiDien": "Tran Van B",
      "ChucDanhNDD": "CEO",
      "GiayToPhapLyNDD": "987654321"
    }
  ]
}
```

---

## ✨ Tính Năng

### ✅ Hỗ Trợ

- Multiple investors (Form.List)
- Two investor types (Individual/Organization)
- Conditional form rendering (shouldUpdate pattern)
- Dynamic add/remove investors
- Full validation (required, format, length, XSS protection)
- Responsive layout (3-column grid)
- Investor role configuration in builder

### ❌ Không Hỗ Trợ

- Cross-field validation
- Custom investor role naming
- Bulk import/export
- Template inheritance

---

## 🎨 Styling

Control sử dụng **Ant Design** components:
- `Form.List` - Repeating section
- `Radio.Group` - Type selection
- `Input` - Text input
- `Button` - Add/Delete

Styling là responsive 3-column grid trên desktop, tự wrap trên mobile.

---

## 🔗 Field Mapping (serverPayloadKey)

Khi cấu hình trong schema, thiết lập:

```typescript
{
  fieldName: 'VIEW_INVESTOR_SHORTEN',
  key: 'NhaDauTu',  // Tên field trong payload
  formItemPropsAllowConfig: {
    serverPayloadKey: {
      props: { defaultValue: 'NhaDauTu' }
    }
  }
}
```

Payload sẽ có dạng:
```json
{
  "NhaDauTu": [...]  // ← Tên được mapping từ serverPayloadKey
}
```

---

## 🔍 Validation Rules

Các rule được áp dụng:

| Field | Rules |
|---|---|
| TenNhaDauTu | REQUIRED, NO_HTML, 256 chars max |
| GiayToPhapLy | REQUIRED, NO_HTML, 256 chars max |
| NgayCap | REQUIRED (Org only) |
| NoiCap | REQUIRED, NO_HTML, 256 chars max (Org only) |
| SoDienThoai | REQUIRED, PHONE format |
| Email | EMAIL format (optional) |
| MaSoThue | TAX_CODE format (optional) |
| Fax | FAX format (optional) |
| DiaChi | REQUIRED, NO_HTML, 256 chars max |

---

## 📝 So Sánh VIEW_INVESTOR vs VIEW_INVESTOR_SHORTEN

| Aspect | VIEW_INVESTOR | VIEW_INVESTOR_SHORTEN |
|---|---|---|
| **Trường Individual** | 14 | 6 |
| **Trường Org** | 31 | 12 |
| **Độ phức tạp UI** | Cao | Trung bình |
| **UX** | Chi tiết đầy đủ | Tập trung cơ bản |
| **Use case** | Khai báo chi tiết | Khai báo nhanh |
| **Form height** | ~1500px | ~500px |

---

## 🚀 Cách Extend Control

### Thêm Trường Mới

1. Thêm vào `Individual.tsx` hoặc `Org.tsx`:

```typescript
<Col span={24}>
  <Form.Item
    name={[index, "TruongMoi"]}
    label="Trường Mới"
    rules={[...RULE_REQUIRED]}
  >
    <Input placeholder="Nhập trường mới" />
  </Form.Item>
</Col>
```

2. Thêm rule tương ứng vào `useValidate()`

### Thay Đổi Validation

Chỉnh sửa trong `Individual.tsx` hoặc `Org.tsx`:

```typescript
rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
```

---

## 🐛 Known Issues

Không có known issues hiện tại.

---

## 📞 Support

Để báo cáo bug hoặc request feature, vui lòng liên hệ team development.
