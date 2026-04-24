import type { RadioChangeEvent, RadioGroupProps } from 'antd';
import { Radio, Space } from 'antd';
import { SelectProps } from 'antd/lib';
import React, { useState } from 'react';

export type ConfigRadioProps = Omit<RadioGroupProps, 'onChange' | 'options'> & {
  defaultValue: string;
  onChange: (value: string) => void;
  options: SelectProps['options'];
};

const ConfigRadio: React.FC<ConfigRadioProps> = ({
  defaultValue,
  onChange,
  options,
}) => {
  const [value, setValue] = useState<string>(defaultValue);

  const handleChange = (e: RadioChangeEvent) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (newValue !== value) {
      onChange(e.target.value);
    }
  };

  return (
    <Radio.Group onChange={handleChange} value={value}>
      <Space direction="vertical">
        {options?.map((option) => (
          <Radio value={option.value}>{option.label}</Radio>
        ))}
      </Space>
    </Radio.Group>
  );
};

export default ConfigRadio;
