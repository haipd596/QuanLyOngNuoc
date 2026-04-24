import { TOnClickActionField } from '@packages/@types';
import { Field, IField } from '@packages/schema/fields/fieldModel';
import type { TabsProps } from 'antd';
import { FormProps } from 'antd/lib';

export type TFormTabProps = {
  fieldsInColumnIndex: IField['fieldsInColumnIndex'],
  fields: Field[],
  value: any,
  onChange: (values: any) => void,
  fieldKey: string,
  items: NonNullable<TabsProps['items']>,
  layout: FormProps['layout'],
  labelCol: FormProps['labelCol'],
  isShowProgressBar: boolean,
  stylesPropsParseFromJsonTree: any,
  subForm?: IField['subForm'],
  isDuplicate?: boolean
  onClickActionField?: TOnClickActionField,
  modeView: string,
  name?: string,
} & Omit<TabsProps, 'items'>;
