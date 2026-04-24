import { DATE_FORMAT } from '@packages/constants/date';
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import './styles.scss';

export type ConfigDatePickerProps = Omit<DatePickerProps, 'onChange' | 'defaultValue'> & {
  defaultValue: string;
  onChange: (value: string) => void;
};

const ConfigDatePicker: React.FC<ConfigDatePickerProps> = ({
  onChange,
  defaultValue,
}) => {
  const handldeChange: DatePickerProps['onChange'] = (date) => {
    // onChange(date.format(DATE_FORMAT.YYYY_MM_DD));
    if (date) {
      onChange(date.format(DATE_FORMAT.YYYY_MM_DD));
    } else {
      onChange('');
    }
  };

  return (
    <DatePicker
      onChange={handldeChange}
      format={DATE_FORMAT.YYYY_MM_DD}
      defaultValue={defaultValue ? dayjs(defaultValue) : undefined}
      className="Custom_datepicker"
    />
  );
};

export default ConfigDatePicker;
