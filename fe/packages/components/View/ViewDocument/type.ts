import { NamePath } from 'antd/es/form/interface';
import { ReactNode } from 'react';

// Document modal types
export type IDocumentModal = {
  children: ReactNode;
  isOpen: boolean;
  onOk: () => void;
  onCancel: () => void;
};

// Select address type
export type SelectAddressType = {
  name: (string | number)[] | NamePath | undefined
};

// Thread Three type
export type ThreadThreeType = {
  onChange: () => void;
  isChecked: boolean;
};

export type ThreadThreeFormType = {
  isChecked: boolean;
};

export type TItemsThreadThree = {
  title: string;
  subtitle?: string;
  form: ReactNode;
  isShow: boolean;
};

// ThreadLand1 type
export type ThreadLandType = {
  isChecked: boolean;
};
