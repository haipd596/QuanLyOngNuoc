import { TAsyncSupportProps } from '@packages/components/AsyncSupport';
import { IField, Schema } from '@packages/main/Forms';
import { IConfigBasic } from '@packages/schema/fields/fieldConfig';
import { TableProps } from 'antd';
import { TUploadColumns } from '../ViewTable/type.table';

export type TAsyncTableProps = {
  pathToSource: string,
  transformDataOption?: any,
  columns: {
    title: string,
    pathToColumnData: string,
    serverPayloadKey: string,
    width: number,
    isShowColumn: boolean;
    transformDataColumn: IConfigBasic
  }[],
  isShowOrderNumber: boolean;
  uploadColumns: TUploadColumns,
  modeView: string,
  fieldName: string;
  onSaveSubForm: (values: any, serverPayloadKey: string) => any
  onChange: (values: any) => any,
  value?: any,
  subForm?: Schema,
  pathToUrlDownload: string;
  isHiddenAction?: boolean;
  pageSize?: number;
  fields: IField[],
  onSelected: any
  isShowCheckbox?: boolean,
  name?: string
} & TAsyncSupportProps & TableProps;
