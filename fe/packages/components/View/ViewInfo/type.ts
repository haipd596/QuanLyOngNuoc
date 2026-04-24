import { TFetchBase } from '@packages/hooks/useFetchBase';
import { FormInstance } from 'antd';
import { AnyObject } from 'antd/es/_util/type';

export type TAsyncViewInfoProps = {
  fieldKey: string,
  pathToSource: string,
  listKeyValueInViewInfo: IPropsValue[];
  onChange: (data: AnyObject) => void,
  value: any,
  modeView: string
  name: string
} & TFetchBase & {
  children: React.ReactNode
};

export type TViewInfo = TAsyncViewInfoProps & TFetchBase;
export type TViewDocument = TAsyncViewInfoProps & TFetchBase;

export type IPropsWrapperColumns = {
  dataValues: IPropsValue[];
  dataSource: AnyObject | undefined;
  onDeleteKey: (key: string) => void;
  onEditKey: (item: IPropsValue) => void;
};

export type IPropsFormModal = {
  open: boolean;
  form: FormInstance
  onSubmit: (values: IPropsValue) => void;
  onCancel: () => void;
  onClose: () => void;
};

export type IPropsValue = {
  key: string;
  value: string;
  id: string;
};
