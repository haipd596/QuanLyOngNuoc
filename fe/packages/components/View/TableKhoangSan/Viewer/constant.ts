import { randomString } from '@packages/utils/radomString';

export type DataTypeColumnTableKhoangSan = {
  key: string;
  refKey: string,
  isGroupTitle?: boolean,
  stt?: number,
  name: string,
  lowestDepth?: any,
  reserves?: any,
  otherinfo?: string,
  isSumRow?: boolean,
};

export const INIT_COLUMNS_TABLE_KHOANG_SAN: DataTypeColumnTableKhoangSan[] = [
  {
    name: 'Thông tin khoáng sản cấp 121',
    isGroupTitle: true,
    refKey: 'group_0',
    stt: 0,
    key: randomString(10),
  },
  {
    key: randomString(10),
    name: '',
    refKey: 'group_0',
    lowestDepth: 0,
    reserves: 0,
    otherinfo: '',
  },
  {
    name: 'Tổng trữ lượng khoáng sản cấp 121',
    isSumRow: true,
    refKey: 'group_0',
    reserves: 0,
    key: randomString(10),
  },
  {
    name: 'Thông tin khoáng sản cấp 122',
    isGroupTitle: true,
    refKey: 'group_1',
    stt: 1,
    key: randomString(10),
  },
  {
    key: randomString(10),
    name: '',
    refKey: 'group_1',
    lowestDepth: 0,
    reserves: 0,
    otherinfo: '',
  },
  {
    name: 'Tổng trữ lượng khoáng sản cấp 122',
    isSumRow: true,
    reserves: 0,
    refKey: 'group_1',
    key: randomString(10),
  },
  {
    name: 'Tổng trữ lượng khoáng sản cấp 121 và 122',
    isSumRow: true,
    refKey: 'group_2',
    reserves: 0,
    stt: 2,
    key: randomString(10),
  },
];
