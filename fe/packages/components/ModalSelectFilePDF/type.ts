import { AnyObject } from 'antd/es/_util/type';
import { DocumentEnum } from './enum';

export type ListDocumentMyDataType = {
  onDownloadFile: (values: AnyObject) => void;
  tabKey: DocumentEnum
  keySearch: string;
};

export type ListDocumentMyResponseType = {
  PhysicalName: string;
  FileName: string;
  NodeId: string;
};

export type ListDataWareHouseType = {
  onDownloadFile: (values: AnyObject) => void;
  tabKey: DocumentEnum
  keySearch: string;
};
