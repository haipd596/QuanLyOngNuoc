import { CodeFilled } from '@ant-design/icons';
import { Editor } from '@monaco-editor/react';
import { JsonSchema, JsonSchemaOutput, Schema } from '@packages/schema/schemaModel';
import {
  Button, Col, Modal, Row,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../LanguageContext';

const removeSchemaKey = (schema?: JsonSchemaOutput) => {
  if (schema) {
    const { schemaKey, title, ...rest } = schema;

    return rest;
  }
};
// const removeSchemaKey = (schema?: JsonSchemaOutput) => {
//   if (!schema) return;

//   const {
//     schemaKey, title, fields = [], ...rest
//   } = schema;

//   // Bước 1: Tìm field có fieldName là "ASYNC_TABLE" và key là "ASYNC_TABLE_767"
//   const findedField: any = fields.find(
//     (field) => field.fieldName === FIELD_NAME.ASYNC_TABLE && field.key === 'ASYNC_TABLE_767',
//   );

//   if (!findedField?.subForm) return rest;

//   // Bước 2: Lấy object cuối cùng trong subForm
//   const subForms = Object.values(findedField.subForm);
//   const lastSubForm: any = subForms[subForms.length - 1];

//   // Bước 3: Lấy danh sách fieldKeyCol ban đầu
//   const initialFieldKeys: string[] = lastSubForm?.fieldsInColumnIndex?.map(
//     (item: any) => item.fieldKeyCol,
//   ) || [];

//   // Bước 4–5: Đệ quy functional để thu thập tất cả key từ các fieldKeyCol
//   const collectAllKeys = (
//     inputKeys: string[],
//     accumulated: Record<string, string> = {},
//     tableGroups: Record<string, Record<string, string>>[] = [],
//   )
//   : any => {
//     const matchingFields = fields.filter(
//       (field: any) => inputKeys.includes(field.key)
//       || (field.uniqId && inputKeys.includes(field.uniqId)),
//     ).map((field) => {
//       if (!isPlainObject(field)) {
//         return { ...field };
//       }
//       return field;
//     });
//     console.log('🚀 ~ removeSchemaKey ~ matchingFields:', matchingFields);

//     const keyWithTypePairs = matchingFields.map((field: any) => {
//       const key = field?.configChanged?.[
//         'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue'
//       ]
//       ?? field?.formItemPropsAllowConfig?.serverPayloadKey?.props?.defaultValue
//       ?? field?.key;

//       return {
//         key,
//         type: field?.fieldName,
//         field,
//       };
//     });

//     keyWithTypePairs.forEach(({ key, type, field }) => {
//       if (!key || SPECIFIC_KEYS_HIDDEN_WHEN_MAPPING.includes(key)) return;

//       if (type === FIELD_NAME.F_ADDRESS) {
//         Object.entries(F_ADDRESS_REPLACEMENT).forEach(([childKey, childType]) => {
//           accumulated[childKey] = childType;
//         });
//       } else {
//         accumulated[key] = type;
//       }
//       // Nếu là TABLE, gom nhóm các con vào tableGroups
//       if (type === FIELD_NAME.TABLE && Array.isArray(field?.fieldsInColumnIndex)) {
//         const childKeys = field.fieldsInColumnIndex.map((item: any) => item.fieldKeyCol);
//         const childGroup = childKeys.reduce((obj: any, childKey: any) => {
//           const childField: any = fields.find(
//             (f: any) => f.key === childKey || f.uniqId === childKey,
//           );
//           if (!childField) return obj;

//           const resolvedKey =
// childField?.configChanged?.['formItemPropsAllowConfig.serverPayloadKey.props.defaultValue']
//           ?? childField?.formItemPropsAllowConfig?.serverPayloadKey?.props?.defaultValue
//           ?? childField?.key;

//           if (!resolvedKey || SPECIFIC_KEYS_HIDDEN_WHEN_MAPPING.includes(resolvedKey))
// return obj;

//           if (childField.fieldName === FIELD_NAME.F_ADDRESS) {
//             Object.entries(F_ADDRESS_REPLACEMENT).forEach(([childKeyS, childTypeS]) => {
//               obj[childKeyS] = childTypeS;
//             });
//           } else if (childField.fieldName !== FIELD_NAME.TABLE) {
//             obj[resolvedKey] = childField.fieldName;
//           }
//           return obj;
//         }, {} as Record<string, string>);

//         if (Object.keys(childGroup).length > 0) {
//           tableGroups.push({ [key]: childGroup });
//         }
//       }
//     });

//     // Lấy các fieldKeyCol từ fieldsInColumnIndex của matchingFields nếu có
//     const nestedKeys = matchingFields
//       .flatMap((field: any) => field.fieldsInColumnIndex?.map(
//         (item: any) => item.fieldKeyCol,
//       ) || []);

//     if (nestedKeys.length === 0) {
//       return { accumulated, tableGroups };
//     }

//     return collectAllKeys(nestedKeys, accumulated, tableGroups);
//   };

//   const { accumulated: allKeysFlat, tableGroups } = collectAllKeys(initialFieldKeys);

//   const filteredKeysNeedMapping = Object.entries(allKeysFlat)
//     .filter(([, type]) => !SPECIFIC_KEYS_WHEN_MAPPING.includes(type as any))
//     .reduce((obj, [key, type]) => {
//       obj[key] = type;
//       return obj;
//     }, {} as any);

//   if (tableGroups.length > 0) {
//     const keysInGroups = tableGroups
//       .flatMap((group: any) => Object.values(group))
//       .flatMap((obj: any) => Object.keys(obj));

//     const filteredKeysNeedMappingWithoutGroupKeys = Object.keys(filteredKeysNeedMapping)
//       .filter((key) => !keysInGroups.includes(key))
//       .reduce((acc, key) => {
//         acc[key] = filteredKeysNeedMapping[key];
//         return acc;
//       }, {} as Record<string, string>);

//     filteredKeysNeedMappingWithoutGroupKeys.TABLE_NAME = tableGroups;

//     return {
//       ...rest,
//       fields,
//       allKeysNeedMapping: filteredKeysNeedMappingWithoutGroupKeys,
//     };
//   }

//   // Bước 6: Gán allKeysNeedMapping vào schema
//   return {
//     ...rest,
//     fields,
//     allKeysNeedMapping: filteredKeysNeedMapping,
//   };
// };

type TProps = {
  schema: JsonSchema,
  onSave?: (schema: JsonSchema) => void
};

function ViewSchema({ schema, onSave }: TProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState<JsonSchemaOutput | undefined >();
  const [error, setError] = useState('');

  useEffect(() => {
    if (isModalOpen) {
      setValue(Schema.output(schema));
    }
  }, [schema, isModalOpen]);

  const handleChange = (_value: string | undefined) => {
    try {
      if (_value) {
        const valueParsed = JSON.parse(_value);
        setValue(valueParsed);
        setError('');
      }
    } catch (_error: any) {
      setError(_error.message);
    }
  };
  const { translate } = useLanguage();

  const handleOk = () => {
    try {
      if (!value) return;
      const originalSchema = { ...value, schemaKey: schema.schemaKey, title: schema.title };
      const finalSchema = Schema.reconcile(originalSchema);
      // Schema.isValid(finalSchema);
      onSave?.(finalSchema);
      setIsModalOpen(false);
      setError('');
    } catch (_error: any) {
      setError(_error.message);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setError('');
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(removeSchemaKey(value), null, 2));
  };

  return (
    <>
      <Button icon={<CodeFilled />} onClick={() => setIsModalOpen(true)} />
      <Modal
        width="100vw"
        title={(
          <Row justify="space-between">
            <Col>
              <h3>{translate('view_schema')}</h3>
            </Col>
            <Col>
              <Button onClick={handleCopyJson} type="primary">
                Copy
              </Button>
            </Col>
          </Row>
        )}
        open={isModalOpen}
        closable={false}
        
        footer={(
          <div>
            <Button type="primary" onClick={handleOk} disabled={Boolean(error)}>
              {translate('done')}
            </Button>
            <Button type="link" onClick={handleCancel}>
              {translate('cancel')}
            </Button>
          </div>
        )}
      >
        {isModalOpen && (
          <Editor
            height="500px"
            width="100%"
            value={JSON.stringify(removeSchemaKey(value), null, 2)}
            onChange={handleChange}
            onMount={(editor) => {
              setTimeout(() => {
                editor.getAction('editor.action.formatDocument')?.run();
              }, 400);
            }}
          />
        )}
        <span style={{ color: 'red' }}>{error}</span>
      </Modal>
    </>
  );
}

export default ViewSchema;
