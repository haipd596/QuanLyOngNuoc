// Định nghĩa kiểu dữ liệu cho hàng
export interface ProfitData {
  key: string;          // React Table key
  rowCode: string;      // Mã dòng gửi server (ROW_1, ROW_2, ROW_3)

  sttHienThi: string;
  tenChiTieu: string;

  soTienNgoaiTe: number | null;
  soTienUSD: number | null;
}

export interface NgoaiTe {
  id: number
  ma: string
  ten: string
  tenLoaiTyGia: string
  tyGiaVND: number
  hoatDong: boolean
  daNgonNgu: DaNgonNgu[]
}

export interface DaNgonNgu {
  ghiChu: string
  ngonNgu: string
}