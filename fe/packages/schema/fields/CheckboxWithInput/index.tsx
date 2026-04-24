import { ViewCheckboxGroupProps } from '@packages/components/View/ViewCheckboxGroup';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { AnyObject } from 'antd/es/_util/type';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createCheckboxWithInput = (
  extraFieldConfig: AnyObject = {},
) => new Field<ViewCheckboxGroupProps>({
  fieldName: FIELD_NAME.CHECKBOX_WITH_INPUT,
  key: '',
  version: 0,
  componentPropsAllowConfig: {
    options: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.ARRAY,
      props: {
        defaultValue: [
          {
            key: 'key_1',
            value: 'Nhập nội dung',
          },
          {
            key: 'key_2',
            value: 'Nhập nội dung',
          },
          {
            key: 'key_3',
            value: 'Nhập nội dung',
          },
          {
            key: 'key_4',
            value: 'Nhập nội dung',
          },
        ],
      },
    }),
  },
  ...extraFieldConfig,
});
