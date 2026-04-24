import { IPropsValue } from '@packages/components/View/ViewInfo/type';
import { getFieldsRemaining } from '@packages/utils/fields';
import { insertJsonToSchema } from '@packages/utils/insertJsonToSchema';
import { overrideSchemaBase } from '@packages/utils/overrideField';
import { UniqId } from '@packages/utils/uniqId';
import { FormProps } from 'antd';
import { FormLayout } from 'antd/es/form/Form';
import _cloneDeep from 'lodash/cloneDeep';
import _isArray from 'lodash/isArray';
import _isEmpty from 'lodash/isEmpty';
import _set from 'lodash/set';
import { THEME_NAMES } from '~/constants/themeColor';
import { TConfigChange } from './fields/fieldConfig';
// eslint-disable-next-line import/no-cycle
import { Field, IField } from './fields/fieldModel';

export interface IConfigViewInfo {
  fieldKey: string;
  listKeyValueInViewInfo?: IPropsValue[]
  fieldsInColumnIndex?: IField['fieldsInColumnIndex'],
}

export interface BaseJsonSchema<T = any> {
  title?: string,
  type?: string,
  layout?: FormProps['layout']
  fields: Field<T>[],
  currentTheme?: string
  requiredForm?: any
}

export interface JsonSchema extends BaseJsonSchema {
  schemaKey?: string,
}

export interface JsonSchemaOutput extends Omit<JsonSchema, 'fields'> {
  fields: {
    fieldName: string,
    key: string,
    configChanged: TConfigChange,
    fieldsInColumnIndex?: IField['fieldsInColumnIndex'],
    isShowField?: IField['isShowField'],
    listKeyValueInViewInfo?: IField['listKeyValueInViewInfo'],
  }[] | JsonSchema['fields']
}

export class Schema implements JsonSchema {
  schemaKey?: string | undefined;

  title?: string | undefined;

  type?: string | undefined;

  fields: Field<any, any>[];

  layout?: FormLayout | undefined;

  currentTheme: string = THEME_NAMES.GREEN;

  constructor(props: JsonSchema) {
    Object.assign(this, props);
    this.layout = props.layout || 'horizontal';
    this.schemaKey = new UniqId('form_key', props.schemaKey).key;
    this.fields = [];
    if (_isArray(props.fields)) {
      this.fields = props.fields.map((field) => new Field(field));
    }
  }

  static isValid(schema: JsonSchema) {
    // if (!schema.schemaKey) {
    //   throw new Error('schema key must be existed');
    // }

    if (_isArray(schema.fields)) {
      schema.fields.forEach(Field.isValid);
    }
  }

  static isDuplicateSchemaKey(schemaKey: string) {
    if (UniqId.ids.includes(schemaKey)) {
      throw new Error('schema id must be uniq');
    }
  }

  static output(schema: JsonSchema): JsonSchemaOutput {
    const { fields, ...rest } = schema;
    const compactField = fields?.map((field) => {
      const {
        configChanged,
        isNotCompactJsonOutput,
      } = field;

      if (isNotCompactJsonOutput) {
        return field;
      }

      return {
        configChanged,
        fieldName: field.fieldName,
        ...getFieldsRemaining(field) as any,
      };
    }) || [];

    return { ...rest, fields: compactField };
  }

  static reconcile(schemaServer: JsonSchemaOutput) {
    const { fields, ...rest } = schemaServer;
    const compactField = fields?.map((_field) => {
      const field = overrideSchemaBase(_cloneDeep(_field));
      if ((field as Field).isNotCompactJsonOutput) {
        return new Field(field);
      }

      const defaultJson = insertJsonToSchema(
        field.fieldName,
        {
          ...getFieldsRemaining(field), // keep needed properties in field
          configChanged: field.configChanged, // keep the config changed
        },
      ).toPlainObject();

      const {
        componentPropsAllowConfig,
        additionsComponentConfig = {},
      } = defaultJson;
      if (!_isEmpty(additionsComponentConfig)) {
        const propertiesNotHas = Object.keys(additionsComponentConfig)
          .filter((key) => (
            !Object.keys(componentPropsAllowConfig).includes(key)
          ));
        if (propertiesNotHas.length) {
          propertiesNotHas.forEach((key) => {
            defaultJson.componentPropsAllowConfig[key] = { ...additionsComponentConfig[key] };
            defaultJson.componentPropsAllowConfig[key].path = `componentPropsAllowConfig.${key}`;
          });
        }
      }

      if (field.configChanged) {
        Object.keys(field.configChanged).forEach((key) => {
          _set(defaultJson, key, field.configChanged[key]);
        });
      }

      return defaultJson;
    }) || [];

    return { ...rest, fields: compactField } as JsonSchema;
  }

  toPlainObject() {
    return { ...this } as JsonSchema;
  }
}
