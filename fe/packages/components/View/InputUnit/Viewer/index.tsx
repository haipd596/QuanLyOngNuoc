import { formManagers } from '@packages/utils/formManager';
import { observableRangPicker } from '@packages/utils/observable';
import {
  Col, Form, InputNumber, Row, Select,
} from 'antd';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import { FormInstance } from 'antd/lib';
import _get from 'lodash/get';
import { useEffect, useRef } from 'react';
import { ViewFieldInputUnitType } from '../type';
import { generateFieldName } from './util';

const { Option } = Select;

const InputUnitViewer: React.FC<ViewFieldInputUnitType> = ({
  options,
  name,
  fields,
  onChange,
  isDisabled,
  fieldKey,
  miniMum,
  maxiMum,
}) => {
  const [form] = Form.useForm();
  const formBase = useFormInstance();
  const ref:any = useRef<FormInstance>(null);

  const field = fields?.find((_field: any) => _field.key === fieldKey);
  const fieldName = field?.formItemPropsAllowConfig?.label?.props?.defaultValue;
  const isRequired = field?.formItemPropsAllowConfig?.rules?.props?.defaultValue[0]?.required;

  const showError = `${fieldName} tối thiểu là ${miniMum.min}, tối đa là ${maxiMum.max} năm`;

  useEffect(() => {
    const currentValue = formBase.getFieldValue(name);

    if (currentValue) {
      const matchResult = `${currentValue}`.match(/(\d+)\(([^)]+)\)/);
      if (matchResult) {
        form.setFieldsValue({
          [generateFieldName(name, 'input')]: matchResult[1],
          [generateFieldName(name, 'select')]: matchResult[2],
        });
      }
    } else {
      const initialValue = {
        [generateFieldName(name, 'input')]: null,
        [generateFieldName(name, 'select')]: _get(options[0], 'value'),
      };

      if (isRequired) {
        onChange?.(null);
      }

      form.setFieldsValue(initialValue);
      onChange?.(`...(${_get(options[0], 'value')})`);
    }
  }, [isRequired, form, options]);

  const handleOnChange = (_: any, values: any) => {
    const inputValue = _get(values, generateFieldName(name, 'input'));
    const selectValue = _get(values, generateFieldName(name, 'select'));

    if (!inputValue && isRequired) {
      onChange?.(null);
      return;
    }

    const concatenatedValue = `${inputValue ?? '...'}(${selectValue})`;
    observableRangPicker.notifyByKey(name, values);
    onChange?.(concatenatedValue);
  };

  const validateInput = ({ getFieldValue }: any) => ({
    validator(_: any, value: any) {
      console.info('🚀 ~ validator ~ value:', value);
      const inputValue = getFieldValue(generateFieldName(name, 'input'));

      // if (!value || !inputValue) return Promise.resolve();
      if (inputValue === undefined || inputValue === null) {
        return Promise.resolve();
      }

      if (miniMum.min != null && maxiMum.max != null) {
        if (inputValue < miniMum.min || inputValue > maxiMum.max) {
          return Promise.reject(new Error(showError));
        }
      }

      return Promise.resolve();
    },
  });

  return (
    <div id={fieldKey}>
      <Form
        form={form}
        onValuesChange={handleOnChange}
        ref={(node: any) => {
          if (!ref.current) {
            formManagers.add({ [fieldKey]: node });
            ref.current = node;
          }
        }}
      >
        <Row gutter={[10, 0]} justify="space-between" align="middle">
          <Col span={16}>
            <Form.Item
              name={generateFieldName(name, 'input')}
              dependencies={[generateFieldName(name, 'input')]}
              rules={[
                ...(miniMum.isValidatedMiniMum || maxiMum.isValidatedMaxiMum
                  ? [{ required: true, message: showError }]
                  : []),
                validateInput,
              ]}
            >
              <InputNumber
                disabled={isDisabled}
                max={isRequired ? maxiMum.max : undefined}
                min={isRequired ? miniMum.min : undefined}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name={generateFieldName(name, 'select')}>
              <Select disabled={isDisabled}>
                {options.map(({ value, label }) => (
                  <Option key={value} value={value}>
                    {label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default InputUnitViewer;
