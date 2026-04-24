import { TEMPLATE_NAME } from '@packages/constants/template';
import {
  createSchemaBase,
  createSchemaBaseDuThao,
  createSchemaEmail,
  createSchemaPhoneNumber,
} from '@packages/schema/fields/Templates/SchemaBase';
import { AnyObject } from 'antd/es/_util/type';
import { DEMO_VIEWER } from '~/pages/ViewPage/demo';

export const GENERATE_JSON_BASE_SCHEMA_FUNCTIONS: AnyObject = {
  [TEMPLATE_NAME.SCHEMA_BASE]: createSchemaBase,
  [TEMPLATE_NAME.SCHEMA_BASE_DUTHAO]: createSchemaBaseDuThao,
  [TEMPLATE_NAME.PHONE_NUMBER]: createSchemaPhoneNumber,
  [TEMPLATE_NAME.EMAIL]: createSchemaEmail,
};

export const insertJsonBaseSchema = (
  componentName: string,
) => {
  const transformFunc = GENERATE_JSON_BASE_SCHEMA_FUNCTIONS[componentName] as any;

  if (transformFunc) {
    try {
      const { schema } = transformFunc();

      return schema;
    } catch (error: any) {
      return DEMO_VIEWER;
    }
  }
};
