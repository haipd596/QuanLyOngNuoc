import { IField } from '@packages/main/Forms';
import FieldItem from '@packages/main/Forms/FormBase/FieldItem';
import { flattenFieldsInSchema } from '@packages/utils';
import { publishMutualExclusion, subscribeMutualExclusion } from '@packages/utils/common';
import { KEY_OVERRIDE } from '@packages/utils/constantKeyOverride';
import { isViewOrDetailMode } from '@packages/utils/viewMode';
import {
  Checkbox, CheckboxProps, Form, Space,
} from 'antd';
import { useWatch } from 'antd/es/form/Form';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';
import React, {
  useEffect, useRef, useState,
} from 'react';
import { useAppSelector } from '~/redux/hooks';
import { selectActiveFields } from '~/redux/slices';

type TCheckBoxWrapperProps = {
  label: string,
  checkboxToggleServerPayloadKey: string,
  index: number,
  isFullWidth: boolean,
  defaultChecked?: boolean,
  labelPosition?: 'left' | 'right',
  modeView: string,
  field: IField,
  disabled?: boolean
  enableMutualExclusion?: boolean
  groupName?: string
};

const generateServerPayloadKeyForCheckboxToggle = (fieldKey: string) => {
  return `checkboxToggle${fieldKey}Hidden.#cb#`;
};

const isHiddenCheckBoxSpecial = (labelCheckbox: string, checkboxToggleServerPayloadKey: string) => {
  return labelCheckbox === KEY_OVERRIDE.TITLE_BUU_CHINH_CONG_ICH
  && checkboxToggleServerPayloadKey === KEY_OVERRIDE.KEY_BUU_CHINH_CONG_ICH;
};

const CheckBoxWrapper = (props: TCheckBoxWrapperProps) => {
  const {
    label,
    index,
    isFullWidth,
    defaultChecked,
    labelPosition,
    field,
    modeView,
    checkboxToggleServerPayloadKey = generateServerPayloadKeyForCheckboxToggle('key'),
    disabled,
    enableMutualExclusion,
    groupName
  } = props;

  const isHiddenCheckbox = isHiddenCheckBoxSpecial(label, checkboxToggleServerPayloadKey);
  const [isChecked, setIsChecked] = useState(defaultChecked);
  const isFirstRender = useRef(true);
  const fields = useAppSelector(selectActiveFields);
  const form = useFormInstance();

  // Hỗ trợ cập nhật trạng thái checkbox khi nhấn button lấy dữ liệu từ tờ khai
  const formValue = useWatch(checkboxToggleServerPayloadKey, form);

  useEffect(() => {
    if (formValue && typeof formValue === 'object' && 'checked' in formValue) {
      if (!defaultChecked) {
        setIsChecked(isHiddenCheckbox ? true : formValue.checked);
      }
    }
  }, [formValue]);

  const setHiddenCheckboxValue = (checked: boolean, fieldInForm?: string[]) => {
    form.setFieldValue(
      checkboxToggleServerPayloadKey,
      { checked, label, fieldInForm },
    );
  };

  useEffect(() => {
    if (
      isViewOrDetailMode(modeView)
      && isFirstRender.current === true
    ) {
      const fieldSchemaInToggle = flattenFieldsInSchema(fields, field.key);

      const fieldInForm = _map(fieldSchemaInToggle, 'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue').filter((key) => key);
      const getFieldName = _get(fieldSchemaInToggle[0], 'formItemPropsAllowConfig.initFieldData.props.defaultValue');

      if (!_isEmpty(fieldInForm)) {
        if(getFieldName) {
          setIsChecked(false);
          return;
        }
        const checked = fieldInForm.some((key) => form.getFieldValue(key));
        if (checked) {
          setIsChecked(checked);
        }
        setHiddenCheckboxValue(checked, fieldInForm);
      } else {
        setHiddenCheckboxValue(false, fieldInForm);
      }

      isFirstRender.current = false;
    }
  }, [fields.length]);

  const handleChange: CheckboxProps['onChange'] = (e) => {
    const { checked } = e.target;

    const { fieldInForm } = form.getFieldValue(checkboxToggleServerPayloadKey) ?? [];

    setIsChecked(checked);
    setHiddenCheckboxValue(e.target.checked, fieldInForm);

    // Xử lý checkbox mode-like-radio
    if (enableMutualExclusion && groupName) {
      publishMutualExclusion({ groupName: groupName, sourceKey: checkboxToggleServerPayloadKey });
    }
  };

  // useEffect xử lý checkbox mode-like-radio
  useEffect(() => {
    const fieldSchemaInToggle = flattenFieldsInSchema(fields, field.key);

    const fieldInForm = _map(fieldSchemaInToggle, 'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue').filter((key) => key);
    const unsubscribe = subscribeMutualExclusion(({ groupName: eventGroup, sourceKey }) => {
      console.info("🚀 ~ CheckBoxWrapper ~ eventGroup:", {groupName, sourceKey})
      if (eventGroup === groupName && sourceKey !== checkboxToggleServerPayloadKey) {
        setIsChecked(false)
        form.setFieldValue(
          checkboxToggleServerPayloadKey,
          {checked: false, label, fieldInForm}
        );
      }
    });
    return unsubscribe;
  }, [groupName, checkboxToggleServerPayloadKey, form]);

  return (
    <div style={{ width: isFullWidth ? '100%' : 'unset' }}>
      <Form.Item
        name={checkboxToggleServerPayloadKey}
        hidden
      />
      <Space>
        {
          labelPosition === 'right'
          && (
          <label
            className="label-checkbox-toggle-content"
            // htmlFor={String(index) + label}
            {...(!isHiddenCheckbox && { htmlFor: String(index) + label })}
          >
            {String(label)}
          </label>
          )
        }
        <Checkbox
          id={String(index) + label}
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          style={{ display: isHiddenCheckbox ? 'none' : undefined }}
        />
        {
          labelPosition === 'left'
          && (
          <label
            className="label-checkbox-toggle-content"
            // htmlFor={String(index) + label}
            {...(!isHiddenCheckbox && { htmlFor: String(index) + label })}
            style={{
              marginLeft: isHiddenCheckbox ? '15px' : '',
              cursor: isHiddenCheckbox ? 'default' : 'pointer',
            }}
          >
            { isHiddenCheckbox
              ? <strong>{String(label)}</strong>
              : String(label)}
          </label>
          )
        }
      </Space>
      {
          isChecked && (
            <FieldItem
              field={field as any}
              fieldIndex={index}
              modeView={modeView}
              key={field.key}
            />
          )
        }
    </div>
  );
};

export default CheckBoxWrapper;
