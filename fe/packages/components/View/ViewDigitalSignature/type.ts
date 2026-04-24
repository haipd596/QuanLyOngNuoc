import { ButtonProps, UploadProps } from 'antd';

export type TSignatureResult = {
  Status: number;
  Message: string;
  FileName: string;
  FileServer: string;
  DocumentNumber?: unknown;
  DocumentDate?: unknown;
  Stamped: number;
};

export type SubmitSignatureType = {
  FileName?: string;
  PhysicalName?: string;
  NodeId?: string;
  linkMdm: string;
  onDeleteFile: () => void;
};

export type filePDFType = {
  linkMdm: string;
  FileName?: string
};

export interface ViewUploadPropsSignature extends UploadProps {
  action: string;
  responseKey: string;
  value: any,
  buttonContent: string,
  buttonType: ButtonProps['type'],
  disabled: boolean,
  headers: any,
  fileUploadkey: string;
  fileUploadHandler: string;
  onChange: (value: any) => void,
  linkMdm: string;
}
