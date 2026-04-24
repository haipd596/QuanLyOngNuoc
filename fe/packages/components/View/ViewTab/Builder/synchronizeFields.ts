import { IField } from '@packages/main/Forms';
import { duplicateFieldRecursive } from '@packages/utils/duplicateFields';
import _findIndex from 'lodash/findIndex';

export const synchronizeFields = () => {
  let added: string[] = [];

  return (fields: IField[], allTabs:any, currentFieldKey: string) => (
    new Promise((resolve) => {
      const indexCurrentField = _findIndex(fields, { key: currentFieldKey });
      const { fieldsInColumnIndex } = fields[indexCurrentField];

      const fieldKeysAddedTabOne = (fieldsInColumnIndex?.filter(
        ({ columnIndex, fieldKeyCol }) => columnIndex === 0 && !added.includes(fieldKeyCol),
      ) || []).map(({ fieldKeyCol }) => fieldKeyCol);

      added = added.concat(fieldKeysAddedTabOne);

      const allFieldInTabOne = fields.filter(({ key }) => {
        return fieldKeysAddedTabOne.includes(key);
      });

      let _fields: IField[] = [];
      const newFieldColumnIndex = allTabs.reduce((acc: any, _cur: any, index: number) => {
        let _parents: IField[] = [];
        allFieldInTabOne.forEach((__field) => {
          const { clonedFields, parentField } = duplicateFieldRecursive(fields, __field.key);
          _fields = _fields.concat(clonedFields);
          if (parentField) {
            _parents = _parents.concat(parentField);
          }
        });

        if (index > 0) {
          acc = acc.concat(
            _parents.map(({ key }) => ({ fieldKeyCol: key, columnIndex: index })),
          );
        }

        return acc;
      }, []);
      fields[indexCurrentField].fieldsInColumnIndex?.push(...newFieldColumnIndex);

      resolve(fields.concat(_fields));
    })
  );
};
