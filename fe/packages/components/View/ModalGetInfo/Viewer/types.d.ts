export interface IInfoOrganization {
  CAPITAL_AMOUNT: number
  DiaChiTruSoChinh: DiaChiTruSoChinh
  ENTERPRISE_GDT_CODE: string
  ENTERPRISE_ID: number
  ENTERPRISE_STATUS: string
  ENTERPRISE_TYPE_ID: string
  ENTERPRISE_TYPE_NAME: string
  FOUNDING_DATE: string
  IMP_BUSINESS_CODE: string
  LAST_AMEND_DATE: string
  LEGAL_NAMES: string
  NAME: string
  NAME_F: string
  NUMBER_CHANGES: number
  SHORT_NAME: string
  businessActivity: BusinessActivity
  member: Member
  AddressFullText: string
}

export interface DiaChiTruSoChinh {
  AddressFullText: string
  CityID: number
  CityName: string
  DistrictID: number
  DistrictName: string
  StreetNumber: string
  WardID: number
  WardName: string
}

export interface BusinessActivity {
  CODE: string
  IS_MAIN: string
  NAME: string
}

export interface Member {
  AMOUNT: number
  COUNTRY: string
  DataCount: number
  MEMBER_NAME: string
  Message: string
  RATIO_PERCENT: number
  Status: string
}

export interface IInfoPerson {
  CongDan: CongDan
  GhiChu: string
  Id: string
  SoCongDan: string
  ThoiDiemDuLieu: string
}

export interface CongDan {
  Cha: Cha
  ChuHo: any
  DanToc: DanToc
  GioiTinh: number
  HoVaTen: HoVaTen2
  Me: Me
  NgayThangNamSinh: NgayThangNamSinh
  NguoiDaiDien: any
  NhomMau: string
  NoiDangKyKhaiSinh: NoiDangKyKhaiSinh
  NoiOHienTai: NoiOhienTai
  QueQuan: QueQuan
  SoCMND: string
  SoDinhDanh: string
  ThuongTru: ThuongTru
  TinhTrangHonNhan: number
  TonGiao: TonGiao
  TrangThaiCongDan: any
  VoChong: string
}

export interface Cha {
  HoVaTen: HoVaTen
  QuocTich: string
  SoDinhDanh: string
}

export interface HoVaTen {
  ChuDem: string
  Ho: string
  Ten: string
}

export interface DanToc {
  MaDanToc: string
  TenGoiKhac: string
}

export interface HoVaTen2 {
  ChuDem: string
  Ho: string
  Ten: string
}

export interface Me {
  HoVaTen: HoVaTen3
  QuocTich: string
  SoDinhDanh: string
}

export interface HoVaTen3 {
  ChuDem: string
  Ho: string
  Ten: string
}

export interface NgayThangNamSinh {
  NgayThangNam: string
}

export interface NoiDangKyKhaiSinh {
  ChiTiet: string
  MaDonViHanhChinh: string
  QuocGia: string
}

export interface NoiOhienTai {
  ChiTiet: string
  MaDonViHanhChinh: string
  QuocGia: string
}

export interface QueQuan {
  ChiTiet: string
  MaDonViHanhChinh: string
  QuocGia: string
}

export interface ThuongTru {
  ChiTiet: string
  MaDonViHanhChinh: string
  QuocGia: string
}

export interface TonGiao {
  MaTonGiao: string
  TenGoiKhac: string
}

type TModalGetInfoBuiderProps = {
  styleLabelParseFromJsonTree: React.CSSProperties;
  styleWrapperParseFromJsonTree: React.CSSProperties;
  stylesPropsParseFromJsonTree: {
    className: string;
    id: string;
  };
  value: any;
  onChange: any;
};

export type FieldType = {
  ENTERPRISE_ID: string;
  NAME: string;
  ENTERPRISE_GDT_CODE: string;
  IMP_BUSINESS_CODE: string;
  SHORT_NAME: string;
  NAME_F: string;
  ENTERPRISE_TYPE_NAME: string;
  FOUNDING_DATE: string;
  AddressFullText: string;
  CityName: string;
  DistrictName: string;
  ENTERPRISE_STATUS: string;
  WardName: string;
  LEGAL_NAMES: string;
  CAPITAL_AMOUNT: string;
};
