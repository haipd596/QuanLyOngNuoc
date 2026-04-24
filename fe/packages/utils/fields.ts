import { TFormStepProps } from '@packages/components/View/FormStep/type';
import { FIELD_WRAP_IN_FORM } from '@packages/constants/fields';
import { Field, IField } from '@packages/schema/fields/fieldModel';
import { JsonSchema, JsonSchemaOutput } from '@packages/schema/schemaModel';
import { Form } from 'antd';
import _filter from 'lodash/filter';
import _findIndex from 'lodash/findIndex';
import _get from 'lodash/get';
import _isArray from 'lodash/isArray';
import _isEmpty from 'lodash/isEmpty';
import _isPlainObject from 'lodash/isPlainObject';
import _omit from 'lodash/omit';

export const getFieldSchemaByKey = (fields: Field[], key: string | null) => {
  const index = fields.findIndex(({ key: _key }) => key === _key);

  if (index > -1) {
    return { field: fields[index], index };
  }

  return null;
};

export const getFieldsByColumnIndex = (fields: Field[], fieldsInColumnIndex: TFormStepProps['fieldsInColumnIndex']) => fields
  .map((item) => {
    const colKey: any = fieldsInColumnIndex?.find(({ fieldKeyCol }) => fieldKeyCol === item.key);
    if (colKey) {
      return {
        ...item,
        isShowField: true,
        columnIndex: colKey.columnIndex,
      };
    }

    return null;
  })
  .filter((item) => !_isEmpty(item));

export const getFieldsByColumnIndexSpecial = (
  fields: Field[],
  fieldsInColumnIndex: TFormStepProps['fieldsInColumnIndex'],
) => {
  if (!_isArray(fieldsInColumnIndex)) return fields;

  const fieldMap = new Map(fields.map((f) => [f.key, f]));

  const orderedFields: Field[] = [];

  const sorted = [...fieldsInColumnIndex].sort((a: any, b: any) => a.columnIndex - b.columnIndex);

  sorted.forEach(({ fieldKeyCol, columnIndex }) => {
    const field: any = fieldMap.get(fieldKeyCol);
    if (field) {
      orderedFields.push({
        ...field,
        isShowField: true,
        columnIndex,
      });
    }
  });

  return orderedFields;
};

export const removeCaptchaFields = (data: any) => {
  if (typeof data !== 'object' || data === null) return data;

  Object.entries(data).forEach(([key, value]) => {
    if (key.toLowerCase().includes('captcha')) {
      delete data[key];
    } else if (typeof value === 'object') {
      removeCaptchaFields(value);
    }
  });
  return data;
};

export const getSchemaByKey = (schemas: JsonSchema[], key: string | undefined) => {
  const schemaIndex = _findIndex(schemas, { schemaKey: key });

  if (schemaIndex > -1) {
    return {
      index: schemaIndex,
      schema: schemas[schemaIndex],
    };
  }

  return {
    index: -1,
    schema: {
      title: `form_${Date.now()}`,
      schemaKey: key,
      fields: [],
    } as JsonSchema,
  };
};

export const isNeedWrapFormItem = (fieldName: string) => (
  FIELD_WRAP_IN_FORM.some((key) => key === fieldName)
);

export const getFieldsRemaining = (field: JsonSchemaOutput['fields'][0]) => {
  const keyPicked: (keyof IField)[] = ['componentPropsAllowConfig', 'formItemPropsAllowConfig', 'styleComponentAllowConfig', 'styleLabelAllowConfig', 'styleWrapperAllowConfig'];

  return _omit(field, keyPicked);
};

/**
 * Flatten all fields in form (fields in sub form and field in fieldInColumnIndex)
 * @param originalFields fields in schema (fields are not flatten)
 * @param startFormKey the specific field we want to flatten
 * @returns IField[]
 */
export const flattenFieldsInSchema = (originalFields: IField[], startFormKey?: string) => {
  let flattenedFields: IField[] = [];
  let flattenFrom = originalFields;

  if (startFormKey) {
    flattenFrom = _filter(originalFields, { key: startFormKey });
  }

  const recursive = (fields: IField[]) => {
    fields.forEach((field) => {
      if (!_isEmpty(field.fieldsInColumnIndex)) {
        const keyCols = field?.fieldsInColumnIndex?.map(({ fieldKeyCol }) => fieldKeyCol) || [];
        const fieldFound = originalFields.filter(({ key }) => keyCols.includes(key));

        recursive(fieldFound);
      }

      if (!_isEmpty(field.subForm)) {
        // normal sub form
        if (Object.keys(field.subForm).includes('fields')) {
          flattenedFields = flattenedFields.concat(field.subForm.fields);
        } else { // subForm in digital paper
          Object.keys(field.subForm).forEach((key) => {
            const fieldInSubFormDigitalPaper = _get(field, `subForm.${key}.fields`, []);
            recursive(fieldInSubFormDigitalPaper as IField[]);
          });
        }
      }

      flattenedFields.push(field);
    });
  };

  recursive(flattenFrom);

  return flattenedFields;
};

export const flattenSubFormSchemas = (originalFields: IField[]) => {
  let flattenedFields: JsonSchema[] = [];

  const recursive = (fields: IField[]) => {
    fields.forEach((field) => {
      if (!_isEmpty(field.subForm)) {
        // normal sub form
        if (Object.keys(field.subForm).includes('fields')) {
          flattenedFields = flattenedFields.concat(field.subForm);
        } else { // subForm in digital paper
          Object.keys(field.subForm).forEach((key) => {
            const fieldInSubFormDigitalPaper = _get(field, `subForm.${key}.fields`, []);
            const subFormInDigitalPaper = _get(field, `subForm.${key}`, null);
            if (subFormInDigitalPaper) {
              flattenedFields = flattenedFields.concat(subFormInDigitalPaper);
            }
            recursive(fieldInSubFormDigitalPaper as IField[]);
          });
        }
      }
    });
  };

  recursive(originalFields);

  return flattenedFields;
};

/**
 * @param filePath Là field name của input.
 * @returns Giá trị input dựa vào filed name
 */

export const getReferenceKeyFile = (serverPayloadKey: string, filedName: string[]) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = Form.useFormInstance();
  const fieldInputKey = form.getFieldValue(serverPayloadKey);

  if (_isArray(fieldInputKey)) {
    const findKey = filedName.find((item) => fieldInputKey[0][item]);
    if (findKey) return findKey;
  }

  if (_isPlainObject(fieldInputKey)) {
    const findKey = filedName.find((item) => fieldInputKey[item]);
    if (findKey) return findKey;
  }

  return fieldInputKey;
};

export const generateFieldChildInColumn = (childFieldKey: string, parentFieldKey: string) => `${childFieldKey}_${parentFieldKey}`;
