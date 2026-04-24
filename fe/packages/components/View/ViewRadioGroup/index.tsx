import { DIVIDER_HIDDEN } from '@packages/constants/commons';
import { KEY_OVERRIDE } from '@packages/utils/constantKeyOverride';
import type { RadioChangeEvent, SpaceProps } from 'antd';
import {
  Form, Input, List, Radio,
} from 'antd';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import TextArea from 'antd/es/input/TextArea';
import { LabeledValue } from 'antd/es/select';
import { RadioGroupProps } from 'antd/lib';
import _get from 'lodash/get';
import React, { useEffect, useMemo, useState } from 'react';

export interface ViewRadioGroupProps extends Omit<RadioGroupProps, 'onChange'> {
  options?: LabeledValue[],
  direction?: SpaceProps['direction'],
  onChange?: (value: boolean) => void;
  numberOfItems?: number,
  optionsMoreInfo?: any,
  isShowOtherInfo?: number,
  labelError?: string
}

const ViewRadioGroup: React.FC<ViewRadioGroupProps> = (props) => {
  const {
    options,
    name,
    numberOfItems,
    onChange,
    optionsMoreInfo,
    isShowOtherInfo,
    ...rest
  } = props;
  const [textInfo, setTextInfo] = useState();
  const form = useFormInstance();

  const fieldNameHidden = useMemo(() => {
    return `${name}${DIVIDER_HIDDEN}`;
  }, []);

  const showStatus = (selectedValues: string) => {
    const baseStatus = options?.map((option) => ({
      label: option.label,
      value: option.value,
      checked: option.value === selectedValues,
    })) || [];

    const moreInfoStatus = isShowOtherInfo
      ? optionsMoreInfo.map((info: any) => ({
        label: info.label,
        value: info.value,
        checked: info.value === selectedValues,
        otherInfo: info.value === selectedValues ? textInfo : '',
      }))
      : [];

    return [...baseStatus, ...moreInfoStatus];
  };

  const handleChange = (e: RadioChangeEvent) => {
    const val = e.target.value;
    setTextInfo(val);
    if (onChange) onChange(val);

    const labelRadio = options?.find(({ value }) => value === val);
    const moreInfoLabel = optionsMoreInfo?.find((info: any) => info.value === val);

    const statusForAllOptions = showStatus(val);

    form.setFieldValue(
      fieldNameHidden,
      {
        fieldId: name,
        // label: _get(labelRadio, 'label', ''),
        label: moreInfoLabel ? _get(moreInfoLabel, 'label', '') : _get(labelRadio, 'label', ''),
        statusForAllOptions,
      },
    );

    // Gán thêm cặp key,value trong payload dựa vào statusForAllOptions
    statusForAllOptions.forEach((opt) => {
      form.setFieldValue(opt.value, opt.checked);
    });
  };

  const handleTextChange = (val: string, keyVal: string) => {
    const currentFieldValue = form.getFieldValue(fieldNameHidden);
    const updatedStatusForAllOptions = currentFieldValue.statusForAllOptions.map(
      (option: any) => (option.value === keyVal
        ? { ...option, otherInfo: val }
        : option),
    );

    form.setFieldValue(fieldNameHidden, {
      ...currentFieldValue,
      statusForAllOptions: updatedStatusForAllOptions,
    });
  };

  useEffect(() => {
    if (options && rest.value === undefined) {
      const initialStatus: any = options?.map((option) => ({
        label: option.label,
        value: option.value,
        checked: option.value === '1' && name === KEY_OVERRIDE.DANH_MUC_NHA_NUOC,
      }));

      if (isShowOtherInfo && optionsMoreInfo.length) {
        optionsMoreInfo.forEach((info: any) => {
          initialStatus.push({
            label: info.label,
            value: info.value,
            checked: false,
            otherInfo: '',
          });
        });
      }

      form.setFieldValue(fieldNameHidden, {
        fieldId: name,
        label: '',
        statusForAllCheckbox: initialStatus,
      });

      if (name === KEY_OVERRIDE.DANH_MUC_NHA_NUOC) {
        form.setFieldValue(name, '1');
      }

      initialStatus.forEach((opt: any) => {
        form.setFieldValue(opt?.value, opt?.checked);
      });

      const checkedItem = initialStatus.find((item: any) => item.checked);
      form.setFieldValue(name, checkedItem?.value || '');
    }
  }, [rest.value, options, optionsMoreInfo, name]);

  return (
    <>
      <Radio.Group onChange={handleChange} {...rest} style={{ width: '100%' }}>
        <List
          style={{ width: '100%' }}
          grid={{ gutter: 5, column: numberOfItems || 1 }}
          dataSource={options}
          renderItem={({ label, value }) => (
            <List.Item>
              <Radio value={value}>
                {label}
              </Radio>
            </List.Item>
          )}
        />
        {isShowOtherInfo && optionsMoreInfo.length
          ? (
            <List
              style={{ width: '100%' }}
              grid={{ gutter: 5, column: numberOfItems || 1 }}
              dataSource={optionsMoreInfo}
              renderItem={(item: any, index) => (
                <List.Item>
                  <div style={{ width: '100%' }}>
                    <Radio key={index} value={item.value}>
                      {item.label}
                    </Radio>
                    {textInfo === item.value && (
                    <TextArea
                      style={{ width: '100%', marginTop: 8 }}
                      onChange={(e: any) => handleTextChange(e.target.value, item.value)}
                    />
                    )}
                  </div>
                </List.Item>
              )}
            />
          )
          : null}
      </Radio.Group>
      <Form.Item name={fieldNameHidden} hidden>
        <Input />
      </Form.Item>

      {[...(options || []), ...(optionsMoreInfo || [])].map((opt) => (
        <Form.Item key={opt.value} name={opt.value} hidden>
          <Input />
        </Form.Item>
      ))}
    </>
  );
};

export default ViewRadioGroup;
