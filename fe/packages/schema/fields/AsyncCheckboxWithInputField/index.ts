import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { asyncCommonConfig } from '@packages/constants/jsonConfig';
import { getBaseDvcApi } from '@packages/dvc-service/getBaseUrl';
import { AnyObject } from 'antd/es/_util/type';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createAsyncCheckboxWithInputField = (
  extraFieldConfig: AnyObject = {},
) => new Field<Partial<any>>({
  key: '',
  fieldName: FIELD_NAME.ASYNC_CHECKBOX_WITH_INPUT,
  version: 0,
  componentPropsAllowConfig: {
    ...asyncCommonConfig,
    action: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.ASYNC_ACTION,
      props: {
        defaultValue: `${getBaseDvcApi()}/_api/web/lists/getbytitle('bd_DM_NoiDungHoatDong')/items?$select=ID,Title,Ten&$filter= DaXoa eq '0'`,
      },
    }),
    pathToSource: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'value',
      },
    }),
    indexLabel: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'Title',
      },
    }),
    indexValue: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'Id',
      },
    }),
  },
  ...extraFieldConfig,
});
