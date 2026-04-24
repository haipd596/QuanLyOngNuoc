import { FIELD_NAME } from '@packages/constants/fields';
import { AnyObject } from 'antd/es/_util/type';
import { Field } from '../fieldModel';

export const createInputSearchField = (
  extraFieldConfig: AnyObject = {},
) => new Field<Partial<any>>({
  key: '',
  fieldName: FIELD_NAME.INPUT_SEARCH,
  version: 0,
  componentPropsAllowConfig: {
  },
  ...extraFieldConfig,
});
