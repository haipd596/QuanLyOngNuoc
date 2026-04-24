import { Input, InputProps } from 'antd';
import React from 'react';
import './styles.scss';

export type ConfigInputProps = Omit<InputProps, 'onChange'> & {
  onChange: (value: string) => void;
};

function ConfigInput(props: ConfigInputProps) {
  const { onChange } = props;

  const handleChange: InputProps['onChange'] = (e) => {
    onChange(e.target.value);
  };

  return <Input {...props} onChange={handleChange} />;
}

export default ConfigInput;
