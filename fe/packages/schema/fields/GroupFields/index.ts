import { FIELD_NAME } from '@packages/constants/fields';
import { AnyObject } from 'antd/es/_util/type';
import { Field } from '../fieldModel';
import { columnReferenceType } from '../TableField';

export const createGroupFields = (extraFieldConfig: AnyObject = {}) => {
  return new Field({
    fieldName: FIELD_NAME.GROUP_FIELDS,
    key: '',
    version: 0,
    componentPropsAllowConfig: {
      columnReferenceType,
    },
    ...extraFieldConfig,
  });
};
