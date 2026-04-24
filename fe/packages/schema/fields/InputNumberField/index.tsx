import { TCommonConfigArray } from '@packages/@types';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { InputNumberProps } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { FormItemProps } from 'antd/lib';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createInputNumberField = (extraFieldConfig: AnyObject = {}) => (
  new Field<InputNumberProps>({
    fieldName: FIELD_NAME.INPUT_NUMBER,
    key: '',
    version: 0,
    componentPropsAllowConfig: {
      max: new ConfigBasic<InputNumberProps>({
        type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
        props: {
          defaultValue: undefined,
        },
      }),
      min: new ConfigBasic<InputNumberProps>({
        type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
        props: {
          defaultValue: 0,
        },
      }),
      formatter: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.CODE,
        props: {
          defaultValue: `function formatter(value) {\n  if (!value && value !== 0) return '';\n  return \`\${value}\`.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');\n}`,
        },
      }),
      parser: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.CODE,
        props: {
          defaultValue: `function parser(value) {\n  if (!value) return '';\n  return value.replace(/,/g, '');\n}`,
        },
      }),
    },
    formItemPropsAllowConfig: {
      rules: new ConfigBasic<{
        defaultValue: FormItemProps['rules']
      } & TCommonConfigArray>({
        type: CONFIG_BASIC_FIELD_TYPE.ARRAY,
        props: {
          defaultValue: [],
          isAddable: false,
        },
      }),
    },
    ...extraFieldConfig,
  })
);
