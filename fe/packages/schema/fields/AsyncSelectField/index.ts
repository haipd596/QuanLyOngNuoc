import { TViewAsyncSelectProps } from '@packages/components/View/ViewAsyncSelect';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { asyncCommonConfig } from '@packages/constants/jsonConfig';
import { AnyObject } from 'antd/es/_util/type';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createAsyncSelectField = (extraFieldConfig: AnyObject = {}) => (
  new Field<Partial<TViewAsyncSelectProps>>({
    fieldName: FIELD_NAME.ASYNC_SELECT,
    key: '',
    version: 0,
    componentPropsAllowConfig: {
      ...asyncCommonConfig,
      isBuildTree: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
        props: {
          defaultValue: false,
        },
      }),
      idKey: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.STRING,
        props: { defaultValue: 'id' },
      }),
      parentKey: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.STRING,
        props: { defaultValue: 'parentId' },
      }),
      searchQueryKey: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.STRING,
        props: {
          defaultValue: 'q',
        },
      }),
      debounceTime: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
        props: {
          defaultValue: 500,
          min: 300,
          max: 800,
        },
      }),
      showSearch: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
        props: {
          defaultValue: true,
        },
      }),
      isMultipleSelected: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
        props: {
          defaultValue: false,
        },
      }),
    },
    ...extraFieldConfig,
  })
);
