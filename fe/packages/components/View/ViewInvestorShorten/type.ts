import { TFetchBase } from '@packages/hooks/useFetchBase';
import { AnyObject } from 'antd/es/_util/type';

export type TAsyncViewInvestorShortenProps = {
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

export type TViewInvestorShorten = TAsyncViewInvestorShortenProps & TFetchBase;

export type IPropsValue = {
  key: string;
  value: string;
  id: string;
};
