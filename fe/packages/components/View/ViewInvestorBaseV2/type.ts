import { TFetchBase } from '@packages/hooks/useFetchBase';
import { AnyObject } from 'antd/es/_util/type';

export type TAsyncViewInvestorBaseV2Props = {
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

export type TViewInvestorBaseV2 = TAsyncViewInvestorBaseV2Props & TFetchBase;

export type IPropsValue = {
  key: string;
  value: string;
  id: string;
};
