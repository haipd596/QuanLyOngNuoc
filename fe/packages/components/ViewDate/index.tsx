import { DATE_FORMAT } from '@packages/constants/date';
import {
  disabledDatedFromCurrentDay,
  disabledDatedFromCurrentYear,
  disabledDatedGreaterThanFromCurrentDay,
  disabledDatedGreaterThanFromCurrentYear,
} from '@packages/utils';
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import React, {
  useMemo,
  // useRef,
  useState,
} from 'react';

export type IOptionsValidated = {
  label: string;
  isShowErrorForDay: boolean;
  isShowErrorForYear: boolean;
  messageError: string;
};
export interface ViewDateProps extends Omit<DatePickerProps, 'onChange' | 'onOK'> {
  placeholder: string;
  typeOfDate: string;
  fieldKey: string;
  onChange: (value: string | null) => void;
  onOk?: (value: DatePickerProps['value']) => void;
  showTime?: boolean;
  isDisabledFromCurrent?: IOptionsValidated;
  isDisabledGreaterThanCurrent?: IOptionsValidated;
}

const ViewDate: React.FC<ViewDateProps> = ({
  placeholder,
  typeOfDate,
  onChange,
  fieldKey,
  showTime = false,
  onOk,
  isDisabledFromCurrent,
  isDisabledGreaterThanCurrent,
  ...rest
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [dateValue, setDateValue] = useState<any>('');
  // const isFirstRenderRef = useRef(true);

  const hanldeOnchange = (value: DatePickerProps['value']) => {
    if (value) {
      const date = dayjs(value);
      setDateValue(date);
      // Validated for day
      if (isDisabledFromCurrent?.isShowErrorForDay && disabledDatedFromCurrentDay(date)) {
        const error = `${isDisabledFromCurrent.label} ${isDisabledFromCurrent.messageError}`;
        setErrorMessage(error);
        return;
      }

      if (
        isDisabledGreaterThanCurrent?.isShowErrorForDay
        && disabledDatedGreaterThanFromCurrentDay(date)
      ) {
        const error = `${isDisabledGreaterThanCurrent.label} ${isDisabledGreaterThanCurrent.messageError}`;
        setErrorMessage(error);
        return;
      }

      // Validated for year
      if (
        isDisabledFromCurrent?.isShowErrorForYear
        && disabledDatedFromCurrentYear(date)
        && typeOfDate === DATE_FORMAT.YYYY
      ) {
        const error = `${isDisabledFromCurrent.label} ${isDisabledFromCurrent.messageError}`;
        setErrorMessage(error);
        return;
      }

      if (
        isDisabledGreaterThanCurrent?.isShowErrorForYear
        && disabledDatedGreaterThanFromCurrentYear(date)
        && typeOfDate === DATE_FORMAT.YYYY
      ) {
        const error = `${isDisabledGreaterThanCurrent.label} ${isDisabledGreaterThanCurrent.messageError}`;
        setErrorMessage(error);
        return;
      }

      if (date.isValid()) {
        setErrorMessage(null);
        // Emit ISO YYYY-MM-DD thay vì typeOfDate để tránh dayjs parse sai ở ViewDatePickerWithVnFormat.
        // Khi typeOfDate = "DD/MM/YYYY", dayjs("03/04/2026") không có format hint sẽ hiểu là M/D/Y
        // dẫn đến DATE_PICKER bị swap tháng/ngày. ISO luôn parse đúng (YYYY-MM-DD unambiguous).
        // DatePicker vẫn hiển thị đúng typeOfDate vì format prop xử lý display riêng.
        const isMonthFormat = typeOfDate === DATE_FORMAT.MM_YYYY || typeOfDate === DATE_FORMAT.MM_YYYY_DASH;
        const finalValue = typeOfDate === DATE_FORMAT.YYYY
          ? date.format(DATE_FORMAT.YYYY)
          : isMonthFormat
            ? date.format('YYYY-MM')
            : date.format(DATE_FORMAT.YYYY_MM_DD);

        onChange(finalValue);
      } else {
        console.error('Invalid date');
      }
    } else {
      onChange(null);
    }
  };

  const value = useMemo(() => {
    const _value = dateValue || dayjs(rest.value);

    if (_value?.isValid()) {
      // init data on first change
      // if (isFirstRenderRef.current) {
      //   hanldeOnchange(_value);
      //   isFirstRenderRef.current = false;
      // }
      return _value;
    }

    return null;
  }, [rest.value, dateValue]);

  const disabledDate = useMemo<DatePickerProps['disabledDate']>(() => {
    if (isDisabledFromCurrent?.isShowErrorForDay) {
      // Chặn ngày > hôm nay (chỉ chọn được hôm nay trở về trước)
      return (current) => current.isAfter(dayjs(), 'day');
    }
    if (isDisabledGreaterThanCurrent?.isShowErrorForDay) {
      // Chặn ngày < hôm nay (chỉ chọn được hôm nay trở về sau)
      return (current) => current.isBefore(dayjs(), 'day');
    }
    const isMonthPicker = typeOfDate === DATE_FORMAT.MM_YYYY || typeOfDate === DATE_FORMAT.MM_YYYY_DASH;
    if (isDisabledFromCurrent?.isShowErrorForYear && typeOfDate === DATE_FORMAT.YYYY) {
      // Chặn năm > năm hiện tại
      return (current) => current.isAfter(dayjs(), 'year');
    }
    if (isDisabledGreaterThanCurrent?.isShowErrorForYear && typeOfDate === DATE_FORMAT.YYYY) {
      // Chặn năm < năm hiện tại
      return (current) => current.isBefore(dayjs(), 'year');
    }
    if (isDisabledFromCurrent?.isShowErrorForDay && isMonthPicker) {
      // Chặn tháng > tháng hiện tại
      return (current) => current.isAfter(dayjs(), 'month');
    }
    if (isDisabledGreaterThanCurrent?.isShowErrorForDay && isMonthPicker) {
      // Chặn tháng < tháng hiện tại
      return (current) => current.isBefore(dayjs(), 'month');
    }
    return undefined;
  }, [isDisabledFromCurrent, isDisabledGreaterThanCurrent, typeOfDate]);

  return (
    <>
      <DatePicker
        {...rest}
        placeholder={placeholder}
        format={typeOfDate}
        picker={
          typeOfDate === DATE_FORMAT.YYYY
            ? 'year'
            : (typeOfDate === DATE_FORMAT.MM_YYYY || typeOfDate === DATE_FORMAT.MM_YYYY_DASH)
              ? 'month'
              : 'date'
        }
        onChange={hanldeOnchange}
        value={value}
        showTime={showTime}
        onOk={onOk}
        disabledDate={disabledDate}
        style={{ width: '100%' }}
        className="theme-dvc"
        status={errorMessage ? 'error' : ''}
      />
      {errorMessage && <div style={{ color: 'red', fontSize: 14, marginTop: 2 }}>{errorMessage}</div>}
    </>
  );
};

export default ViewDate;
