import { DATE_TIME_FORMAT } from '@packages/constants/date';
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import './styles.scss';

export type ConfigDateTimePickerProps = Omit<DatePickerProps, 'onChange' | 'defaultValue'> & {
  defaultValue: string;
  onChange: (value: string) => void;
};

const ConfigDateTimePicker: React.FC<ConfigDateTimePickerProps> = ({
  onChange,
  defaultValue,
}) => {
  const handldeChange: DatePickerProps['onChange'] = (date) => {
    onChange(date.format(DATE_TIME_FORMAT.YYYY_MM_DD_HH_mm_ss));
  };

  return (
    <DatePicker
      onChange={handldeChange}
      format={DATE_TIME_FORMAT.YYYY_MM_DD_HH_mm_ss}
      defaultValue={dayjs(defaultValue)}
      showTime
      className="Custom_datetimepicker"
    />
  );
};

export default ConfigDateTimePicker;
