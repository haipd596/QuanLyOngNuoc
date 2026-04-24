import { TViewDocument } from '@packages/components/View/ViewInfo/type';
import { FIELD_NAME } from '@packages/constants/fields';
import { asyncCommonConfig } from '@packages/constants/jsonConfig';
import { AnyObject } from 'antd/es/_util/type';
import { Field } from '../fieldModel';

const {
  indexLabel,
  indexValue,
  ...commonConfig
} = asyncCommonConfig;

export const createViewDocumentField = (extraFieldConfig: AnyObject = {}) => (
  new Field<Partial<TViewDocument>>({
    fieldName: FIELD_NAME.VIEW_DOCUMENT,
    key: '',
    version: 0,
    componentPropsAllowConfig: {
      ...commonConfig,
      // action: new ConfigBasic({
      //   type: CONFIG_BASIC_FIELD_TYPE.ASYNC_ACTION,
      //   props: {
      //     defaultValue: 'http://portal.fint.vn:5005/api/v1/static/user',
      //   },
      // }),
      // pathToSource: new ConfigBasic({
      //   type: CONFIG_BASIC_FIELD_TYPE.STRING,
      //   props: {
      //     defaultValue: 'data',
      //   },
      // }),
    },
    ...extraFieldConfig,
  })
);
