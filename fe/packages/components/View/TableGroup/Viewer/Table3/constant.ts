import { randomString } from '@packages/utils/radomString';

export type DataTypeColumnTable3 = {
  key: string;
  name: string,
  stt?: number
  refKey: string,
  isGroupTitle?: boolean,
  yearstart?: any,
  productivity?: any,
  number_of_products?: any,
  substance_name?: any,
  frequency?: any,
  amount_substance?: any,
  // otherinfo?: string,
};

export const getRecentYear = (): string[] => {
  const currentYear = new Date().getFullYear().toString();

  return [currentYear];
};

export const YEAR_COLUMNS_3 = getRecentYear();

export const INIT_COLUMNS_TABLE3: DataTypeColumnTable3[] = [
  {
    name: 'table_1.3_content_1',
    refKey: 'group_0',
    stt: 0,
    isGroupTitle: true,
    key: randomString(10),
  },
  {
    key: randomString(10),
    name: '',
    refKey: 'group_0',
    yearstart: null,
    productivity: null,
    number_of_products: null,
    substance_name: null,
    frequency: null,
    amount_substance: null,
    // otherinfo: '',
  },
  {
    name: 'table_1.3_content_2',
    refKey: 'group_1',
    stt: 1,
    key: randomString(10),
    isGroupTitle: true,
  },
  {
    key: randomString(10),
    name: '',
    refKey: 'group_1',
    yearstart: null,
    productivity: null,
    number_of_products: null,
    substance_name: null,
    frequency: null,
    amount_substance: null,
    // otherinfo: '',
  },
];
