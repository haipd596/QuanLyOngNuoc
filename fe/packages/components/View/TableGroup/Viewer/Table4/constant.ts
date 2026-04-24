import { randomString } from '@packages/utils/radomString';
import { InputNumber } from 'antd';

export type DataTypeColumnTable4 = {
  key: string;
  name: string,
  stt?: number
  refKey: string,
  isGroupTitle?: boolean,
  luong_tan_co2_0?: any,
  luong_kg_0?: any,
  otherinfo?: string,
};

export const CHILD_COLUMNS = [
  {
    title: 'table_1.4_amount_kg',
    baseDataIndex: 'luong_kg',
    component: InputNumber,
  },
  {
    title: 'table_1.4_amount_ton',
    baseDataIndex: 'luong_tan_co2',
  },
];

export const getRecentYears = (): string[] => {
  const currentYear = new Date().getFullYear().toString();

  return [currentYear];
};

export const RECENT_YEARS = getRecentYears();

export const YEAR_COLUMNS_4 = RECENT_YEARS.map((year, index) => {
  return {
    year,
    children: CHILD_COLUMNS.map(({ baseDataIndex, ...item }) => {
      const getDataIndex = (_baseDataIndex: string) => `${_baseDataIndex}_${index}`;

      return {
        ...item,
        dataIndex: getDataIndex(baseDataIndex),
        getAllDataIndex: () => (
          CHILD_COLUMNS.map(({ baseDataIndex: _baseDataIndex }) => getDataIndex(_baseDataIndex))
        ),
        key: `${baseDataIndex}_${index}`,
      };
    }),
  };
});

export const INIT_COLUMNS_TABLE4: DataTypeColumnTable4[] = [
  {
    name: 'table_1.4_content_1',
    refKey: 'group_0',
    stt: 0,
    isGroupTitle: true,
    key: randomString(10),
  },
  {
    key: randomString(10),
    name: '',
    refKey: 'group_0',
    luong_tan_co2_0: null,
    luong_kg_0: null,
    otherinfo: '',
  },
  {
    name: 'table_1.4_content_2',
    refKey: 'group_1',
    stt: 1,
    key: randomString(10),
    isGroupTitle: true,
  },
  {
    key: randomString(10),
    name: '',
    refKey: 'group_1',
    luong_tan_co2_0: null,
    luong_kg_0: null,
    otherinfo: '',
  },
  {
    name: 'table_1.4_content_3',
    refKey: 'group_2',
    stt: 2,
    key: randomString(10),
    isGroupTitle: true,
  },
  {
    key: randomString(10),
    name: '',
    refKey: 'group_2',
    luong_tan_co2_0: null,
    luong_kg_0: null,
    otherinfo: '',
  },
  {
    name: 'table_1.4_content_4',
    refKey: 'group_3',
    stt: 3,
    key: randomString(10),
    isGroupTitle: true,
  },
  {
    key: randomString(10),
    name: '',
    refKey: 'group_3',
    luong_tan_co2_0: null,
    luong_kg_0: null,
    otherinfo: '',
  },
];
