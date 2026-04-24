import { ViewCheckboxProps } from '@packages/components/View/ViewCheckbox';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { AnyObject } from 'antd/es/_util/type';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createCheckboxField = (
  extraFieldConfig: AnyObject = {},
) => new Field<Partial<ViewCheckboxProps>>({
  key: '',
  fieldName: FIELD_NAME.CHECK_BOX,
  version: 0,
  componentPropsAllowConfig: {
    disabled: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
      props: {
        defaultValue: false,
      },
    }),
    defaultChecked: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
      props: {
        defaultValue: false,
      },
    }),
    titleCheckBox: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'Title for checkbox',
      },
    }),
    labelPosition: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.SELECT,
      props: {
        defaultValue: 'left',
        options: [
          {
            label: 'Right',
            value: 'right',
          },
          {
            label: 'Left',
            value: 'left',
          },
        ],
      },
    }),
    // Dùng để handle trường hợp chỉ cho chọn 1 (type radio)
    enableMutualExclusion: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
      props: {
        defaultValue: false,
      },
    }),
    groupName: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: '',
      },
    }),
  },
  ...extraFieldConfig,
});
