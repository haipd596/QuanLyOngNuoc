import { InputNumber } from 'antd';
import _ from 'lodash';

export const CHILD_COLUMNS = [
  {
    title: 'table_1.1_amount_kg',
    baseDataIndex: 'luong_kg',
    component: InputNumber,
  },
  {
    title: 'table_1.1_amount_ton',
    baseDataIndex: 'luong_tan_co2',
  },
];

export const getRecentYears = (): string[] => {
  const currentYear = new Date().getFullYear();

  return [currentYear - 3, currentYear - 2, currentYear - 1].map(String);
};

export const RECENT_YEARS = getRecentYears();

export const YEAR_COLUMNS = RECENT_YEARS.map((year, index) => {
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

export const OPTIONS_CHAT = [
  { value: 'Methyl bromide', label: 'Methyl bromide' },
  { value: 'HCFC-22', label: 'HCFC-22' },
  { value: 'HCFC-123', label: 'HCFC-123' },
  { value: 'HCFC-142b', label: 'HCFC-142b' },
  { value: 'HCFC-225', label: 'HCFC-225' },
  { value: 'HCFC-225ca', label: 'HCFC-225ca' },
  { value: 'HCFC-225cb', label: 'HCFC-225cb' },
  {
    value:
      'Loại khác (Gas lạnh HCFC-21, HCFC-31, HCFC-121, HCFC-122, HCFC-124 và các HCFC khác)',
    label:
      'Loại khác (Gas lạnh HCFC-21, HCFC-31, HCFC-121, HCFC-122, HCFC-124 và các HCFC khác)',
  },
  { value: 'HFC-134', label: 'HFC-134' },
  { value: 'HFC-134a', label: 'HFC-134a' },
  { value: 'HFC-143', label: 'HFC-143' },
  { value: 'HFC-245fa', label: 'HFC-245fa' },
  { value: 'HFC-365mfc', label: 'HFC-365mfc' },
  { value: 'HFC-227ea', label: 'HFC-227ea' },
  { value: 'HFC-236cb', label: 'HFC-236cb' },
  { value: 'HFC-236ea', label: 'HFC-236ea' },
  { value: 'HFC-236fa', label: 'HFC-236fa' },
  { value: 'HFC-245ca', label: 'HFC-245ca' },
  { value: 'HFC-43-10mee', label: 'HFC-43-10mee' },
  { value: 'HFC-32', label: 'HFC-32' },
  { value: 'HFC-125', label: 'HFC-125' },
  { value: 'HFC-143a', label: 'HFC-143a' },
  { value: 'HFC-41', label: 'HFC-41' },
  { value: 'HFC-152', label: 'HFC-152' },
  { value: 'HFC-152a', label: 'HFC-152a' },
  { value: 'HFC-23', label: 'HFC-23' },
  {
    value: 'Loại khác (các chất HFC nguyên chất khác)',
    label: 'Loại khác (các chất HFC nguyên chất khác)',
  },
  { value: 'R-401A', label: 'R-401A' },
  { value: 'R-401B', label: 'R-401B' },
  { value: 'R-404A', label: 'R-404A' },
  { value: 'R-406A', label: 'R-406A' },
  { value: 'R-407A', label: 'R-407A' },
  { value: 'R-407C', label: 'R-407C' },
  { value: 'R-407F', label: 'R-407F' },
  { value: 'R-407H', label: 'R-407H' },
  { value: 'R-408A', label: 'R-408A' },
  { value: 'R-409A', label: 'R-409A' },
  { value: 'R-410A', label: 'R-410A' },
  { value: 'R-415B', label: 'R-415B' },
  { value: 'R-417A', label: 'R-417A' },
  { value: 'R-422A', label: 'R-422A' },
  { value: 'R-422D', label: 'R-422D' },
  { value: 'R-427A', label: 'R-427A' },
  { value: 'R-438A', label: 'R-438A' },
  { value: 'R-448A', label: 'R-448A' },
  { value: 'R-449A', label: 'R-449A' },
  { value: 'R-449B', label: 'R-449B' },
  { value: 'R-450A', label: 'R-450A' },
  { value: 'R-452A', label: 'R-452A' },
  { value: 'R-452B', label: 'R-452B' },
  { value: 'R-454A', label: 'R-454A' },
  { value: 'R-454B', label: 'R-454B' },
  { value: 'R-466A', label: 'R-466A' },
  { value: 'R-507A', label: 'R-507A' },
  { value: 'R-508B', label: 'R-508B' },
  { value: 'R-513A', label: 'R-513A' },
  { value: 'R-513B', label: 'R-513B' },
  {
    value:
      'Loại khác (R-402B, R-403A, R-403B, R-409B, R-411A, R-412A, R-415A, R-416A, R-418A, R-420A, R-509A và các hợp chất HCFC khác)',
    label:
      'Loại khác (R-402B, R-403A, R-403B, R-409B, R-411A, R-412A, R-415A, R-416A, R-418A, R-420A, R-509A và các hợp chất HCFC khác)',
  },
  {
    value:
      'Loại khác (R-508A và các hợp chất chứa HFC-23 có hoặc không chứa perfluorocarbon khác)',
    label:
      'Loại khác (R-508A và các hợp chất chứa HFC-23 có hoặc không chứa perfluorocarbon khác)',
  },
  {
    value:
      'Loại khác (R-407B, R-419A, R-421A, R-421B, R-422B, R-422C, R-423A, R-424A, R-425A, R-426A, R-428A và các hợp chất HFC khác)',
  },
];

const omitData = (data: any) => _.omit(data, ['key', 'refKey', 'isGroupTitle', 'isSumRow', 'isContent', 'isOtherInfo']);

const buildHeaderData = (headerData: any, labelGenerate: (cur: any, index: number) => string) => {
  if (headerData) {
    const objectHeader = headerData.reduce((acc: any, cur: any, index: number) => {
      acc[`nam${index + 1}`] = labelGenerate(cur, index);
      return acc;
    }, {});

    objectHeader['#fields#'] = Object.keys(objectHeader).join('|');

    return [objectHeader];
  }

  return [];
};

const buildData = (data: any) => data.map((item: any) => {
  const omitted = omitData(item);
  if (typeof omitted.stt === 'number') {
    omitted.stt += 1;
  }
  return {
    ...omitted,
    '#fields#': Object.keys(omitted).join('|'),
  };
});

// RESPONSE_FOR_SERVER
export const buildResponseForServer = (header: number, headerData: any, data: any) => ({
  header,
  headerData: buildHeaderData(headerData, (cur) => `Năm ${cur}`),
  data: buildData(data),
});

// RESPONSE_FOR_SERVER_TABLE 3
export const buildResponseForServerTable3 = (header: number, headerData: any, data: any) => ({
  header,
  headerData: buildHeaderData(headerData, (cur) => `Thông tin về hoạt động nạp mới chất được kiểm soát vào thiết bị của năm ${cur}`),
  data: buildData(data),
});

// RESPONSE_FOR_SERVER_TABLE_HAN_NGACH
export const buildResponseForServerTableHanNgach = (
  header: number,
  headerData: any,
  data: any,
) => ({
  header,
  headerData: buildHeaderData(headerData, (cur) => `Hạn ngạch được phân bổ trong năm ${cur}`),
  data: buildData(data),
});

// RESPONSE_FOR_SERVER_TABLE_KHOANG_SAN
export const buildResponseForServerKhoangSan = (header: number, headerData: any, data: any) => ({
  header,
  headerData: buildHeaderData(headerData, (cur) => cur),
  data: buildData(data),
});

export type TValueTable<T> = {
  data: T,
  years: string[]
};
