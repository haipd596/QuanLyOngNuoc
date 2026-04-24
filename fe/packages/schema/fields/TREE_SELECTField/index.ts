import { ViewTreeSelectProps } from '@packages/components/View/TREE_SELECT/Viewer';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { AnyObject } from 'antd/es/_util/type';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createTREE_SELECTField = (
  extraFieldConfig: AnyObject = {},
) => new Field<Partial<ViewTreeSelectProps>>({
  key: '',
  fieldName: FIELD_NAME.TREE_SELECT,
  version: 0,
  componentPropsAllowConfig: {
    labelForTreeSelect: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'Danh mục',
      },
    }),
    serverPayloadKey: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'DanhMucTree',
      },
    }),
    placeholder: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'Chọn danh mục',
      },
    }),
    allowClear: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
      props: {
        defaultValue: true,
      },
    }),
    treeDefaultExpandAll: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
      props: {
        defaultValue: true,
      },
    }),
    isRequired: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
      props: {
        defaultValue: false,
      },
    }),
  },
  ...extraFieldConfig,
});
