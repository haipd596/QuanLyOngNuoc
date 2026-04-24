import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { InputNumberProps } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createInputNumberRangeField = (
  extraFieldConfig: AnyObject = {},
) => new Field<Partial<any>>({
  key: '',
  fieldName: FIELD_NAME.INPUT_NUMBER_RANGE,
  version: 0,
  componentPropsAllowConfig: {
    maxLabel: new ConfigBasic<InputNumberProps>({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'Đến',
      },
    }),
    minLabel: new ConfigBasic<InputNumberProps>({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'Từ',
      },
    }),
    max: new ConfigBasic<InputNumberProps>({
      type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
      props: {
        defaultValue: 10,
      },
    }),
    min: new ConfigBasic<InputNumberProps>({
      type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
      props: {
        defaultValue: 0,
      },
    }),
    errorMessageMin: new ConfigBasic<InputNumberProps>({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: '',
      },
    }),
    errorMessageMax: new ConfigBasic<InputNumberProps>({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: '',
      },
    }),
    serverPayloadKeyMax: new ConfigBasic<InputNumberProps>({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'max',
      },
    }),
    serverPayloadKeyMin: new ConfigBasic<InputNumberProps>({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'min',
      },
    }),
  },
  ...extraFieldConfig,
});
