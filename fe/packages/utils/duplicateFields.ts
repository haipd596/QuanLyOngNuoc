import { FIELD_NAME } from '@packages/constants/fields';
import { IField } from '@packages/main/Forms';
import _cloneDeep from 'lodash/cloneDeep';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _set from 'lodash/set';

export const duplicateFieldRecursive = (allFields: IField[], originalKey: string) => {
  const clonedFields: IField[] = [];
  let parentField = null;
  let count = 0;

  const duplicateFields = (fields: IField[], targetFieldKey: string) => {
    const fieldIndex = fields.findIndex((field) => field.key === targetFieldKey);
    const targetField = fields[fieldIndex];
    const randomNumber = Math.floor(Math.random() * 10000);

    let newFieldKeyCol: IField['fieldsInColumnIndex'] = [];
    let newColumnsTable: IField['fieldsInColumnIndex'] = [];
    if (targetField) {
      const newKey = `${targetField.key}_copy_${randomNumber}`;
      const newUniqId = targetField.uniqId ? `${targetField.uniqId}_copy_${randomNumber}` : undefined;

      if (!_isEmpty(targetField.fieldsInColumnIndex)) {
        const fieldChildren = fields.reduce((acc, cur, curIndex) => {
          const index = targetField.fieldsInColumnIndex?.findIndex(({ fieldKeyCol }) => {
            if (targetField.fieldName === FIELD_NAME.TABLE) {
              return fieldKeyCol === cur.uniqId;
            }
            return fieldKeyCol === cur.key;
          });

          // get field children
          if (typeof index === 'number' && index > -1) {
            acc.push({
              ...fields[curIndex],
              originalColumnIndex: targetField.fieldsInColumnIndex?.[index].columnIndex,
              originalKey: cur.key,
              originalUnqId: cur.uniqId,
            });
          }

          return acc;
        }, [] as any);

        // clone children inside fieldsInColumnIndex
        const clonedChildren = fieldChildren.map((item: any) => {
          return {
            ...duplicateFields(fields, item.key),
            originalColumnIndex: item.originalColumnIndex,
            originalKey: item.originalKey,
            originalUnqId: item.originalUnqId,
          };
        });

        // after create new children, add it to parent with original column index
        newFieldKeyCol = clonedChildren.map((item: any) => ({
          columnIndex: item.originalColumnIndex || 0,
          fieldKeyCol: targetField.fieldName === FIELD_NAME.TABLE ? item.uniqId : item.key,
        }));

        // if field is a table, must be clone the column too
        if (targetField.fieldName === FIELD_NAME.TABLE) {
          const originalColumnsInTable = _get(targetField, 'componentPropsAllowConfig.columns.props.defaultValue', []) as any;
          newColumnsTable = originalColumnsInTable.map((item: any) => {
            // update new uniqId and key to children
            const foundCloned = clonedChildren
              .find(({ originalUnqId }: any) => originalUnqId === item.uniqId);
            if (foundCloned) {
              return {
                ...item,
                uniqId: foundCloned.uniqId,
                dataIndex: foundCloned.key,
                key: foundCloned.key,
              };
            }

            return {};
          }, []);
        }
      }

      let newField:any = _cloneDeep({
        ...targetField,
        key: newKey,
        uniqId: newUniqId,
        fieldsInColumnIndex: newFieldKeyCol,
        oldKey: targetField.key,
      });

      if (targetField.fieldName === FIELD_NAME.TABLE) {
        newField = _set(newField, 'componentPropsAllowConfig.columns.props.defaultValue', newColumnsTable);
        newField.configChanged['componentPropsAllowConfig.columns.props.defaultValue'] = newColumnsTable;
      }

      newField = _set(newField, 'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue', newKey);
      newField.configChanged['formItemPropsAllowConfig.serverPayloadKey.props.defaultValue'] = newKey;

      // save the first parent
      if (count === 0 && newField.oldKey === originalKey) {
        parentField = newField;
        count += 1;
      }

      clonedFields.push(newField);
      return newField;
    }
  };

  duplicateFields(allFields, originalKey);

  return { clonedFields, parentField };
};
