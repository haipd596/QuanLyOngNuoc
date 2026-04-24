// Định nghĩa kiểu dữ liệu cho hàng
export interface InvestorBorrowData {
  key: string;
  stt?: number;
  tenNhaDauTu: string; 
  
  // Cột: Cho tổ chức kinh tế ở nước ngoài vay
  choVay: number | null;
  
  // Cột: Bảo lãnh cho tổ chức kinh tế ở nước ngoài vay
  baoLanh: number | null;
  
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