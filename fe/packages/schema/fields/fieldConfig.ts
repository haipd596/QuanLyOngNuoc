/* eslint-disable max-classes-per-file */
import { AnyObject } from 'antd/es/_util/type';

type ComponentType = string;

interface IConfigAdvance extends ICalculableFn {
  type: ComponentType,
  label: string,
  children: { [x: string]: any }
}

export interface IConfigBasic<T = AnyObject> extends ICalculableFn {
  type: ComponentType;
  props: T;
  path?: string;
  individualStyle?: any;
}

export interface ICalculableFn {
  useCalculable?: boolean,
  calculateFn?: string
}

interface IInitData {
  initFieldData?: IConfigBasic,
  wrapperColumnNumber?: IConfigBasic,
  isShowInDetailModeView?: IConfigBasic,
  isShowInModeView?: IConfigBasic,
  label?: IConfigBasic,
  placeholder?: IConfigBasic,
  help?: IConfigBasic,
  rules?: IConfigBasic,
  hideIf?: IConfigBasic,
  serverPayloadKey?: IConfigBasic,
  labelCheckBox?: IConfigBasic
  disabled?: IConfigBasic
}

export type BaseConfig<T = any> = {
  [x in keyof T]: IConfigBasic | IConfigAdvance
};

export type TStyleConfig<T = any> = BaseConfig<T>;
export type TPropConfig<T> = BaseConfig<T> & IInitData;

export class ConfigAdvance implements IConfigAdvance {
  type: ComponentType;

  label: string;

  children: { [x: string]: any; };

  constructor(props: IConfigAdvance) {
    this.type = props.type;
    this.label = props.label;
    this.children = props.children;
  }
}

export class ConfigBasic<T = AnyObject> implements IConfigBasic<T> {
  type: ComponentType;

  defaultValue: any;

  props: T;

  path?: string;

  constructor(props: IConfigBasic<T>) {
    this.type = props.type;
    this.props = props.props;
    this.path = props.path;
  }
}

export type TConfigChange = { [x: string]: any };
