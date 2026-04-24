import { AnyObject } from 'antd/es/_util/type';
import dayjs from 'dayjs';
import _ from 'lodash';

import { DATE_FORMAT } from '@packages/constants/date';

export const formatData = (data: AnyObject) => {
  if (_.isObject(data)) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(data)) {
      if (dayjs(value as string).isValid() && typeof value === 'object') {
        data[key] = dayjs(value as any).format(DATE_FORMAT.DD_MM_YYYY);
      } else {
        data[key] = value;
      }
    }
    return data;
  }
  return null;
};

/**
 * Datepicker is specical field
 * The value must format by ISO but we need fill in word file, so need create two field
 * originalName is field name was sent to server => create word file
 * the output `${originName}_value` use to fill data to form
 * @param originName
 * @returns
 */
export const buildDisplayForHiddenField = (originName: string) => {
  return `${originName}_value`;
};
