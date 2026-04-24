import { randomString } from '@packages/utils/radomString';

export const INIT_COLUMNS_TABLE1: DataTypeColumnTable1[] = [
  {
    name: 'table_1.1_content_1',
    isGroupTitle: true,
    refKey: 'group_0',
    stt: 0,
    key: randomString(10),
  },
  {
    key: randomString(10),
    name: '',
    refKey: 'group_0',
    luong_kg_0: null,
    luong_tan_co2_0: null,
    luong_kg_1: null,
    luong_tan_co2_1: null,
    luong_kg_2: null,
    luong_tan_co2_2: null,
    luong_kg_tb: null,
    luong_tan_co2_tb: null,
    thongtinkhac: '',
  },
  {
    name: 'table_1.1_total',
    isSumRow: true,
    refKey: 'group_0',
    key: randomString(10),
  },
  {
    name: 'table_1.1_content_2',
    isGroupTitle: true,
    refKey: 'group_1',
    stt: 1,
    key: randomString(10),
  },
  {
    key: randomString(10),
    name: '',
    refKey: 'group_1',
    luong_kg_0: null,
    luong_tan_co2_0: null,
    luong_kg_1: null,
    luong_tan_co2_1: null,
    luong_kg_2: null,
    luong_tan_co2_2: null,
    luong_kg_tb: null,
    luong_tan_co2_tb: null,
    thongtinkhac: '',
  },
  {
    name: 'table_1.1_total',
    refKey: 'group_1',
    isSumRow: true,
    key: randomString(10),
  },
  {
    name: 'table_1.1_content_3',
    isGroupTitle: true,
    refKey: 'group_2',
    stt: 2,
    key: randomString(10),
  },
  {
    key: randomString(10),
    name: '',
    refKey: 'group_2',
    luong_kg_0: null,
    luong_tan_co2_0: null,
    luong_kg_1: null,
    luong_tan_co2_1: null,
    luong_kg_2: null,
    luong_tan_co2_2: null,
    luong_kg_tb: null,
    luong_tan_co2_tb: null,
    thongtinkhac: '',
  },
  {
    name: 'table_1.1_total',
    isSumRow: true,
    refKey: 'group_2',
    key: randomString(10),
  },
];

export const TB_POSTFIX_COLUMN = 'tb';
export const getColumnTbDataIndex = (baseDataIndex: string) => `${baseDataIndex}_${TB_POSTFIX_COLUMN}`;

export const TITLE_TRUNG_BINH_BA_NAM = 'Trung bình 3 năm';
export const toFixThree = (num: number) => parseFloat(num.toFixed(3));
export interface DataTypeColumnTable1 {
  key: string;
  name: string,
  isSumRow?: boolean,
  isGroupTitle?: boolean,
  stt?: number
  refKey: string,
  thongtinkhac?: string
  luong_kg_0?: any,
  luong_tan_co2_0?: any,
  luong_kg_1?: any,
  luong_tan_co2_1?: any,
  luong_kg_2?:any,
  luong_tan_co2_2?: any,
  luong_kg_tb?: any,
  luong_tan_co2_tb?: any,
}

const conversionFactors = {
  'Methyl bromide': 0.002,
  'HCFC-22': 1.81,
  'HCFC-123': 0.077,
  'HCFC-142b': 2.31,
  'HCFC-225': 0.122,
  'HCFC-225ca': 0.595,
  'HCFC-225cb': 1.1,
  'HFC-134': 1.43,
  'HFC-134a': 0.353,
  'HFC-143': 1.03,
  'HFC-245fa': 0.794,
  'HFC-365mfc': 3.22,
  'HFC-227ea': 1.34,
  'HFC-236cb': 1.37,
  'HFC-236ea': 9.81,
  'HFC-236fa': 0.693,
  'HFC-245ca': 1.64,
  'HFC-43-10mee': 0.675,
  'HFC-32': 3.5,
  'HFC-125': 4.47,
  'HFC-143a': 0.092,
  'HFC-41': 0.053,
  'HFC-152': 0.124,
  'HFC-152a': 14.8,
  'R-401A': 1.182,
  'R-401B': 1.288,
  'R-404A': 3.922,
  'R-406A': 1.943,
  'R-407A': 2.107,
  'R-407C': 1.774,
  'R-407F': 1.825,
  'R-407H': 1.495,
  'R-408A': 3.152,
  'R-409A': 1.585,
  'R-410A': 2.088,
  'R-415B': 0.546,
  'R-417A': 2.346,
  'R-422A': 3.143,
  'R-422D': 2.729,
  'R-427A': 2.138,
  'R-438A': 2.265,
  'R-448A': 1.387,
  'R-449A': 1.397,
  'R-449B': 1.412,
  'R-450A': 0.605,
  'R-452A': 2.14,
  'R-452B': 0.698,
  'R-454A': 0.239,
  'R-454B': 0.466,
  'R-466A': 0.733,
  'R-507A': 3.985,
  'R-508B': 13.396,
  'R-513A': 0.631,
  'R-513B': 0.596,
};

export function convertToCO2(chemical: keyof typeof conversionFactors, weightInKg: number) {
  if (chemical && typeof weightInKg === 'number') {
    const factor = conversionFactors[chemical];
    if (factor !== undefined) {
      return toFixThree(weightInKg * factor);
    }
  }

  return 0;
}
