import { Input } from 'antd';
import { useWatch } from 'antd/es/form/Form';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import _ from 'lodash';
import { useEffect } from 'react';

type TViewDateProps = any;

const ViewInputWithUploadTextFormat = (props: TViewDateProps) => {
  const { value, onChange, parentName } = props;

  const form = useFormInstance();
  const valueRealValue = useWatch(parentName, form);

  const transformDateValue = (_value: any) => {
    if (!onChange) return;

    if (!_value) {
      onChange('');
      return;
    }

    const { text, fileRes } = _value;

    onChange(`${text} ${_.get(fileRes, 'FileName', '')}`);
  };

  useEffect(() => {
    transformDateValue(valueRealValue);
  }, [valueRealValue]);

  return <Input.TextArea value={value} />;
};

export default ViewInputWithUploadTextFormat;
