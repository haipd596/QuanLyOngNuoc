import { DATE_FORMAT } from '@packages/constants/date';
import dayjs from 'dayjs';
import _ from 'lodash';

export const getInputValues = (
  dataSource: any,
  indexValue: any,
  valueCSDL: any,
  serverPayloadKey: any,
) => {
  // const value = (dataSource as any)[valueCSDL] || (dataSource as any)[indexValue];
  const value = _.get(dataSource, valueCSDL, '') || _.get(dataSource, indexValue, '');

  if (serverPayloadKey === 'NgayCap') {
    if (value) {
      const ddMmYyyyRegex = /^(\d{2})-(\d{2})-(\d{4})$/;
      let dateToParse = value;

      if (ddMmYyyyRegex.test(value)) {
        const [day, month, year] = value.split('-');
        dateToParse = `${month}/${day}/${year}`;
      }

      return dayjs(dateToParse).isValid() ? dayjs(dateToParse).format(DATE_FORMAT.DD_MM_YYYY) : '';
    }
    return '';
    // return value ? dayjs(value).format(DATE_FORMAT.DD_MM_YYYY) : '';
  }

  if (_.isPlainObject(value)) {
    switch (serverPayloadKey) {
      case 'Title':
        return (_.get(value, 'Title', ''));

      case 'ChucVu':
        return (_.get(value, 'ChucVu', ''));

      case 'NguoiDaiDien':
        return (_.get(value, 'HoVaTen', ''));

      default:
        return '';
    }
  }

  return value;
};
