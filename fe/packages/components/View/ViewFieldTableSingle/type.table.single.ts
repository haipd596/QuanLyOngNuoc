import { ConfigBasic } from '@packages/schema/fields/fieldConfig';
import {
  Form, FormInstance, GetRef, Table, TableProps,
} from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { Rule } from 'antd/es/form';
import React from 'react';

export interface ITableSingleFieldProps extends TableProps {
  form?: FormInstance;
}

export type TColumnSingleField = {
  columnDataType: ConfigBasic,
  title: string,
  dataIndex: string,
  key: string,
  width: number | string,
  required: boolean,
  message: string
};

export type IConfigColumnSingleField = {
  defaultValue: TColumnSingleField[]
};

export type FormInstanceContext<T> = GetRef<typeof Form<T>>;

export interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex:string;
  record: AnyObject;
  rules: Rule[];
  fieldName: string;
  fieldKeyName: string;
  handleSaveDataField: (record: any) => void;
  listDataSource?: any[]
}

type EditableTableProps = Parameters<typeof Table>[0];

export type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

export const EditableContext = React.createContext<FormInstanceContext<any> | null>(null);
