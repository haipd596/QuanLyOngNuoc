import type { CheckboxProps } from 'antd';
import { Checkbox } from 'antd';
import React, { useEffect, useRef } from 'react';

import { publishMutualExclusion, subscribeMutualExclusion } from '@packages/utils/common';
import { KEY_OVERRIDE } from '@packages/utils/constantKeyOverride';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import _get from 'lodash/get';
import './styles.scss';

export interface ViewCheckboxProps extends Omit<CheckboxProps, 'onChange'> {
  disabled: boolean;
  titleCheckBox: string;
  labelPosition?: 'left' | 'right',
  onChange: (value: boolean) => void,
  defaultChecked?: boolean;
  enableMutualExclusion?: boolean;
  groupName?: string;
}

const isXacNhanDongYCheckbox = (fieldName: string) => {
  return fieldName === KEY_OVERRIDE.XAC_NHAN_DONG_Y;
};

const isStylingCheckboxSpecial = (fieldName: string) => {
  return fieldName === KEY_OVERRIDE.DANG_KY_NHAN_SMS;
};

const ViewCheckbox: React.FC<ViewCheckboxProps & any> = ({
  disabled,
  onChange,
  titleCheckBox,
  labelPosition,
  defaultChecked,
  enableMutualExclusion,
  groupName,
  ...rest
}) => {
  const isFirstRender = useRef(true);
  const isSpecial = isStylingCheckboxSpecial(rest.name);

  const form = useFormInstance();

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      // checkbox XacNhanDongY always return to undefined
      if (isXacNhanDongYCheckbox(rest.name) && rest.value !== true) {
        // onChange(null);
        onChange(false);
        return;
      }

      if (rest.value === undefined && rest['aria-required'] !== 'true') {
        onChange(defaultChecked ?? false);
        // onChange(false);
      }
    }
  }, [rest.value, rest['aria-required']]);

  const handleChange: CheckboxProps['onChange'] = (e) => {
    const { checked } = e.target;

    if (isXacNhanDongYCheckbox(rest.name) && !checked) {
      onChange?.(null);
    }

    if (rest['aria-required'] === 'true') {
      onChange?.(checked ? true : undefined); // undefined để kích hoạt validate
      return;
    }

    // Xử lý checkbox mode-like-radio
    if (enableMutualExclusion && groupName) {
      publishMutualExclusion({ groupName, sourceKey: rest.name });
    }

    onChange?.(checked);
  };

  useEffect(() => {
    if (rest.name === KEY_OVERRIDE.XAC_NHAN_DONG_Y) {
      form.setFieldValue(rest.name, true);
    }
  }, []);

  // useEffect xử lý checkbox mode-like-radio
  useEffect(() => {
      const unsubscribe = subscribeMutualExclusion(({ groupName: eventGroup, sourceKey }) => {
        console.info("🚀 ~ ViewCheckbox ~ eventGroup:", {groupName, sourceKey})
        if (eventGroup === groupName && sourceKey !== rest.name) {
          form.setFieldValue(rest.name, false);
        }
      });
      return unsubscribe;
  }, [groupName, rest.name, form]);

  return (
    <div className="wrapper-checkbox">
      <Checkbox
        {...rest}
        checked={rest.value}
        onChange={handleChange}
        disabled={disabled}
        className={labelPosition === 'right' ? 'checkbox-icon-right' : ''}
      >
        {isSpecial
          ? <strong>{titleCheckBox}</strong>
          : titleCheckBox}
      </Checkbox>
    </div>
  );
};

export default ViewCheckbox;
