import { FIELD_NAME } from '@packages/constants/fields';
import { Schema } from '@packages/main/Forms';
import { configSchemaTable } from '@packages/schema/fields/TableField/configSchemaTable';
import _get from 'lodash/get';
import _isArray from 'lodash/isArray';
import _isEmpty from 'lodash/isEmpty';

export const createChildrenInTable = (field: any) => {
  if (field.fieldName === FIELD_NAME.TABLE) {
    const columns = _get(field, 'componentPropsAllowConfig.columns.props.defaultValue');

    if (_isArray(columns)) {
      const columnSchema = configSchemaTable(columns);
      const childrenSchema = (new Schema(columnSchema.schemas)).toPlainObject();

      if (_isEmpty(field.fieldsInColumnIndex)) {
        field.fieldsInColumnIndex = childrenSchema.fields.map((_field: any) => ({
          fieldKeyCol: _field.uniqId as any,
          columnIndex: 0,
        }));

        const childrenFields = childrenSchema.fields.map((_field) => {
          return {
            ..._field,
            isShowField: false,
          } as any;
        });

        return childrenFields;
      }
    }
  }

  return [];
};
