import { FIELD_NAME } from '@packages/constants/fields';
import { AnyObject } from 'antd/es/_util/type';
import { Field } from '../fieldModel';

export const createSelectShowConditionFormField = (extraFieldConfig: AnyObject = {}) => new Field({
  key: '',
  fieldName: FIELD_NAME.SELECT_CONDITION_SHOW_FORM,
  version: 0,
  ...extraFieldConfig,
});
