import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { AnyObject } from 'antd/es/_util/type';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createCheckboxToggleField = (extraFieldConfig: AnyObject = {}) => new Field({
  key: '',
  fieldName: FIELD_NAME.CHECKBOX_TOGGLE,
  version: 0,
  componentPropsAllowConfig: {
    isFullWidth: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
      props: {
        defaultValue: true,
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
    checkboxToggleServerPayloadKey: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'checkboxToggle.#cb#',
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
