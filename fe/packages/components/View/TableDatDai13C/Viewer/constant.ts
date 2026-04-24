interface AnyThing {
  [x: string]: any
}

export interface DataTypeTable13C extends AnyThing {
  title?: string,
  key: string;
  name: string;
  isGroupTitle?: boolean;
  isContent?: boolean;
  cungCap?: boolean;
  namHoacKy?: string;
  huyenTinh?: string;
  vung?: string;
  caNuoc?: boolean;
  soLuong?: number;
  isOtherInfo?:boolean;
  stt?: number | string; // Có thể là số hoặc chuỗi để hỗ trợ số La Mã
  refKey?: string;
  thongtinkhac?: string;
}

export const COLUMNS_DATA_INDEX_13C = {
  STT: 'stt',
  NAME: 'name',
  MA_HS: 'maHs',
  THONG_TIN_KHAC: 'thongtinkhac',
  CUNG_CAP: 'cungCap',
  NAM_HOAC_KY: 'namHoacKy',
  HUYEN_TINH: 'huyenTinh',
  VUNG: 'vung',
  CA_NUOC: 'caNuoc',
  SO_LUONG: 'soLuong',
};

export const sharedOnCell = ({ isGroupTitle }: DataTypeTable13C) => {
  if (isGroupTitle) {
    return { colSpan: 0 };
  }

  return {};
};
// export const getRecentYear = (): string[] => {
//   return [new Date().getFullYear().toString()];
// };

// export const YEAR_COLUMNS = getRecentYear();

// Hàm chuyển đổi số sang số La Mã
const convertToRoman = (num: number) => {
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

  return romanNumerals[num - 1] || num.toString();
};

// Dữ liệu cho bảng
export const TABLE_DATA_DAT_DAI_13C: DataTypeTable13C[] = [
  {
    key: '1',
    name: 'I. Thông tin, dữ liệu về quy hoạch sử dụng đất',
    isGroupTitle: true,
    isOtherInfo: false,
    stt: convertToRoman(1),
    refKey: 'group_1',
  },
  {
    key: '1.1',
    name: 'Bản đồ quy hoạch sử dụng đất',
    stt: 1,
    isContent: true,
    cungCap: false,
    namHoacKy: '',
    huyenTinh: '',
    vung: '',
    caNuoc: false,
    soLuong: 0,
  },
  {
    key: '1.2',
    name: 'Dữ liệu không gian quy hoạch sử dụng đất',
    stt: 2,
    isContent: true,
    cungCap: false,
    namHoacKy: '',
    huyenTinh: '',
    vung: '',
    caNuoc: false,
    soLuong: 0,
  },
  {
    key: '1.3',
    name: 'Bộ tài liệu quy hoạch sử dụng đất (dạng file PDF)',
    stt: 3,
    isContent: true,
    cungCap: false,
    namHoacKy: '',
    huyenTinh: '',
    vung: '',
    caNuoc: false,
    soLuong: 0,
  },
  {
    key: '1.4',
    name: 'Bộ số liệu quy hoạch sử dụng đất',
    stt: 4,
    isContent: true,
    cungCap: false,
    namHoacKy: '',
    huyenTinh: '',
    vung: '',
    caNuoc: false,
    soLuong: 0,
  },
  {
    key: '1.5',
    name: 'Bản đồ điều chỉnh quy hoạch sử dụng đất',
    stt: 5,
    isContent: true,
    cungCap: false,
    namHoacKy: '',
    huyenTinh: '',
    vung: '',
    caNuoc: false,
    soLuong: 0,
  },
  {
    key: '1.6',
    name: 'Dữ liệu không gian điều chỉnh quy hoạch sử dụng đất',
    stt: 6,
    isContent: true,
    cungCap: false,
    namHoacKy: '',
    huyenTinh: '',
    vung: '',
    caNuoc: false,
    soLuong: 0,
  },
  {
    key: '1.7',
    name: 'Bộ tài liệu điều chỉnh quy hoạch sử dụng đất (dạng file PDF)',
    stt: 7,
    isContent: true,
    cungCap: false,
    namHoacKy: '',
    huyenTinh: '',
    vung: '',
    caNuoc: false,
    soLuong: 0,
  },
  {
    key: '1.8',
    name: 'Bộ số liệu điều chỉnh quy hoạch sử dụng đất',
    stt: 8,
    isContent: true,
    cungCap: false,
    namHoacKy: '',
    huyenTinh: '',
    vung: '',
    caNuoc: false,
    soLuong: 0,
  },
  {
    key: '2',
    name: 'II. Thông tin, dữ liệu về kế hoạch sử dụng đất',
    isGroupTitle: true,
    isOtherInfo: false,
    stt: convertToRoman(2),
    refKey: 'group_2',
  },
  {
    key: '2.1',
    name: 'Bản đồ kế hoạch sử dụng đất',
    stt: 1,
    isContent: true,
    cungCap: false,
    namHoacKy: '',
    huyenTinh: '',
    vung: '',
    caNuoc: false,
    soLuong: 0,
  },
  {
    key: '2.2',
    name: 'Dữ liệu không gian kế hoạch sử dụng đất',
    stt: 2,
    isContent: true,
    cungCap: false,
    namHoacKy: '',
    huyenTinh: '',
    vung: '',
    caNuoc: false,
    soLuong: 0,
  },
  {
    key: '2.3',
    name: 'Bộ tài liệu kế hoạch sử dụng đất (dạng file PDF)',
    stt: 3,
    isContent: true,
    cungCap: false,
    namHoacKy: '',
    huyenTinh: '',
    vung: '',
    caNuoc: false,
    soLuong: 0,
  },
  {
    key: '2.4',
    name: 'Bộ số liệu kế hoạch sử dụng đất',
    stt: 4,
    isContent: true,
    cungCap: false,
    namHoacKy: '',
    huyenTinh: '',
    vung: '',
    caNuoc: false,
    soLuong: 0,
  },
  {
    // key: '3',
    // name: 'III. Thông tin, dữ liệu khác',
    // isGroupTitle: true,
    // isOtherInfo: true,
    // stt: convertToRoman(3),
    // refKey: 'group_3',
    // thongtinkhac: '',
    // caNuoc: false,
    // soLuong: 0,
    key: '4',
    name: 'III. Thông tin, dữ liệu khác',
    isGroupTitle: true,
    stt: convertToRoman(3),
    refKey: 'group_4',
  },
  {
    key: '4.1',
    name: 'Thông tin khác',
    isGroupTitle: true,
    isOtherInfo: true,
    stt: 1,
    refKey: 'group_4',
    thongtinkhac: '',
    caNuoc: false,
    soLuong: 0,
  },
  // {
  //   key: '3.1',
  //   name: '...',
  //   stt: 1,
  //   thongtinkhac: 'Thông tin khác nếu có',
  // },
];
