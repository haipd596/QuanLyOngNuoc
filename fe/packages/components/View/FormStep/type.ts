import { TOnClickActionField } from '@packages/@types';
import { Field, IField } from '@packages/schema/fields/fieldModel';
import type { TabsProps } from 'antd';

export type TFormStepProps = {
  fieldsInColumnIndex: IField['fieldsInColumnIndex'],
  fields: Field[],
  value: any,
  onChange: (values: any) => void,
  fieldKey: string,
  items: NonNullable<TabsProps['items']>,
  isShowProgressBar: boolean,
  stylesPropsParseFromJsonTree: any,
  callBackFunctionName?: string,
  name: string,
  modeView: string,
  onClickActionField?: TOnClickActionField
} & Omit<TabsProps, 'items'>;
