import { FieldType } from './types';

export const listkeyCty: {
  key: string;
  value: string;
  id: string;
  default: string;
  serverPayloadKey: string;
}[] = [
  {
    key: 'Tên tổ chức',
    value: 'NAME',
    id: '_odf8o17AnI1',
    default: 'Test Name',
    serverPayloadKey: 'NAME',
  },
  {
    key: 'Số GPĐKKD/Số QĐ thành lập',
    value: 'ENTERPRISE_GDT_CODE',
    id: '_odf8o17AnI21',
    default: 'Test ENTERPRISE',
    serverPayloadKey: 'ENTERPRISE_GDT_CODE',
  },
  {
    key: 'Ngày cấp',
    value: 'IMP_BUSINESS_CODE',
    id: '_odf8o17AnI22',
    default: 'Test BUSINESS',
    serverPayloadKey: 'IMP_BUSINESS_CODE',
  },
  {
    key: 'Nơi cấp',
    value: 'SHORT_NAME',
    id: '_odf8o17AnI3',
    default: 'Test SHORT_NAME',
    serverPayloadKey: 'SHORT_NAME',
  },
  {
    key: 'Số điện thoại',
    value: 'NAME_F',
    id: '_odf8o17An3I4',
    default: 'Test NAME_F',
    serverPayloadKey: 'NAME_F',
  },
  {
    key: 'Email',
    value: 'ENTERPRISE_TYPE_NAME',
    id: '_odf8o17AnI23',
    default: 'Test ENTERPRISE_TYPE_NAME',
    serverPayloadKey: 'ENTERPRISE_TYPE_NAME',
  },
  {
    key: 'Fax',
    value: 'FOUNDING_DATE',
    id: '_odf8o17AnfI54',
    default: 'Test FOUNDING_DATE',
    serverPayloadKey: 'FOUNDING_DATE',
  },
  {
    key: 'Địa Chỉ',
    value: 'AddressFullText',
    id: '_odf8of17AnI635',
    default: 'Test LEGAL_NAMES',
    serverPayloadKey: 'LEGAL_NAMES',
  },
  {
    key: 'Người đại diện',
    value: 'LEGAL_NAMES',
    id: '_odf8o17AnfI52',
    default: 'Test LEGAL_NAMES',
    serverPayloadKey: 'LEGAL_NAMES',
  },
  {
    key: 'Chức vụ',
    value: 'LEGAL_NAMES',
    id: '_odf8of17AnI61',
    default: 'Test LEGAL_NAMES',
    serverPayloadKey: 'LEGAL_NAMES',
  },
];

export const listkeyPerson: {
  key: string;
  value: string;
  id: string;
  default: string;
  serverPayloadKey: string;
}[] = [
  {
    key: 'Họ tên',
    value: 'NAME',
    id: '_odf8o17AnI1',
    default: 'Test Name',
    serverPayloadKey: 'NAME',
  },
  {
    key: 'Số định danh',
    value: 'ENTERPRISE_ID',
    id: '_odf8o17AnI26',
    default: 'Test ENTERPRISE',
    serverPayloadKey: 'ENTERPRISE_GDT_CODE',
  },
  {
    key: 'Ngày cấp',
    value: 'IMP_BUSINESS_CODE',
    id: '_odf8o17AnI27',
    default: 'Test BUSINESS',
    serverPayloadKey: 'IMP_BUSINESS_CODE',
  },
  {
    key: 'Nơi cấp',
    value: 'SHORT_NAME',
    id: '_odf8o17AnI3',
    default: 'Test SHORT_NAME',
    serverPayloadKey: 'SHORT_NAME',
  },
  {
    key: 'Điện thoại',
    value: 'NAME_F',
    id: '_odf8o17An3I4',
    default: 'Test NAME_F',
    serverPayloadKey: 'NAME_F',
  },
  {
    key: 'Fax',
    value: 'ENTERPRISE_TYPE_NAME',
    id: '_odf8o17AnI28',
    default: 'Test ENTERPRISE_TYPE_NAME',
    serverPayloadKey: 'ENTERPRISE_TYPE_NAME',
  },
  {
    key: 'Email',
    value: 'FOUNDING_DATE',
    id: '_odf8o17AnfI5',
    default: 'Test FOUNDING_DATE',
    serverPayloadKey: 'FOUNDING_DATE',
  },
  {
    key: 'Địa chỉ thường trú',
    value: 'LEGAL_NAMES',
    id: '_odf8of17AnI6',
    default: 'Test LEGAL_NAMES',
    serverPayloadKey: 'LEGAL_NAMES',
  },
];

export const initFormValuesEmpty: FieldType = {
  ENTERPRISE_ID: '',
  NAME: '',
  ENTERPRISE_GDT_CODE: '',
  IMP_BUSINESS_CODE: '',
  SHORT_NAME: '',
  NAME_F: '',
  ENTERPRISE_TYPE_NAME: '',
  FOUNDING_DATE: '',
  AddressFullText: '',
  CityName: '',
  DistrictName: '',
  ENTERPRISE_STATUS: '',
  WardName: '',
  LEGAL_NAMES: '',
  CAPITAL_AMOUNT: '',
};
