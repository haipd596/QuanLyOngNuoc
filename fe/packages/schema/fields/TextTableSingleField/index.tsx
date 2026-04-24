import {
  ITableSingleFieldProps,
} from '@packages/components/View/ViewFieldTableSingle/type.table.single';
import { FIELD_NAME } from '@packages/constants/fields';
import { AnyObject } from 'antd/es/_util/type';
import { createTableField } from '../TableField';
import { Field } from '../fieldModel';

export const createFieldTableSingle = (extraFieldConfig: AnyObject = {}) => (
  new Field<ITableSingleFieldProps>({
    ...createTableField(),
    fieldName: FIELD_NAME.FIELD_TABLE_SINGLE,
    key: '',
    version: 0,
    ...extraFieldConfig,
  })
);
