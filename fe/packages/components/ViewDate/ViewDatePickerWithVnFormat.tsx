import { DATE_FORMAT } from '@packages/constants/date';
import { Input } from 'antd';
import { useWatch } from 'antd/es/form/Form';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import dayjs from 'dayjs';
import { useEffect } from 'react';

type TViewDateProps = any;

const ViewDatePickerWithVnFormat = (props: TViewDateProps) => {
  const { value, onChange, parentName, typeOfDate } = props;

  const form = useFormInstance();
  const valueRealValue = useWatch(parentName, form);

  const transformDateValue = (_value: any) => {
    if (!onChange) return;

    if (!_value) {
      onChange('');
      return;
    }

    const fmt = (typeOfDate === DATE_FORMAT.YYYY ? DATE_FORMAT.YYYY : typeOfDate);
    onChange(dayjs(_value).format(fmt));
  };

  useEffect(() => {
    transformDateValue(valueRealValue);
  }, [valueRealValue]);

  return <Input value={value} />;
};

export default ViewDatePickerWithVnFormat;
