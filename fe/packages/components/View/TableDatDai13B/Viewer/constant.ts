export interface DataTypeTable13B {
  title?: string,
  key: string;
  name: string;
  isGroupTitle?: boolean;
  isContent?: boolean;
  cungCap?: boolean;
  namHoacKy?: string;
  capDonViHanhChinh?: string;
  huyenTinh?: string;
  vung?: string;
  caNuoc?: boolean;
  soLuong?: number;
  isOtherInfo?:boolean;
  stt?: number | string; // Có thể là số hoặc chuỗi để hỗ trợ số La Mã
  refKey?: string;
  thongtinkhac?: string;
}

export const COLUMNS_DATA_INDEX_13B = {
  STT: 'stt',
  NAME: 'name',
  MA_HS: 'maHs',
  THONG_TIN_KHAC: 'thongtinkhac',
  CUNG_CAP: 'cungCap',
  NAM_HOAC_KY: 'namHoacKy',
  CAP_DON_VI_HANH_CHINH: 'capDonViHanhChinh',
  HUYEN_TINH: 'huyenTinh',
  VUNG: 'vung',
  CA_NUOC: 'caNuoc',
  SO_LUONG: 'soLuong',
};

export const SPEC_ROW_HUYEN_TABLE_13B_INDEX = [
  1, 2, 6, 7, 12,
];

export const sharedOnCell = ({ isGroupTitle }: DataTypeTable13B) => {
  if (isGroupTitle) {
    return { colSpan: 0 };
  }

  return {};
};

export const shareOnCellSpecial = ({
  isGroupTitle,
}: DataTypeTable13B, index: any): any => {
  if (isGroupTitle) {
    return { colSpan: 0 };
  }

  if (SPEC_ROW_HUYEN_TABLE_13B_INDEX.includes(index)) {
    return { colSpan: 0 };
  }

  return { };
};

// Hàm chuyển đổi số sang số La Mã
const convertToRoman = (num: number) => {
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

  return romanNumerals[num - 1] || num.toString();
};

// Dữ liệu cho bảng
export const TABLE_DATA_DAT_DAI_13B: DataTypeTable13B[] = [
  // I. Thông tin, dữ liệu về thống kê đất đai
  {
    key: '1',
    name: 'Title_1',
    isGroupTitle: true,
    stt: convertToRoman(1),
    refKey: 'group_1',
  },
  {
    key: '1.1',
    name: 'Content_1.1',
    stt: 0,
    isContent: true,
    cungCap: false,
    namHoacKy: '',
    capDonViHanhChinh: '',
    // huyenTinh: '',
    // vung: '',
    // caNuoc: false,
    soLuong: 0,
  },
  {
    key: '1.2',
    name: 'Content_1.2',
    stt: 1,
    isContent: true,
    cungCap: false,
    namHoacKy: '',
    capDonViHanhChinh: '',
    // huyenTinh: '',
    // vung: '',
    // caNuoc: false,
    soLuong: 0,
  },

  // II. Thông tin, dữ liệu về kiểm kê đất đai
  {
    key: '2',
    name: 'Title_2',
    isGroupTitle: true,
    stt: convertToRoman(2),
    refKey: 'group_2',
  },
  {
    key: '2.1',
    name: 'Content_2.1',
    stt: 0,
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
    name: 'Content_2.2',
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
    key: '2.3',
    name: 'Content_2.3',
    stt: 2,
    isContent: true,
    cungCap: false,
    namHoacKy: '',
    capDonViHanhChinh: '',
    // huyenTinh: '',
    // vung: '',
    // caNuoc: false,
    soLuong: 0,
  },
  {
    key: '2.4',
    name: 'Content_2.4',
    stt: 3,
    isContent: true,
    cungCap: false,
    namHoacKy: '',
    capDonViHanhChinh: '',
    // huyenTinh: '',
    // vung: '',
    // caNuoc: false,
    soLuong: 0,
  },
  {
    key: '2.5',
    name: 'Content_2.5',
    stt: 4,
    isContent: true,
    cungCap: false,
    namHoacKy: '',
    capDonViHanhChinh: '',
    // huyenTinh: '',
    // vung: '',
    // caNuoc: false,
    soLuong: 0,
  },
  {
    key: '2.6',
    name: 'Content_2.6',
    stt: 5,
    isContent: true,
    cungCap: false,
    namHoacKy: '',
    huyenTinh: '',
    vung: '',
    caNuoc: false,
    soLuong: 0,
  },

  // III. Thông tin, dữ liệu về kiểm kê chuyên đề
  {
    key: '3',
    name: 'Title_3',
    isGroupTitle: true,
    stt: convertToRoman(3),
    refKey: 'group_3',
  },
  {
    key: '3.1',
    name: 'Content_3.1',
    stt: 0,
    isContent: true,
    cungCap: false,
    namHoacKy: '',
    huyenTinh: '',
    vung: '',
    caNuoc: false,
    soLuong: 0,
  },
  {
    key: '3.2',
    name: 'Content_3.2',
    stt: 1,
    isContent: true,
    cungCap: false,
    namHoacKy: '',
    capDonViHanhChinh: '',
    // huyenTinh: '',
    // vung: '',
    // caNuoc: false,
    soLuong: 0,
  },
  {
    key: '3.3',
    name: 'Content_3.3',
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
    key: '3.4',
    name: 'Content_3.4',
    stt: 3,
    isContent: true,
    cungCap: false,
    namHoacKy: '',
    huyenTinh: '',
    vung: '',
    caNuoc: false,
    soLuong: 0,
  },

  // IV. Thông tin, dữ liệu khác
  {
    // key: '4',
    // name: 'Title_4',
    // isGroupTitle: true,
    // isOtherInfo: true,
    // stt: convertToRoman(4),
    // refKey: 'group_4',
    // thongtinkhac: '',
    // caNuoc: false,
    // soLuong: 0,
    key: '4',
    name: 'Title_4',
    isGroupTitle: true,
    stt: convertToRoman(4),
    refKey: 'group_4',
  },
  {
    key: '4.1',
    name: 'Content_4.1',
    isGroupTitle: true,
    isOtherInfo: true,
    stt: 0,
    refKey: 'group_4',
    thongtinkhac: '',
    caNuoc: false,
    soLuong: 0,
  },
  // {
  //   key: '4.1',
  //   name: '...',
  //   stt: 1,
  //   thongtinkhac: 'Thông tin khác nếu có',
  // },
];
