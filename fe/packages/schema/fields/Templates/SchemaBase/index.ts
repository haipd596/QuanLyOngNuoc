import { TEMPLATE_NAME } from '@packages/constants/template';
import { Schema } from '@packages/main/Forms';
import schemaBaseDuThao from '../../../../../schemaTemplates/base.schema.duthao.json';
import schemaEmail from '../../../../../schemaTemplates/base.schema.email.json';
import schemaBase from '../../../../../schemaTemplates/base.schema.json';
import schemaPhoneNumber from '../../../../../schemaTemplates/base.schema.phone.number.json';

export const createSchemaBase = () => {
  const newSchema = Schema.reconcile(schemaBase as any);

  return {
    type: TEMPLATE_NAME.SCHEMA_BASE,
    schema: newSchema,
  };
};

export const createSchemaBaseDuThao = () => {
  const newSchema = Schema.reconcile(schemaBaseDuThao as any);

  return {
    type: TEMPLATE_NAME.SCHEMA_BASE_DUTHAO,
    schema: newSchema,
  };
};

export const createSchemaPhoneNumber = () => {
  const newSchema = Schema.reconcile(schemaPhoneNumber as any);

  return {
    type: TEMPLATE_NAME.PHONE_NUMBER,
    schema: newSchema,
  };
};

export const createSchemaEmail = () => {
  const newSchema = Schema.reconcile(schemaEmail as any);

  return {
    type: TEMPLATE_NAME.EMAIL,
    schema: newSchema,
  };
};
