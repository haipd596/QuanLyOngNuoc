export interface IProvince {
  id: number;
  ma: string;
  ten: string;
  hoatDong: boolean;
  vungMien: string;
  kieu: string;
  maDienThoai: number;
  maBuuChinh: number;
}

export interface IWardProvinceRef {
  id: number;
  ten: string;
}

export interface IWard {
  id: number;
  ma: string;
  ten: string;
  hoatDong: boolean;
  kieuXaPhuong: string;
  tinhThanh: IWardProvinceRef;
}
