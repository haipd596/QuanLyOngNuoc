import { DIVIDER_HIDDEN } from '@packages/constants/commons';
import { stringToFunc } from '@packages/utils/common';
import { omitRedundantFieldProps } from '@packages/utils/omitProps';
import type { GetProp, SpaceProps } from 'antd';
import {
  Checkbox, Form, Input, List,
} from 'antd';
import { CheckboxGroupProps } from 'antd/es/checkbox';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import { LabeledValue } from 'antd/es/select';
import _filter from 'lodash/filter';
import _includes from 'lodash/includes';
import _isArray from 'lodash/isArray';
import _map from 'lodash/map';
import React, { useEffect, useMemo } from 'react';
import './styles.scss';

export interface ViewCheckboxGroupProps extends Omit<CheckboxGroupProps, 'onChange'> {
  options?: LabeledValue[],
  direction?: SpaceProps['direction'],
  labelPosition?: 'left' | 'right',
  numberOfItems?: number,
  onChange?: (values: any[]) => void;
  data?: any;
  transformDataOption?: string;
  singleSelectMode?: boolean
}

export const ViewCheckboxGroup: React.FC<ViewCheckboxGroupProps> = (props) => {
  const {
    options,
    direction,
    numberOfItems,
    labelPosition = 'right',
    name,
    onChange,
    data,
    transformDataOption,
    singleSelectMode,
    ...rest
  } = props;
  const form = useFormInstance();

  const fieldNameHidden = useMemo(() => {
    return `${name}${DIVIDER_HIDDEN}`;
  }, []);

  const _options = useMemo(() => {
    if (transformDataOption) {
      try {
        const { func } = stringToFunc(transformDataOption);
        if (func) {
          const results = func(data);
          if (_isArray(results)) return results;
        }
      } catch (error) {
        console.error(error);
        return options;
      }
    }

    return options;
  }, [data, options, transformDataOption]);

  const showStatus = (selectedValues: string[]) => {
    return _options?.map((option) => ({
      label: option.label,
      value: option.value,
      status: selectedValues.includes(option.value.toString()),
    }));
  };

  const handleOnChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
    let selectedValues: string[] = [];

    if (singleSelectMode) {
      const latesValue = (_isArray(checkedValues)
        ? checkedValues[checkedValues.length - 1]
        : checkedValues) as string;
      selectedValues = [latesValue];
    } else {
      selectedValues = checkedValues as string[];
    }

    const statusForAllCheckbox = showStatus(selectedValues);

    if (onChange) onChange(selectedValues);

    const arrLabel = _map(
      _filter(options, ({ value }) => _includes(selectedValues, value)),
      'label',
    );

    form.setFieldValue(
      fieldNameHidden,
      { fieldId: name, label: arrLabel.join(', '), statusForAllCheckbox },
    );

    statusForAllCheckbox?.forEach((opt) => {
      form.setFieldValue(opt.value, opt.status);
    });
  };

  useEffect(() => {
    if (_options && rest.value === undefined) {
      const initialStatus = _options?.map((option) => ({
        label: option.label,
        value: option.value,
        status: false,
      }));

      form.setFieldValue(fieldNameHidden, {
        fieldId: name,
        label: '',
        statusForAllCheckbox: initialStatus,
      });

      initialStatus.forEach((_opt) => {
        form.setFieldValue(_opt.value, _opt.status);
      });
      const checkedItem = initialStatus.find((_item) => _item.status);
      form.setFieldValue(name, checkedItem?.value || '');
    }
  }, [rest.value, _options]);

  return (
    <div className="wrapper-view-checkbox">
      <Checkbox.Group {...omitRedundantFieldProps(rest)} style={{ width: '100%' }} onChange={handleOnChange}>
        <List
          style={{ width: '100%' }}
          grid={{ gutter: 16, column: numberOfItems || 1 }}
          dataSource={_options}
          renderItem={({ label, value }) => (
            <List.Item className={options?.length === numberOfItems ? 'styles_checkboxgroup_special' : ''}>
              <Checkbox
                className={labelPosition === 'right' ? 'checkbox-icon-right' : ''}
                value={value}
              >
                {label}
              </Checkbox>
            </List.Item>
          )}
        />
      </Checkbox.Group>
      <Form.Item name={fieldNameHidden} hidden>
        <Input />
      </Form.Item>

      {[...(options || [])].map((opt) => (
        <Form.Item key={opt.value} name={opt.value} hidden>
          <Input />
        </Form.Item>
      ))}
    </div>
  );
};

export default ViewCheckboxGroup;
