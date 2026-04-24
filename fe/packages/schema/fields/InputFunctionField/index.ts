import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { AnyObject } from 'antd/es/_util/type';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const transformDataOption = new ConfigBasic({
  type: CONFIG_BASIC_FIELD_TYPE.CODE,
  props: {
    defaultValue: `function transformData(formData) {
      return null;
    }`,
  },
});

export const createInputFunctionField = (
  extraFieldConfig: AnyObject = {},
) => new Field<Partial<any>>({
  key: '',
  fieldName: FIELD_NAME.INPUT_FUNCTION,
  version: 0,
  componentPropsAllowConfig: {
    transformDataOption,
  },
  ...extraFieldConfig,
});
