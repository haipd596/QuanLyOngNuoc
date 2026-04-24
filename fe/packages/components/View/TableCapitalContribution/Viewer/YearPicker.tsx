import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import React from 'react';

interface YearPickerProps {
  year: string;
  onYearChange: (newYear: number) => void;
}

const YearPicker: React.FC<YearPickerProps> = ({ year, onYearChange }) => {
  return (
    <DatePicker
      picker="year"
      defaultValue={dayjs(year)}
      onChange={(date) => {
        if (date) {
          onYearChange(date.year());
        }
      }}
      variant="filled"
      allowClear={false}
      disabledDate={(currentyear) => {
        return currentyear && currentyear > dayjs().endOf('year');
      }}
    />
  );
};

export default YearPicker;
