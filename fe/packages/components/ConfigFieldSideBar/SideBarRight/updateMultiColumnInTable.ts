import { configSchemaTable } from '@packages/schema/fields/TableField/configSchemaTable';
import { updateConfigSchemaTable } from '@packages/schema/fields/TableField/updateConfigSchemaTable';
import { message } from 'antd';
import _ from 'lodash';

export const updateMultiColumnInTable = (
  fields: any,
  newField: any,
  activeConfigFieldKey: any,
) => {
  let _fields = [...fields];
  const newColumns = _.get(newField, 'componentPropsAllowConfig.columns.props.defaultValue', []) as any;
  const prevColumns = _.get(_.find(_fields, { key: activeConfigFieldKey }), 'componentPropsAllowConfig.columns.props.defaultValue', []) as any;

  // get deleted fields
  const deletedFields = prevColumns.filter(({ uniqId }: any) => {
    return !newColumns.find(({ uniqId: _uniqId }: any) => uniqId === _uniqId);
  }) as any;

  // get new one just add
  const addedFields = newColumns.filter(({ uniqId }: any) => {
    return !prevColumns.find(({ uniqId: _uniqId }: any) => uniqId === _uniqId);
  }) as any;

  // fields none add or remove
  const fieldsBoth = newColumns.filter(({ uniqId }: any) => {
    // get column do not existed on added and removed fields
    return (
      !addedFields.find(({ uniqId: _uniqId } : any) => uniqId === _uniqId)
      && !deletedFields.find(({ uniqId: _uniqId }: any) => uniqId === _uniqId)
    );
  });

  // push to fields and fieldIncolumns
  if (!_.isEmpty(addedFields)) {
    addedFields.forEach((field: any) => {
      if (
        newField.fieldsInColumnIndex
        && !newField
          .fieldsInColumnIndex
          .find(({ fieldKeyCol }: any) => (
            fieldKeyCol === field.uniqId
          ))
      ) {
        newField.fieldsInColumnIndex.push({
          columnIndex: 0,
          fieldKeyCol: field.uniqId,
        });
      }
      const { schemas, message: errMsg } = configSchemaTable(newColumns, newField.fieldName);
      if (schemas.fields) {
        const test = schemas.fields.find(({ uniqId }: any) => uniqId === field.uniqId);
        _fields.push({
          ...test,
          isShowField: false,
        });
      }

      if (errMsg) {
        message.error(errMsg);
      }
    });
  }

  // remove to fields and fieldIncolumns
  if (!_.isEmpty(deletedFields)) {
    deletedFields.forEach((field: any) => {
      if (newField.fieldsInColumnIndex) {
        newField.fieldsInColumnIndex = newField
          .fieldsInColumnIndex
          .filter(({ fieldKeyCol }: any) => fieldKeyCol !== field.uniqId);
      }
      _fields = _fields.filter(({ uniqId }: any) => uniqId !== field.uniqId);
    });
  }

  // update field
  if (!_.isEmpty(fieldsBoth)) {
    _fields = updateConfigSchemaTable(fieldsBoth, _fields);
  }
  const formActiveIndex1 = _fields.findIndex(
    ({ key }) => key === newField.key,
  );

  if (formActiveIndex1 > -1) {
    _fields[formActiveIndex1] = newField as any;
  }

  return _fields;
};
