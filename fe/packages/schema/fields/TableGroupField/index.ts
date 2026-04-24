import { TableGroupProps } from '@packages/components/View/TableGroup/Viewer';
import { FIELD_NAME } from '@packages/constants/fields';
import { LANGUAGES_SWITCHER_CONFIG } from '@packages/constants/jsonConfig';
import { AnyObject } from 'antd/es/_util/type';
import { Field } from '../fieldModel';

export const createTableGroupField = (
  extraFieldConfig: AnyObject = {},
) => new Field<Partial<TableGroupProps>>({
  key: '',
  fieldName: FIELD_NAME.TABLE_GROUP,
  version: 0,
  componentPropsAllowConfig: {
    ...LANGUAGES_SWITCHER_CONFIG,
  },
  ...extraFieldConfig,
});
