import { PickerLocale } from 'antd/es/date-picker/generatePicker';
import locale from 'antd/es/date-picker/locale/vi_VN';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/vi';

import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const configLocale: PickerLocale = {
  ...locale,
  lang: {
    ...locale.lang,
    shortWeekDays: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    shortMonths: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
  },
};

export const disabledDatedFromCurrentDay = (current: Dayjs) => current.isAfter(dayjs().subtract(0, 'day'));
export const disabledDatedGreaterThanFromCurrentDay = (current: Dayjs) => current.isBefore(dayjs().subtract(1, 'day'));

export const disabledDatedFromCurrentYear = (current: Dayjs) => current.isAfter(dayjs().subtract(0, 'year'));
export const disabledDatedGreaterThanFromCurrentYear = (current: Dayjs) => current.isBefore(dayjs().subtract(1, 'year'));
