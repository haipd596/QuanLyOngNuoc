// Định nghĩa kiểu dữ liệu cho hàng
export interface InvestorData {
  key: string;
  stt?: number;
  tenNhaDauTu: string;

  // Tiền (1)
  tienNgoaiTe: number | null;
  tienUsd: number | null;

  // Máy móc (2)
  mayMocNgoaiTe: number | null;
  mayMocUsd: number | null;

  // Tài sản khác (3)
  taiSanKhacNgoaiTe: number | null;
  taiSanKhacUsd: number | null;

  // Tổng (1+2+3)
  tongNgoaiTe: number | null;
  tongUsd: number | null;

  isTotalRow?: boolean;
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