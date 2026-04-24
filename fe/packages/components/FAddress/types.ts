import { TModeView } from '@packages/@types';
import { ColProps } from 'antd';
import { FormInstance } from 'antd/lib';
import { AnyObject } from 'antd/lib/_util/type';
import { FormLabelAlign } from 'antd/lib/form/interface';
import React from 'react';

export interface IDistricts {
  name: string;
  code: number;
  code_name: string;
  division_type: WelcomeDivisionType;
  phone_code: number;
  districts: District[];
}

export interface District {
  name: string;
  code_name: string;
  division_type: DistrictDivisionType;
  short_code_name: string;
}

export enum DistrictDivisionType {
  Huyện = 'huyện',
  Quận = 'quận',
  ThànhPhố = 'thành phố',
  ThịXã = 'thị xã',
}

export enum WelcomeDivisionType {
  ThànhPhốTrungƯơng = 'thành phố trung ương',
  Tỉnh = 'tỉnh',
}

export interface IWards {
  name: string;
  code: number;
  code_name: string;
  division_type: DivisionType;
  short_code_name: string;
  wards?: IWards[];
}

export enum DivisionType {
  Huyện = 'huyện',
  Phường = 'phường',
  Quận = 'quận',
  ThànhPhố = 'thành phố',
  ThịTrấn = 'thị trấn',
  ThịXã = 'thị xã',
  Xã = 'xã',
}

export interface IProvinces {
  name: string;
  code_name: string;
  code: number;
  division_type: IProvincesType;
  phone_code: number;
}

export enum IProvincesType {
  ThànhPhốTrungƯơng = 'thành phố trung ương',
  Tỉnh = 'tỉnh',
}

export type IOptions = {
  label: React.ReactNode;
  name: string;
  placeholder: React.ReactNode;
  initialValue?: string;
  required?: boolean,
  colConfig: ColProps
};

export type IAgencies = {
  label: React.ReactNode;
  placeholder: React.ReactNode;
  required?: boolean;
};

export type ILayout = {
  labelCol: ColProps;
  labelAlign: FormLabelAlign
};

export type IProps = {
  onValuesChange?: (changedValues: AnyObject, values: AnyObject) => void;
  showSearch: boolean;
  optionsProvince: IOptions;
  optionsDistrict?: IOptions;
  optionsWard?: IOptions;
  optionsLayout?: ILayout;
  isShowDistrict: boolean;
  isShowWard: boolean;
  disabled?: boolean;
  form: FormInstance,
  gutter: any,
  modeView: TModeView,
  disabledCurrentLocation?: boolean
  isShowDetailAddress?: boolean
  isAddressWrappedSpecial?: boolean
  optionsAgency?: IAgencies
};

export type ICode = {
  name: string;
  code_name: string;
  short_code_name: string;
};

export type IProvince = {
  label: string;
  value: string;
  districts: IDistrict[]
};

export type IWard = {
  label: string;
  value: string;
};

export type IDistrict = {
  label: string;
  value: string;
  wards: IWard[]
};
