# Changelog

Tất cả thay đổi quan trọng sẽ được ghi lại trong file này.
 
Định dạng theo chuẩn [Semantic Versioning](https://semver.org/) và cấu trúc inspired từ GitLab Release Notes.
 
---
## [1.1.0] - 2025-11-25
### Added
#### Nhóm 1(trang admin)

#### Nhóm 2 (Trang Public)
- Thêm đầu dữ liệu nối api cho Danh sách thủ tục.
- Thêm đầu dữ liệu nối api cho dịch vụ công.

#### Nhóm 3 (Trang Admin)
- thêm modal ký số,  modal ký sao y, trong tiếp nhận trực tiếp, page xác nhận đăng ký hồ sơ
- thêm modal nhập mã số thuế,cccd, modal thông tin công dân chỉnh lại vị trí file
### Changed
#### Nhóm 1(trang admin)


#### Nhóm 2 (Trang Public)
- Refactor module trang chủ.
- Thay đổi lại giao diện footer

#### Nhóm 3 (Trang Admin)

 
### Fixed
#### Nhóm 1(trang admin)
- Không có lỗi nghiêm trọng nào được ghi nhận và sửa trong bản này.

#### Nhóm 2 (Trang Public)
- Không có lỗi nghiêm trọng nào được ghi nhận và sửa trong bản này.

#### Nhóm 3 (Trang Admin)
- Không có lỗi nghiêm trọng nào được ghi nhận và sửa trong bản này.

---
 
## [1.0.0] - 2025-11-19
### Added
#### Nhóm 1(trang admin)
- Thêm các Modal mới (Thêm Mới, Cập Nhật, Xem Chi Tiết) và tạo **ModalForm** để tái sử dụng layout form.
- Cập nhật, Thêm mới dịch vụ công hiển thị dưới dạng Page.
- Tạo ra **DichVuCongForm** để tái sử dụng.
- Code theo các modal module để có thể tái sử dụng.

#### Nhóm 2 (Trang Public)
- Thêm đầu dữ liệu mới cho module Danh sách thủ tục (Theo chuẩn A Tuấn).
- Hoàn thành thiết kế giao diện trang Login và Quên Mật khẩu.
- Hoàn thành thiết kế giao diện Trang chủ.

#### Nhóm 3 (Trang Admin)
- Thêm màn hình danh sách thủ tục hành chính trước khi vào trang tiếp nhận hồ sơ trực tiếp.
- Viết trang **danh sách đăng kí nộp hồ sơ trực tiếp**.
- Viết trang **xem tài liệu đính kèm hồ sơ** trong danh sách hồ sơ chờ bổ sung (3.3.11).
 
### Changed
#### Nhóm 1(trang admin)
- Refactor các module: Cấp Cơ Quan Quản Lý, Lĩnh Vực Áp Dụng Cho TTHC, Thành phần hồ sơ.
- Chia hooks `useAction`, `useColumn`, `useData` cho các module trên.
- Refactor module Dịch vụ công, chia đầu `use(Action, data, column)` hooks.
- Các mục Cập Nhật, Thêm Mới, Xem Chi Tiết dịch vụ công chia đầu `useAction` hooks.
- Xem chi tiết dịch vụ công hiển thị dưới dạng Modal.
- Hiện các nút ở thao tác dịch vụ công.
- Lồng phần quản lý thành phần hồ sơ vào luôn quản lý thủ tục hành chính.
- Refactor thủ tục hành chính.

#### Nhóm 2 (Trang Public)
- Refactor module Danh sách thủ tục và chia đầu use hook (`Action, data, collum, filter`).
- Thiết kế lại giao diện Auth và chỉnh sửa CSS.
- Refactor module Dịch vụ công.
- Refactor module Báo cáo thống kê:
    - Chia đầu hook (`Action, Chart, Collumn, Data và Filter`).
    - Chia thành 4 route nhỏ thay vì 4 tabs.
    - Tách filter phục vụ cho từng route.
    - Thêm lazy load để tối ưu hiệu năng.

#### Nhóm 3 (Trang Admin)
- Refactor components thông tin hồ sơ.
- Sửa lại sidebar, thêm **Popover menu style** cho collapsed mode.
- Refactor các trang liên quan.
- Loại bỏ phân trang ở các trang tiếp nhận.
 
### Fixed
#### Nhóm 1(trang admin)
- Không có lỗi nghiêm trọng nào được ghi nhận và sửa trong bản này.

#### Nhóm 2 (Trang Public)
- Không có lỗi nghiêm trọng nào được ghi nhận và sửa trong bản này.

#### Nhóm 3 (Trang Admin)
- Sửa lỗi căn giữa icon.
- Căn giữa icon ở thao tác.

---