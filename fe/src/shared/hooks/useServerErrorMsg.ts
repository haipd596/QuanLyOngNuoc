import {
  COMMON_UNAUTHORIZED,
  COMMON_ACCESS_DENIED,
  COMMON_NOT_FOUND,
  COMMON_INTERNAL_SERVER_ERROR,
  COMMON_MISSING_PARAM,
} from "@shared/constants";

export const useServerErrorMsg = () => {
  const ERROR_CODE_MSG: any = {
    //common
    [COMMON_UNAUTHORIZED]: "Chưa xác thực",
    [COMMON_ACCESS_DENIED]: "Chưa có quyền",
    [COMMON_NOT_FOUND]: "Không tìm thấy",
    [COMMON_INTERNAL_SERVER_ERROR]: "Lỗi server",
    [COMMON_MISSING_PARAM]: "Thiếu tham số",
    //Danh mục vùng kinh tế
    ["Admin_VungKinhTe_000"]: "Mã danh mục vùng kinh tế đã tồn tại",
    ["Admin_VungKinhTe_001"]:
      "Vùng kinh tế đã được sử dụng, nên không thế xóa được",
    ["Admin_VungKinhTe_200"]: "Sai dữ liệu", // Giải thích (VI): Mã lỗi 200 - Sai dữ liệu cho danh mục vùng kinh tế
    //Danh mục tổ chức quốc tế
    ["Admin_ToChucQuocTe_000"]: "Mã danh mục tổ chức quốc tế đã tồn tại",
    ["Admin_ToChucQuocTe_001"]: "Số điện thoại không hợp lệ",
    ["Admin_ToChucQuocTe_002"]: "Email không hợp lệ",
    ["Admin_ToChucQuocTe_003"]: "Fax không hợp lệ",
    ["Admin_ToChucQuocTe_200"]: "Sai dữ liệu", // Giải thích (VI): Mã lỗi 200 - Sai dữ liệu cho danh mục tổ chức quốc tế
    //Danh Mục Xã phường thị trấn
    ["Admin_XaPhuong_000"]: "Mã danh mục Xã/Phường đã tồn tại",
    ["Admin_XaPhuong_001"]: "Ngôn ngữ không hợp lệ",
    ["Admin_XaPhuong_002"]: "Kiểu Xã/Phường không hợp lệ",
    //Danh Mục Tỉnh thành phố
    ["Admin_TinhThanhPho_000"]: "Mã danh mục Tỉnh/Thành Phố đã tồn tại",
    ["Admin_TinhThanhPho_200"]: "Sai dữ liệu", // Giải thích (VI): Mã lỗi 200 - Sai dữ liệu cho danh mục tỉnh thành phố
    //Danh mục Tỉnh thành phố - Quốc gia
    ["Admin_TinhThanh_Quocgia_000"]: "Mã đã tồn tại",
    ["Admin_TinhThanh_Quocgia_001"]: "Quốc gia không đúng",
    ["Admin_TinhThanh_Quocgia_200"]: "Sai dữ liệu", // Giải thích (VI): Mã lỗi 200 - Sai dữ liệu cho danh mục tỉnh thành phố quốc gia
    //Danh mục Quốc gia - Tổ chức quốc tế
    ["Admin_Quocgia_Tochuc_000"]: "Quốc gia không tồn tại",
    ["Admin_Quocgia_Tochuc_001"]: "Tổ chức quốc tế không tồn tại",
    //Danh Mục Thủ Tục Hành Chính
    ["Admin_NhomThuTuc_000"]: "Mã nhóm thủ tục đã tồn tại",
    ["Admin_NhomThuTuc_001"]: "Không thể xóa vì Nhóm thủ tục đang được sử dụng",
    //Ngày nghỉ
    ["Admin_NgayNghi_000"]: "Ngày nghỉ đã tồn tại",
    //Danh mục cơ quan
    ["Admin_CoQuan_000"]: "Mã danh mục cơ quan đã tồn tại",
    ["Admin_CoQuan_001"]: "Không tìm thấy danh mục cơ quan cha",
    ["Admin_CoQuan_002"]: "Không thể xóa vì Cơ quan đã được sử dụng",
    //Danh mục Ủy ban
    ["Admin_UyBan_000"]: "Mã đã tồn tại",
    ["Admin_UyBan_001"]: "Tỉnh thành không tồn tại",
    ["Admin_UyBan_002"]: "Đơn vị không tồn tại",
    ["Admin_UyBan_003"]: "Số điện thoại không hợp lệ",
    ["Admin_UyBan_004"]: "Email không hợp lệ",
    ["Admin_UyBan_005"]: "Fax không hợp lệ",
    //Danh mục cấp cơ quan quản lý
    ["Admin_CapCoQuanQuanLy_000"]: "Mã cấp cơ quan đã tồn tại",
    ["Admin_CapCoQuanQuanLy_001"]:
      "Không thể xóa vì Cấp cơ quan quản lý đang sử dụng",
    //DM dịch vụ công
    ["Admin_DichVu_000"]: "Mã dịch vụ công đã tồn tại",
    ["Admin_DichVu_001"]: "Cấp độ dịch vụ công không hợp lệ",
    ["Admin_DichVu_002"]: "Không tìm thấy thủ tục",
    ["Admin_DichVu_003"]: "Không tìm thấy trường hợp thủ tục",
    ["Admin_DichVu_004"]: "Không thể xóa vì Dịch vụ công đang được sử dụng",
    //Form tiếp nhận
    ["Admin_3000"]: "Thiếu tham số: Tên",
    //Lĩnh Vực
    ["Admin_LinhVuc_000"]: "Mã lĩnh vực đã tồn tại",
    ["Admin_LinhVuc_001"]: "Không thể xóa vì Lĩnh vực đang được sử dụng",
    //Thủ tục hành chính
    ["Admin_ThuTucHanhChinh_000"]: "Mã thủ tục hành chính đã tồn tại",
    ["Admin_ThuTucHanhChinh_001"]:
      "Không thể xóa vì Thủ tục hành chính đang được sử dụng",
    //Giấy tờ thành phần hồ sơ
    ["Admin_GiayToThanhPhanHoSo_000"]: "Mã giấy tờ thành phần hồ sơ đã tồn tại",
    ["Admin_GiayToThanhPhanHoSo_001"]:
      "Không thể xóa vì Giấy tờ thành phần hồ sơ đang được sử dụng",
    //Đơn vị hành chính
    ["Admin_DonViHanhChinhNhom_000"]: "Mã đơn vị hành chính không hợp lệ",
    //Loại doanh nghiệp
    ["Admin_LoaiDoanhNghiep_000"]: "Mã loại doanh nghiệp đã tồn tại",
    ["Admin_LoaiDoanhNghiep_001"]: "Mã loại doanh nghiệp bắt buộc",
    ["Admin_LoaiDoanhNghiep_002"]: "Tên loại doanh nghiệp bắt buộc",
    ["Admin_LoaiDoanhNghiep_003"]: "Loại doanh nghiệp không tồn tại",
    //SITC
    ["Admin_SITC_000"]: "Mã SITC đã tồn tại",
    ["Admin_SITC_001"]: "Mã SITC bắt buộc",
    ["Admin_SITC_002"]: "Tên bắt buộc",
    ["Admin_SITC_003"]: "Cấp bắt buộc",
    ["Admin_SITC_004"]: "ID cha không hợp lệ",
    ["Admin_SITC_005"]: "Không thể xóa vì SITC đang được sử dụng",
    //Loại tỷ giá tiền tệ
    ["Admin_LoaiTyGiaTienTe_000"]: "Mã loại tỷ giá tiền tệ đã tồn tại",
    ["Admin_LoaiTyGiaTienTe_001"]:
      "Không thể xóa vì Loai tỷ giá tiền tệ đang được sử dụng",
    //Ngoại tệ
    ["Admin_NgoaiTe_000"]: "Mã ngoai tệ đã tồn tại",
    ["Admin_NgoaiTe_001"]:
      "Không thể xóa vì Danh mục ngoai tệ đang được sử dụng",
    ["Admin_NgoaiTe_002"]: "Loại tỷ giá không tồn tại",
    //Hình thức góp vốn
    ["Admin_HinhThucGopVon_000"]: "Không tìm thấy đơn vị tính",
    ["Admin_HinhThucGopVon_001"]: "Không tìm thấy ngoại tệ",
    //Loại vốn đầu tư
    ["Admin_LoaiVonDauTu_000"]: "Mã loại vốn đầu tư đã tồn tại",
    ["Admin_LoaiVonDauTu_001"]:
      "Không thể xóa vì Loại vốn đầu tư đang được sử dụng",
    //Hình thức đầu tư
    ["Admin_HinhThucDauTu_000"]: "Mã hình thức đầu tư đã tồn tại",
    ["Admin_HinhThucDauTu_001"]:
      "Không thể xóa vì Hình thức đầu tư đang được sử dụng",
    //sản phẩn công nghiệp
    ["Admin_SanPhamCongNghiep_000"]: "Mã sản phẩm công nghiệp đã tồn tại",
    ["Admin_SanPhamCongNghiep_001"]: "Đơn vị tính không tồn tại",
    //Phương thức đầu tư
    ["Admin_PhuongThucDauTu_000"]: "Mã phương thức đâu tư đã tồn tại",
    ["Admin_PhuongThucDauTu_001"]:
      "Không thể xóa vì Phương thức đầu tư đang được sử dụng",
    //Phương thức - Hình thức đầu tư
    ["Admin_PhuongThucHinhThuc_000"]:
      "Cặp Phương thức - Hình thức này đã tồn tại",
    ["Admin_PhuongThucHinhThuc_001"]: "Phương thức đầu tư không tồn tại",
    ["Admin_PhuongThucHinhThuc_002"]: "Hình thức đầu tư không tồn tại",
    //Sở KHĐT
    ["Admin_SoKHDT_000"]: "Mã sở KHĐT đã tồn tại",
    ["Admin_SoKHDT_001"]: "Tỉnh/Thành Phố không tồn tại",
    //Đại diện xúc tiến đầu tư
    ["Admin_DaiDienXTDT_000"]: "Mã đại điện xúc tiến đầu tư đã tồn tại",
    //Doanh nghiệp
    ["Admin_DoanhNghiep_001"]: "Mã số thuế đã tồn tại",
    ["Admin_DoanhNghiep_002"]: "Loại doanh nghiệp không tồn tại",
    ["Admin_DoanhNghiep_003"]: "Quốc gia không tồn tại",
    ["Admin_DoanhNghiep_004"]: "Ngành kinh tế không tồn tại",
    ["Admin_DoanhNghiep_005"]: "Đơn vị quản lý không tồn tại",
    ["Admin_DoanhNghiep_006"]: "Vui lòng nhập thông tin Người đại diện",
    ["Admin_DoanhNghiep_007"]: "Tên người đại diện không được để trống",
    ["Admin_DoanhNghiep_008"]: "CCCD/Hộ chiếu không được để trống",
    //Lĩnh vực cấm đầu tư
    ["Admin_LinhVucCamDauTu_000"]: "Mã đã tồn tại",
    ["Admin_LinhVucCamDauTu_001"]: "Không thể xóa vì đang được sử dụng",
    //Công trình xây dựng
    ["Admin_CongTrinhXayDung_000"]: "Mã công trình xây dựng dã tồn tại",
    ["Admin_CongTrinhXayDung_001"]: "Mã công trình xây dựng bắt buộc",
    ["Admin_CongTrinhXayDung_002"]: "Tên công trình xây dựng bắt buộc",
    ["Admin_CongTrinhXayDung_003"]: "Công trình xây dựng không tồn tại",
    //Log hệ thống
    ["Admin_Menu_200"]: "Sai dữ liệu",
    ["Admin_LogHeThong_202"]: "Thiếu dữ liệu",
    ["Admin_menu_206"]: "Vượt mức giá trị cho phép",
    //Auth
    ["Admin_Auth_1721"]: "Sai tài khoản hoặc mật khẩu",
    ["Admin_Auth_1722"]: "Sai tên đăng nhập",
    ["Admin_Auth_1723"]: "Sai mật khẩu",
    ["Admin_Auth_1724"]: "Sai email",
    ["Admin_Auth_1725"]: "Sai dữ liệu",
    ["Admin_Auth_1727"]: "Sai định dạng email",
    ["Admin_Auth_1732"]: "Sai mã thông báo",
    ["Admin_Auth_1733"]: "Thiếu mã cho phép",
    // Tài khoản
    ["Admin_TaiKhoan_101"]: "Bạn chưa nhập đủ dữ liệu đầu vào",
    ["Admin_TaiKhoan_100"]: "Không được nhập kí tự đặc biệt",
    ["Admin_TaiKhoan_102"]: "Tên đăng nhập hoặc mật khẩu quá dài",
    ["Admin_TaiKhoan_103"]: "Tên đăng nhập hoặc mật khẩu phải trên 3 kí tự",
    ["Admin_TaiKhoan_104"]: "Tên đăng nhập đã tồn tại",

    //Nhân viên
    ["Admin_NhanVien_001"]: "Họ tên là bắt buộc",
    ["Admin_NhanVien_002"]: "Email là bắt buộc",
    ["Admin_NhanVien_003"]: "Email không đúng định dạng",
    ["Admin_NhanVien_004"]: "Độ dài họ tên không hợp lệ",
    ["Admin_NhanVien_005"]: "Giới tính không hợp lệ",
    ["Admin_NhanVien_006"]: "Email đã được sử dụng",
    ["Admin_NhanVien_007"]: "Mã nhân viên đã được sử dụng",
    ["Admin_NhanVien_008"]: "tài khoản đã được sử dụng hoặc không tồn tại",
    ["Admin_NhanVien_009"]: "Nhân viên đã có tài khoản ",
    //Đơn vị
    ["DONVI_MA_REQUIRED"]: "Mã đơn vị bắt buộc nhập",
    ["DONVI_TEN_REQUIRED"]: "Tên đơn vị bắt buộc nhập",
    ["DONVI_MA_EXIST"]: "Mã đơn vị đã tồn tại",
    ["DONVI_TEN_EXIST"]: "Tên đơn vị đã tồn tại",
    ["DONVI_EMAIL_EXIST"]: "Email đã tồn tại",
    ["DONVI_SDT_EXIST"]: "Số điện thoại đã tồn tại",
    ["DONVI_EMAIL_INVALID"]: "Email không hợp lệ",
    ["DONVI_SDT_INVALID"]: "Số điện thoại không hợp lệ",
    ["DONVI_PHONGBAN_INVALID"]: "Phòng ban đơn vị không hợp lệ",
    ["DONVI_FAX_INVALID"]: "Fax không hợp lệ",
    ["DONVI_PARENT_NOT_FOUND"]: "Đơn vị cha không tồn tại",
    ["DONVI_PARENT_CANNOT_BE_SELF"]:
      "Không được chọn chính mình làm đơn vị cha",
    ["DONVI_PARENT_CANNOT_BE_CHILD"]: "Không được chọn đơn vị con làm cha",
    ["Admin_DonVI_08"]: "Đơn vị không hợp lệ",
    ["Admin_DonVi_001"]: "Mã đơn vị đã tồn tại",
    ["Admin_DonVi_002"]: "Tên đơn vị đã tồn tại",
    ["Admin_DonVi_003"]: "Email đơn vị đã tồn tại",
    ["Admin_DonVi_004"]: "Giá trị vượt quá giới hạn",
    ["Admin_DonVi_005"]: "Số điện thoại đơn vị đã tồn tại",
    ["Admin_DonVi_006"]: "Dữ liệu không hợp lệ",
    ["Admin_DonVi_007"]: "Đơn vị cha không tồn tại",
    ["Admin_DonVi_008"]: "Không được chọn chính đơn vị làm đơn vị cha",
    ["Admin_DonVi_009"]:
      "Không được chọn đơn vị con làm đơn vị cha (tránh vòng lặp)",
    ["Admin_DonVi_010"]: "Nhân viên chưa thuộc đơn vị nào",
    ["Admin_DonVi_011"]: "Nhân viên đã thuộc đơn vị khác",
    ["Admin_DonVi_012"]: "Đơn vị không tồn tại",
    ["Admin_DonVi_013"]: "Danh sách nhân viên rỗng",
    ["Admin_DonVi_014"]: "Danh sách nhân viên không tồn tại",
    ["Admin_DonVi_015"]: "Đơn vị còn các đơn vị con",
    ["Admin_DonVi_016"]: "Đơn vị có các nhân viên",
    //Chức vụ
    ["Admin_ChucVu_000"]: "Mã chức đã tồn tại",
    ["Admin_ChucVu_001"]: "Tên chức bắt buộc",
    ["Admin_ChucVu_002"]: "Mã chức bắt buộc",
    ["Admin_ChucVu_003"]: "Mã chức đã tồn tại",
    ["Admin_ChucVu_004"]: "Chức vụ không hợp lệ",
    //Menu
    ["Admin_Menu_600"]: "Sai dữ liệu",
    ["Admin_Menu_602"]: "Thiếu dữ liệu",
    ["Admin_Menu_605"]: "Sai đường dẫn",
    ["Admin_Menu_606"]: "Vượt mức giá trị cho phép",
    ["Admin_Menu_609"]: "Menu đã tồn tại",
    ["Admin_Menu_611"]: "Còn menu con",
    ["Admin_Menu_612"]: "Menu cha không tồn tại",
    // NhomQuyen
    ["Admin_NhomQuyen_700"]: "Sai dữ liệu",
    ["Admin_NhomQuyen_702"]: "Thiếu dữ liệu",
    ["Admin_NhomQuyen_703"]: "Đã trùng mã",
    ["Admin_NhomQuyen_704"]: "Đã tồn tại",
    ["Admin_NhomQuyen_706"]: "Vượt mức giá trị cho phép",
    ["Admin_NhomQuyen_707"]: "Tạo thất bại",
    ["Admin_NhomQuyen_708"]: "Cập nhật thất bại",
    //Vai trò
    ["Admin_VaiTro_400"]: "Sai dữ liệu",
    ["Admin_VaiTro_401"]: "Thiếu tham số",
    ["Admin_VaiTro_404"]: "Không tìm thấy",
    ["Admin_VaiTro_409"]: "Mã vai trò đã tồn tại",
    ["Admin_VaiTro_411"]: "Không thẻ xóa vì Vai trò đang được sử dụng",
    ["Admin_VaiTro_500"]: "Đã có lỗi xảy ra",
    //Thao tác
    ["Admin_Menu_702"]: "Thiếu dữ liệu",
    ["Admin_ThaoTac_700"]: "Sai dữ liệu",
    ["Admin_menu_706"]: "Vượt mức giá trị cho phép",
    ["Admin_ThaoTac_709"]: "Đã tồn tại",
    //Cấu hình hệ thống
    ["Admin_CauHinhHeThong_001"]: "Mã đã được sử dụng",
    ["Admin_CauHinhHeThong_002"]: "Tên quá dài",
    ["Admin_CauHinhHeThong_003"]: "Giá trị quá dài",
    ["Admin_CauHinhHeThong_004"]: "Mô tả quá dài",
    ["Admin_CauHinhHeThong_005"]: "ID không hợp lệ",
    ["Admin_CauHinhHeThong_006"]: "Sai dữ liệu",
    ["Admin_CauHinhHeThong_007"]: "Tên không đúng định dạng",
    ["Admin_CauHinhHeThong_008"]: "Mã quá dài",
    ["Admin_CauHinhHeThong_009"]: "Phạm Vi Áp Dụng Không Tồn Tại",
    //Tham số hệ thống
    ["Admin_ThamSoHeThong_000"]: "Sai dữ liệu",
    ["Admin_ThamSoHeThong_001"]: "Mã đã được sử dụng",
    ["Admin_ThamSoHeThong_003"]: "Mã không đúng định dạng",
    ["Admin_ThamSoHeThong_004"]: "Mã quá dài",
    ["Admin_ThamSoHeThong_005"]: "Tên không đúng định dạng",
    ["Admin_ThamSoHeThong_006"]: "Tên quá dài",
    ["Admin_ThamSoHeThong_007"]: "Giá trị quá dài",
    ["Admin_ThamSoHeThong_008"]: "Mô tả không đúng định dạng",
    //Nhóm người dùng
    ["Admin_NhomNguoiDung_001"]: "Quyền không tồn tại",
    ["Admin_NhomNguoiDung_002"]: "Tên nhóm đã tồn tại",
    ["Admin_NhomNguoiDung_003"]: "Danh sách quyền bị rỗng (Bad Request)",
    ["Admin_NhomNguoiDung_004"]: "Mã nhóm bắt buộc",
    ["Admin_NhomNguoiDung_005"]: "Mã nhóm quá dài",
    ["Admin_NhomNguoiDung_006"]: "Tên nhóm bắt buộc",
    ["Admin_NhomNguoiDung_007"]: "Tên nhóm quá dài",
    ["Admin_NhomNguoiDung_008"]: "Mô tả nhóm quá dài",
    //Giấy tờ hồ sơ
    ["GiayToHoSo_404"]: "Không tìm thấy hồ sơ",
    //Thông tin người nộp
    ["TiepNhanHoSo_ThongTinNguoiNop_400"]: "Sai dữ liệu",
    ["TiepNhanHoSo_CN_TEN_001"]: "Tên người nộp không được để trống",
    ["TiepNhanHoSo_CN_CCCD_002"]: "Số CCCD không được để trống",
    ["TiepNhanHoSo_CN_NGAYCAP_003"]: "Ngày cấp bắt buộc",
    ["TiepNhanHoSo_CN_NOICAP_004"]: "Nơi cấp bắt buộc",
    ["TiepNhanHoSo_CN_SDT_005"]: "Số điện thoại không được để trống",
    ["TiepNhanHoSo_CN_EMAIL_006"]: "Email không được để trống",
    ["TiepNhanHoSo_CN_DIACHI_007"]: "Địa chỉ không được để trống",
    ["TiepNhanHoSo_TC_TEN_011"]: "Tên tổ chức không được để trống",
    ["TiepNhanHoSo_TC_MA_012"]: "Mã tổ chức không được để trống",
    ["TiepNhanHoSo_TC_NGAYCAP_013"]: "Ngày cấp bắt buộc",
    ["TiepNhanHoSo_TC_NOICAP_014"]: "Nơi cấp bắt buộc",
    ["TiepNhanHoSo_TC_EMAIL_015"]: "Email tổ chức không được để trống",
    ["TiepNhanHoSo_TC_DIACHI_016"]: "Đia chỉ tổ chức không được để trống",
    //Xử lý hồ sơ
    //Upload
    ["External_Upload_1681"]: "Sai dữ liệu",
    ["External_Upload_1683"]: "Thiếu extension",
    ["External_Upload_1684"]: "Sai extension",
    ["External_Upload_1685"]: "Dung lượng file quá lớn",
    ["External_Upload_1686"]: "Tên file không được chứa ký tự đặc biệt",
    ["External_Upload_1687"]: "File không tồn tại hoặc không truy cập được",
    ["External_Upload_1688"]: "Sai đường dẫn",
    ["External_Upload_1689"]: "Chỉ được sử dụng 1 phương thức tại thời điểm",
    //Password
    ["External_PsH_2891"]: "Sai dữ liệu",
    ["External_PsH_2892"]: "Sai định dạng",
    ["External_Psh_2893"]: "Xác thực thất bại",
    //Time convertor
    ["External_TC_3991"]: "Sai dữ liệu",
    ["External_TC_3992"]: "Sai định dạng tổng thể",
    ["External_TC_3993"]: "Không hỗ trợ định dạng đơn vị",
    //Loại hình giáo dục
    ["Admin_LoaiHinhGiaoDuc_000"]: "Mã đã tồn tại",
    ["Admin_LoaiHinhGiaoDuc_001"]: "Không thể xóa vì đang được sử dụng",
    //EBOPS
    ["Admin_EBOPS_000"]: "Mã EBOPS đã tồn tại",
    ["Admin_EBOPS_001"]: "EBOPS cha không tồn tại",
    ["Admin_EBOPS_002"]: "EBOPS cha không hợp lệ (trỏ vào chính nó)",
    ["Admin_EBOPS_003"]: "Phát hiện vòng lặp trong cây EBOPS",
    ["Admin_EBOPS_004"]: "Không thể xóa vì tồn tại cấp con",
    //Dịch vụ XNK
    ["Admin_DichVuXNK_000"]: "Mã đã tồn tại",
    ["Admin_DichVuXNK_001"]: "Cấp cha không tồn tại",
    ["Admin_DichVuXNK_002"]: "Cấp cha không hợp lệ (trỏ vào chính nó)",
    ["Admin_DichVuXNK_003"]: "Phát hiện vòng lặp trong cây",
    ["Admin_DichVuXNK_004"]: "Không thể xóa vì tồn tại cấp con",
    ["Admin_DichVuXNK_005"]: "EBOPS không tồn tại",
    //Hệ thống NSP
    ["dm_HeThongNSP_001"]: "Mã đã tồn tại",
    ["dm_HeThongNSP_002"]: "Cấp cha không tồn tại",
    ["dm_HeThongNSP_003"]: "Không thể set cấp cha cho chính nó",
    ["dm_HeThongNSP_004"]: "Không thể xóa bản ghi khi có dữ liệu con",
    ["dm_HeThongNSP_005"]: "Phát hiện tham chiếu vòng trong cấu trúc cây",
    //Hàng hóa XNK
    ["dm_HangHoaXNK_001"]: "Mã đã tồn tại",
    ["dm_HangHoaXNK_002"]: "Mã bắt buộc",
    ["dm_HangHoaXNK_003"]: "Tên bắt buộc",
    ["dm_HangHoaXNK_004"]: "Đơn vị tính bắt buộc",
    ["dm_HangHoaXNK_005"]: "Đơn vị tính không tồn tại",
    ["dm_HangHoaXNK_006"]: "Hàng hóa cha không tồn tại",
    ["dm_HangHoaXNK_007"]: "Không thể set Hàng hóa cha là chính nó",
    ["dm_HangHoaXNK_008"]: "Không thể xóa hàng hóa có dữ liệu con",
    ["dm_HangHoaXNK_009"]: "Phát hiện tham chiếu vòng trong cấu trúc cây",
    //Bộ ngành
    ["dm_BoNganh_001"]: "Mã đã tồn tại",
    //Dân tộc
    ["dm_DanToc_001"]: "Tên đã tồn tại",
    //Khu vực địa lý
    ["dm_KhuVucDiaLy_001"]: "Mã đã tồn tại",
    ["Admin_KhuVucDiaLy_200"]: "Sai dữ liệu", // Giải thích (VI): Mã lỗi 200 - Sai dữ liệu cho quản lý khu vực địa lý
    //Ngành kinh tế
    ["Admin_NganhKinhTe_000"]: "Tên ngành kinh tế đã tồn tại",
    ["Admin_NganhKinhTe_001"]: "Mã ngành kinh tế đã tồn tại",
    ["Admin_NganhKinhTe_002"]: "VSIC đã tồn tại",
    ["Admin_NganhKinhTe_003"]: "Cấp cha không hợp lệ",
    //ISIC
    ["Admin_ISIC_000"]: "Tên ISIC đã tồn tại",
    ["Admin_ISIC_001"]: "Mã ISIC đã tồn tại",
    //Thành phần kinh tế
    ["Admin_ThanhPhanKinhTe_000"]: "Tên thành phần kinh tế đã tồn tại",
    ["Admin_ThanhPhanKinhTe_001"]: "Mã thành phần kinh tế đã tồn tại",
    //Đơn vị tính
    ["Admin_DonViTinh_000"]: "Tên đơn vị tính đã tồn tại",
    ["Admin_DonViTinh_001"]: "Mã đơn vị tính đã tồn tại",
    //Chuyên viên KKT
    ["Admin_ChuyenVienKKT_000"]: "Mã chuyên viên KKT đã tồn tại",
    //Phòng ban KKT
    ["Admin_PhongBanKKT_000"]: "Mã phòng ban KKT đã tồn tại",
    //Khu kinh tế
    ["Admin_KhuKinhTe_000"]: "Mã khu kinh tế đã tồn tại",
    //Chuyên viên Sở KHĐT
    ["Admin_ChuyenVienSoKHDT_000"]: "Mã chuyên viên Sở KHĐT đã tồn tại",
    //Phòng ban Sở KHĐT
    ["Admin_PhongBanSoKHDT_000"]: "Mã phòng ban Sở KHĐT đã tồn tại",
    //Nhà đầu tư
    ["Admin_NhaDauTu_000"]: "Mã nhà đầu tư đã tồn tại",
    ["Admin_NhaDauTu_001"]: "Mã bắt buộc",
    ["Admin_NhaDauTu_002"]: "Tên bắt buộc",
    ["Admin_NhaDauTu_003"]: "Nhà đầu tư không tồn tại",
    //Lĩnh vực ưu đãi
    ["Admin_LinhVucUuDai_000"]: "Mã lĩnh vực ưu đãi đã tồn tại",
    ["Admin_LinhVucUuDai_001"]:
      "Không thể xóa Lĩnh vực ưu đãi vì đang được sử dụng",
    //Quản lý bài viết - Bài viết soạn thảo
    ["BaiVietSoanThao_Common_500"]:
      "Máy chủ lỗi (500): Không thể xử lý yêu cầu, vui lòng thử lại sau",
    ["BaiVietSoanThao_Conmon_404"]: "Không tồn tại",
    ["BaiVietSoanThao_Common_400"]: "Dữ liệu không hợp lệ",

    //Xác thực tài khoản
    ["Admin_CNTC_TaiKhoan_100"]: "Thiếu thông tin tên",

    ["Admin_CNTC_TaiKhoan_101"]: "Thiếu thông tin CCCD/Số hộ chiếu",

    ["Admin_CNTC_TaiKhoan_102"]: "Thiếu thông tin nơi cấp",

    ["Admin_CNTC_TaiKhoan_103"]: "Thiếu thông tin mật khẩu",

    ["Admin_CNTC_TaiKhoan_104"]: "Giá trị tên vượt quá độ dài cho phép",

    ["Admin_CNTC_TaiKhoan_105"]:
      "Giá trị CCCD/Số hộ chiếu vượt quá độ dài cho phép",

    ["Admin_CNTC_TaiKhoan_106"]: "Giá trị nơi cấp vượt quá độ dài cho phép",

    ["Admin_CNTC_TaiKhoan_107"]: "Giá trị mã số thuế vượt quá độ dài cho phép",

    ["Admin_CNTC_TaiKhoan_108"]: "Giá trị mật khẩu vượt quá độ dài cho phép",

    ["Admin_CNTC_TaiKhoan_109"]: "Mật khẩu không hợp lệ (tối thiểu 4 ký tự)",

    ["Admin_CNTC_TaiKhoan_110"]: "Dữ liệu không hợp lệ (Loại tài khoản)",

    ["Admin_CNTC_TaiKhoan_111"]: "Dữ liệu tên không hợp lệ",

    ["Admin_CNTC_TaiKhoan_112"]: "Dữ liệu CCCD/Số hộ chiếu không hợp lệ",

    ["Admin_CNTC_TaiKhoan_113"]: "Dữ liệu nơi cấp không hợp lệ",

    ["Admin_CNTC_TaiKhoan_114"]: "Dữ liệu mã số thuế không hợp lệ",

    ["Admin_CNTC_TaiKhoan_115"]: "Dữ liệu mật khẩu không hợp lệ",

    ["Admin_CNTC_TaiKhoan_116"]: "Dữ liệu CCCD/Số hộ chiếu đã tồn tại",

    ["Admin_CNTC_TaiKhoan_117"]: "Dữ liệu mã số thuế đã tồn tại",

    ["Admin_CNTC_ThongTinTaiKhoan_200"]: "Dữ liệu không hợp lệ",

    ["Admin_CNTC_ThongTinTaiKhoan_201"]: "Thiếu dữ liệu bắt buộc",

    ["Admin_CNTC_ThongTinTaiKhoan_202"]:
      "Giá trị dữ liệu vượt quá giới hạn cho phép",

    ["Admin_CNTC_ThongTinTaiKhoan_205"]: "Email đã tồn tại",

    ["Admin_CNTC_ThongTinTaiKhoan_206"]: "Số điện thoại đã tồn tại",

    ["Admin_CNTC_ThongTinTaiKhoan_211"]: "Email không hợp lệ",

    ["Admin_CNTC_ThongTinTaiKhoan_212"]: "Số điện thoại không hợp lệ",

    ["Admin_CNTC_ThongTinTaiKhoan_220"]: "Thiếu thông tin email",

    ["Admin_CNTC_ThongTinTaiKhoan_221"]: "Thiếu thông tin số điện thoại",

    ["Admin_CNTC_ThongTinTaiKhoan_222"]:
      "Giá trị email vượt quá độ dài cho phép",

    ["Admin_CNTC_ThongTinTaiKhoan_223"]:
      "Giá trị số điện thoại vượt quá độ dài cho phép",
    //Nộp hồ sơ trực tuyến
    ["TiepNhanHoSo_DVC_001"]: "Dịch vụ công không tồn tại",
    ["TiepNhanHoSo_DVTN_002"]: "Đơn vị tiếp nhận không tồn tại",
    ["TiepNhanHoSo_DVXL_003"]: "Đơn vị xử lý không tồn tại",
    ["TiepNhanHoSo_LHS_004"]: "Loại hồ sơ không tồn tại",
    ["TiepNhanHoSo_TTP_005"]: "Tỉnh thành phố không tồn tại",
    ["TiepNhanHoSo_TTHS_006"]: "Tỉnh thành phố hồ sơ không tồn tại",
    ["TiepNhanHoSo_GT_007"]: "Giấy tờ hồ sơ không được để trống",
    ["TiepNhanHoSo_DVTN_008"]: "Đơn vị tiếp nhận là bắt buộc",
    ["TiepNhanHoSo_009"]: "Trạng thái tiếp nhận không hợp lệ",
    ["TiepNhanHoSo_XP_010"]: "Xã phường thị trấn không tồn tại",
    ["TiepNhanHoSo_QBD_011"]: "Thiếu tên người nhận hồ sơ",
    ["TiepNhanHoSo_QBD_012"]: "Thiếu số điện thoại người nhận hồ sơ",
    ["TiepNhanHoSo_QBD_013"]: "Thiếu địa chỉ người nhận hồ sơ",
    ["TiepNhanHoSo_QBD_014"]: "Thiếu email người nhận hồ sơ",
    ["TiepNhanHoSo_QBD_015"]: "Thiếu thông tin người nhận hồ sơ",
    ["TiepNhanHoSo_QBD_016"]: "Căn cước công dân không hợp lệ",

    // Nộp phản ánh kiến nghị
    ["User_PhanAnhKienNghi_000"]: "Số điện thoại không đúng định dạng",
    ["User_PhanAnhKienNghi_001"]: "Email không đúng định dạng",
    ["User_PhanAnhKienNghi_002"]: "Họ và tên cá nhân không được để trống",
    ["User_PhanAnhKienNghi_003"]: "Tên doanh nghiệp/tổ chức không được để trống",
    ["User_PhanAnhKienNghi_004"]: "Người đại diện là bắt buộc",
    ["User_PhanAnhKienNghi_005"]: "Chủ đề phản ánh kiến nghị không hợp lệ",
    ["User_PhanAnhKienNghi_006"]: "Phản ánh kiến nghị không ở trạng thái lưu nháp, không thể cập nhật",
    ["User_PhanAnhKienNghi_007"]: "Thao tác không hợp lệ với trạng thái hiện tại của phản ánh kiến nghị",
    ["User_PhanAnhKienNghi_008"]: "Vui lòng chọn phòng ban tiếp nhận xử lý",
    ["User_PhanAnhKienNghi_009"]: "Vui lòng nhập nội dung yêu cầu bổ sung",
    ["User_PhanAnhKienNghi_010"]: "Vui lòng chọn cán bộ xử lý",
    ["User_PhanAnhKienNghi_011"]: "Vui lòng nhập nội dung trả lời phản ánh kiến nghị",
    ["User_PhanAnhKienNghi_012"]: "Vui lòng chọn phòng ban nhận khi chuyển bộ phận",
    ["User_PhanAnhKienNghi_013"]: "Vui lòng chọn đơn vị khi chuyển sang đơn vị khác",
    ["User_PhanAnhKienNghi_014"]: "Phản ánh kiến nghị đã được nhận xử lý bởi cán bộ khác, bạn không có quyền thực hiện thao tác này",
    ["User_PhanAnhKienNghi_015"]: "Phản ánh kiến nghị không đủ điều kiện để hủy",
    ["User_PhanAnhKienNghi_016"]: "Bạn không có quyền hủy phản ánh kiến nghị này",

    // them
    ["Admin_YeuCauBoSung_005"]: "Hồ sơ đã được yêu cầu bổ sung",
  };
  return { ERROR_CODE_MSG };
};
export default useServerErrorMsg;
