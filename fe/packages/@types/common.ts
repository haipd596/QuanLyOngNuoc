import { JsonSchema } from '@packages/schema/schemaModel';
import { FormInstance } from 'antd';

export type TModeView = string;

export type TFunction<T = any> = (params: T, cb: any) => any;

export type TOnClickActionField = (
  ((action: string, options: { fieldKey: string, [x: string]: any }) => boolean | void)
);

export type TFormConfigProps = {
  schema: JsonSchema,
  modeView: TModeView,
  isModeEditModal?: boolean;
  onFieldsRender?: (output: any) => any,
  onClickActionField?: TOnClickActionField
};

export type TCommonConfigArray = {
  isAddable: boolean,
};

export type TSubFormInManager = {
  key: string,
  label?: string,
  error?: string,
  formInstance: FormInstance
};

export type TJsonProperties = {
  path: string;
  value: any;
  fieldKey: string,
  serverPayloadKey: string
};
