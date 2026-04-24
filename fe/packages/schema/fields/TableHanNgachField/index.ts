import { TableHanNgachProps } from '@packages/components/View/TableHanNgach/Viewer';
import { FIELD_NAME } from '@packages/constants/fields';
import { LANGUAGES_SWITCHER_CONFIG } from '@packages/constants/jsonConfig';
import { AnyObject } from 'antd/es/_util/type';
import { Field } from '../fieldModel';

export const createTableHanNgachField = (
  extraFieldConfig: AnyObject = {},
) => new Field<Partial<TableHanNgachProps>>({
  key: '',
  fieldName: FIELD_NAME.TABLE_HAN_NGACH,
  version: 0,
  componentPropsAllowConfig: {
    ...LANGUAGES_SWITCHER_CONFIG,
  },
  ...extraFieldConfig,
});
