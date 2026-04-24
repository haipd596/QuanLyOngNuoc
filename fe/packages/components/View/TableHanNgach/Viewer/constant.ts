import { randomString } from '@packages/utils/radomString';
import { InputNumber } from 'antd';

export const getRecentYear = (): string[] => {
  return [new Date().getFullYear().toString()];
};

export const YEAR_COLUMNS = getRecentYear();

export const CHILD_COLUMNS = [
  {
    title: 'table_529_amount_kg',
    baseDataIndex: 'luong_kg',
    component: InputNumber,
  },
  {
    title: 'table_529_amount_ton',
    baseDataIndex: 'luong_tan_co2',
  },
];

export const INIT_COLUMNS_TABLE_HAN_NGACH: DataTypeColumnTableHanNgach[] = [
  {
    name: 'table_529_content_1',
    isGroupTitle: true,
    refKey: 'group_0',
    stt: 0,
    key: randomString(10),
  },
  // {
  //   name: '',
  //   isSumRow: true,
  //   refKey: 'group_0',
  //   key: randomString(10),
  // },
  {
    key: randomString(10),
    name: '',
    refKey: 'group_0',
    luong_tan_co2_year_1: null,
    luong_tan_co2_adjustment_1: null,
    adjustment: null,
    luong_kg_year_0: null,
    luong_kg_adjustment_0: null,
    dieuChinhBoSung: '',
  },
  {
    name: 'table_529_content_2',
    isGroupTitle: true,
    refKey: 'group_1',
    stt: 1,
    key: randomString(10),
  },
  // {
  //   name: '',
  //   refKey: 'group_1',
  //   isSumRow: true,
  //   key: randomString(10),
  // },
  {
    key: randomString(10),
    name: '',
    refKey: 'group_1',
    luong_tan_co2_year_1: null,
    luong_tan_co2_adjustment_1: null,
    adjustment: null,
    luong_kg_year_0: null,
    luong_kg_adjustment_0: null,
    dieuChinhBoSung: '',
  },
];

export interface DataTypeColumnTableHanNgach {
  key: string;
  name: string,
  isGroupTitle?: boolean,
  stt?: number
  refKey: string,
  isSumRow?: boolean,
  dieuChinhBoSung?: string
  adjustment?: any,
  luong_tan_co2_year_1?: any,
  luong_tan_co2_adjustment_1?: any,
  luong_kg_year_0?: any,
  luong_kg_adjustment_0?: any,
}

const getYearDataIndex = (_baseDataIndex: string, index: number) => `${_baseDataIndex}_year_${index}`;

const getAdjustmentDataIndex = (_baseDataIndex: string, index: number) => `${_baseDataIndex}_adjustment_${index}`;

export const CHILD_COLUMNS_IN_YEAR = CHILD_COLUMNS
  // .concat({
  //   title: 'table_529_total_1',
  //   baseDataIndex: 'tong_tan_co2',
  // })
  .map(({ baseDataIndex, ...item }, index) => {
    return {
      ...item,
      dataIndex: getYearDataIndex(baseDataIndex, index),
      // getAllDataIndex: (() => (
      //   CHILD_COLUMNS_IN_YEAR.map(({ dataIndex }: any) => dataIndex)
      key: getYearDataIndex(baseDataIndex, index),

    };
  });

export const CHILD_COLUMNS_ADJUSTMENT = CHILD_COLUMNS
  // .concat({
  //   title: 'table_529_total_2',
  //   baseDataIndex: 'tong_tan_co2',
  // })
  .map(({ baseDataIndex, ...item }, index) => {
    return {
      ...item,
      dataIndex: getAdjustmentDataIndex(baseDataIndex, index),
      // getAllDataIndex: (() => (
      //   CHILD_COLUMNS_ADJUSTMENT.map(({ dataIndex }) => dataIndex)
      key: getAdjustmentDataIndex(baseDataIndex, index),
    };
  });

export const getAllDataIndexes = (data: any) => data.map(({ dataIndex }: any) => dataIndex);
