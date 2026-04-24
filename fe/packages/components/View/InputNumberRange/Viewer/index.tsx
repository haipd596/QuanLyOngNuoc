import {
  Form,
  InputNumber,
  Space,
} from 'antd';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import React from 'react';

interface MinMaxInputProps {
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  controlled?: boolean;
  value?: { min: number; max: number };
  onChange?: (values: { min: number; max: number }) => void;
  minLabel?: string;
  maxLabel?: string;
  className?: string;
  errorMessageMin?: string;
  errorMessageMax?: string;
  serverPayloadKeyMax?: string;
  serverPayloadKeyMin?: string;
  inputStyle?: React.CSSProperties;
}

const InputNumberRangeViewer: React.FC<MinMaxInputProps> = ({
  min,
  max,
  step = 1,
  unit = '',
  minLabel,
  maxLabel,
  inputStyle,
  errorMessageMin,
  errorMessageMax,
  serverPayloadKeyMax,
  serverPayloadKeyMin,
}) => {
  const formParent = useFormInstance();

  return (
    <Space>
      <Form.Item
        name={serverPayloadKeyMin}
        label={minLabel || 'Min'}
        rules={[
          ({ getFieldValue }) => ({
            validator(_, val) {
              return (val < (getFieldValue(serverPayloadKeyMax) || max)
                ? (() => {
                  formParent.setFields([
                    {
                      name: serverPayloadKeyMax,
                      errors: [],
                    },
                  ]);
                  return Promise.resolve();
                })()
                : Promise.reject(errorMessageMin || `${minLabel} không được lớn hơn hoặc bằng ${maxLabel}`));
            },
          }),
        ]}
        initialValue={min}
      >
        <InputNumber
          min={Number.MIN_SAFE_INTEGER}
          step={step}
          style={inputStyle}
          formatter={(val) => `${val}${unit}`}
          parser={(val) => parseFloat(val!.replace(unit, ''))}
        />
      </Form.Item>

      <Form.Item
        name={serverPayloadKeyMax}
        label={maxLabel || 'Max'}
        rules={[
          ({ getFieldValue }) => ({
            validator: (_, val) => {
              return (val >= (getFieldValue(serverPayloadKeyMin) || min)
                ? (() => {
                  formParent.setFields([
                    {
                      name: serverPayloadKeyMin,
                      errors: [],
                    },
                  ]);
                  return Promise.resolve();
                })()
                : Promise.reject(errorMessageMax || `${maxLabel} không được nhỏ hơn hoặc bằng ${minLabel}`));
            },
          }),
        ]}
        initialValue={max}
      >
        <InputNumber
          min={min}
          max={Number.MAX_SAFE_INTEGER}
          step={step}
          style={inputStyle}
          formatter={(val) => `${val}${unit}`}
          parser={(val) => parseFloat(val!.replace(unit, ''))}
        />
      </Form.Item>
    </Space>
  );
};

export default InputNumberRangeViewer;
