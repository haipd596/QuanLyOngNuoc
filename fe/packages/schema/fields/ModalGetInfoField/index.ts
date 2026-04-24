import { TViewInfo } from '@packages/components/View/ViewInfo/type';
import { FIELD_NAME } from '@packages/constants/fields';
import { asyncCommonConfig } from '@packages/constants/jsonConfig';
import { AnyObject } from 'antd/es/_util/type';
import { Field } from '../fieldModel';

const {
  indexLabel,
  indexValue,
  ...commonConfig
} = asyncCommonConfig;

export const createModalGetInfo = (extraFieldConfig: AnyObject = {}) => (
  new Field<Partial<TViewInfo>>({
    fieldName: FIELD_NAME.MODAL_GET_INFO,
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
