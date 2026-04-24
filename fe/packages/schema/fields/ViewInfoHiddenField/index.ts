import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { asyncCommonConfig } from '@packages/constants/jsonConfig';
import { AnyObject } from 'antd/es/_util/type';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

const {
  indexLabel,
  indexValue,
  ...commonConfig
} = asyncCommonConfig;

export const createViewInfoHiddenField = (
  extraFieldConfig: AnyObject = {},
) => new Field<any>({
  key: '',
  fieldName: FIELD_NAME.VIEW_INFO_HIDDEN,
  version: 0,
  componentPropsAllowConfig: {
    ...commonConfig,
  },
  styleWrapperAllowConfig: {
    marginLeft: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
      props: {
        defaultValue: 20,
      },
    }),
  },
  ...extraFieldConfig,
});
