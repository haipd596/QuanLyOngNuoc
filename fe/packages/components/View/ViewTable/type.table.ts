import { FormInstance, TableProps } from 'antd';
import React, { ReactNode } from 'react';

import { TFormConfigProps } from '@packages/@types';
import { ConfigBasic, IConfigBasic } from '@packages/schema/fields/fieldConfig';
import { Field, IField, IFormItemProps } from '@packages/schema/fields/fieldModel';
import { AnyObject } from 'antd/es/_util/type';
import { ColumnType } from 'antd/es/table';
import { ViewSelectFileFieldsProps } from '../ViewSelectFileFields';
import { ViewUploadProps } from '../ViewUpload';

export enum TYPE_ACTION {
  ADD = 'ADD',
  EDIT = 'EDIT',
  BUILDER = 'BUILDER',
}

type TProps = TFormConfigProps & TableProps;

export type TGroupColumn = {
  title: string,
  selectChildren: string[]
};

export type TUploadColumns = {
  isShowUpload?: boolean,
  isShowSelectFile?: boolean,
  isShowUploadSignature?: boolean,
  isMulti?: boolean,
  configUpload: Field<Partial<ViewUploadProps>, IFormItemProps>,
  configSelectFile: Field<Partial<ViewSelectFileFieldsProps>, IFormItemProps>,
  configUploadSignature:Field<Partial<ViewUploadProps>, IFormItemProps>
};

export interface IPropsTable extends Omit<TProps, 'onChange' | 'columns'> {
  fieldKey: string;
  subForm: IField['subForm'];
  value: AnyObject[],
  onChange: (value: any) => void,
  stylesPropsParseFromJsonTree?: any,
  uploadColumns: TUploadColumns,
  groupColumns: TGroupColumn[],
  fields: IField[],
  columns: TColumnTableDefaultValue[] & TableProps['columns'],
  fieldsInColumnIndex: IField['fieldsInColumnIndex'];
  extraDataSourceField: IField['extraDataSourceField'];
  fieldName: string;
  isShowSummary?: boolean;
}

export type TAddDataFromExtraSource = {
  isShow: boolean,
  config: Field,
  text: string
};

export interface ITableViewProps extends Omit<TableProps, 'key'> {
  form?: FormInstance;
  isHiddenAction?: boolean;
  onChange?: (value: any) => void,
  uploadColumns: TUploadColumns,
  isShowOrderNumber: boolean,
  groupColumns: TGroupColumn[],
  addDataFromExtraSource: TAddDataFromExtraSource,
  modeView: string,
  value: any,
  key: string
  titleModal?: string;
  fieldName: string;
  isShowCheckbox?: boolean;
  fieldKey?: string;
  isShowSummary?: boolean;
  maxRowKey?: string
  maxRowErrorMessage?: string;
  name?: string;
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  record: DataType;
  index: number;
}

export interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

export type TColumnTableDefaultValue = {
  columnDataType: ConfigBasic,
  columnReferenceType?: ConfigBasic,
  fieldConfig?: ConfigBasic<{ defaultValue: Field }>,
  title: string,
  dataIndex: string,
  key: string,
  uniqId?: string,
  width?: number | string,
  required?: boolean,
  message?: string;
  hidden?: boolean;
  isShowColumn?: boolean;
  render?: ColumnType<any>['render'],
  transformDataColumn?: IConfigBasic,
  isInitialized?: boolean,
  isShowSummaryCol?: boolean,
  isColDataDuplicate?: boolean,
};

export type IConfigColumns = {
  defaultValue: TColumnTableDefaultValue[]
};

export interface IDataOptions {
  fieldKey: string;
  options: {
    label: string;
    value: string;
  }[]
}

export interface ITableBuilder {
  columns: TColumnTableDefaultValue[];
  value: any[];
  fieldKey: string;
  version?: number;
  subForm?: IField['subForm'];
  onAddField?: () => void;
  onChange: (data: AnyObject[]) => void;
  isHiddenAction?: boolean,
  uploadColumns: TUploadColumns,
  isShowOrderNumber?: boolean,
  groupColumns: TGroupColumn[],
  modeView: string,
  className?: string | undefined,
  name?: string,
  titleModal?: string;
  fieldName: string;
  addDataFromExtraSource?: {
    isShow: boolean,
    text: string
  },
  subFormInExtraDataSource?: IField['subForm'],
  isShowCheckbox?: boolean,
  isShowSummary?: boolean,
  ['aria-required']?: boolean
  maxRowKey?: string;
  maxRowErrorMessage?: string;
}
export interface IPropsModal {
  openModal: boolean,
  children: ReactNode,
  width: string,
  typeAction: string,
  formRef: React.RefObject<FormInstance<any>>
  onOk: () => void,
  onCancel: () => void,
  onAddData?: () => void,
  onUpdateData?: () => void,
}

export interface IParagraph {
  value: string,
  record: any,
  dataSourceOption?: IDataOptions[];
  rowData: AnyObject
}
