import _ from 'lodash';

const omitData = (data: any) => _.omit(data, ['key', 'refKey', 'isGroupTitle', 'isSumRow', 'isContent', 'isOtherInfo']);

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
  headerData: headerData ?? '' ,
  data: buildData(data),
});

export type TValueTable<T> = {
  data: T,
  years: string[]
};
