import NotSupport from '@packages/components/NotSupport';
import { AnyObject } from 'antd/es/_util/type';
import _ from 'lodash';
import _get from 'lodash/get';
import _isArray from 'lodash/isArray';
import _isObject from 'lodash/isObject';
import React from 'react';

import { DATE_FORMAT } from '@packages/constants/date';
import { FIELD_NAME } from '@packages/constants/fields';
import message from 'antd/es/message';
import dayjs from 'dayjs';
import _isString from 'lodash/isString';

export type OS = 'Not known' | 'Windows OS' | 'MacOS' | 'UNIX OS' | 'Linux OS';

export const getOperatingSystem = (window: Window & typeof globalThis): OS => {
  let operatingSystem : OS = 'Not known';
  if (window.navigator.appVersion.indexOf('Win') !== -1) {
    operatingSystem = 'Windows OS';
  }
  if (window.navigator.appVersion.indexOf('Mac') !== -1) {
    operatingSystem = 'MacOS';
  }
  if (window.navigator.appVersion.indexOf('X11') !== -1) {
    operatingSystem = 'UNIX OS';
  }
  if (window.navigator.appVersion.indexOf('Linux') !== -1) {
    operatingSystem = 'Linux OS';
  }

  return operatingSystem;
};

export const buildPathDefaultValue = (originalPath: string = '') => {
  if (originalPath) {
    originalPath = `${originalPath}.`;
  }
  return `${originalPath}props.defaultValue`;
};

type TDefineComponent = (
  component: React.FunctionComponent | React.ReactElement | undefined | null,
  extraProps?: AnyObject
) => React.FunctionComponentElement<any> | React.ReactElement;

export function removeAccents(string : string) {
  return string.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

export const defineComponent: TDefineComponent = (...args) => {
  try {
    const [component, extraProps] = args;

    if (React.isValidElement(component)) {
      return React.cloneElement(component, extraProps);
    }

    if (_isObject(component)) {
      return React.createElement(
        component as React.FunctionComponent,
        extraProps,
      );
    }
  } catch (error) {
    return React.createElement(NotSupport);
  }

  return React.createElement(NotSupport);
};

export const isRegex = (obj: any) => obj instanceof RegExp;

export const stringToFunc = (str?: string) => {
  try {
    if (_isString(str) && str) {
      const funcReg = /function [A-Za-z]*\(([^()]*)\)[ \n\t]*{(.*)}/gim;
      const match = funcReg.exec(str.replace(/\n/g, ' '));

      if (match?.length) {
        return {
          // eslint-disable-next-line @typescript-eslint/no-implied-eval
          func: new Function(...match[1].split(','), match[2]),
          errorMessage: '',
        };
      }

      return {
        errorMessage: 'Function is invalid!',
        func: null,
      };
    }
  } catch (error: any) {
    return {
      errorMessage: error.message,
      func: null,
    };
  }

  return {
    errorMessage: 'Function string is empty or invalid',
    func: null,
  };
};

export const BORDER = {
  BORDER_TOP: 'border_top',
  BORDER_LEFT: 'border_left',
  BORDER_RIGHT: 'border_right',
  BORDER_BOTTOM: 'border_bottom',
  BORDER_NONE: 'border_none',
};

// eslint-disable-next-line no-useless-escape
export const isUrlString = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

// export const onClickActionField = (action: string, options: { fieldKey: string }) => {

// }

interface IResponse {
  status: boolean;
  message: string;
}

export const isDuplicateKey = (configs: AnyObject): IResponse => {
  if (_isObject(configs)) {
    const options = _get(configs, 'componentPropsAllowConfig.options.props.defaultValue');

    if (_isArray(options)) {
      const groupedByDataIndex = _.groupBy(options, 'key');
      const duplicatesValue: AnyObject[] = _.filter(
        groupedByDataIndex,
        (group) => group.length > 1,
      );
      const flattenValues = _.flatten(duplicatesValue);
      if (flattenValues.length > 0) {
        return {
          status: true,
          message: `${flattenValues[0]?.key} đã được sử dụng!`,
        };
      }

      return {
        status: false,
        message: 'Tạo field mới thành công!',
      };
    }
    return {
      status: true,
      message: 'Tạo field mới không thành công!',
    };
  }

  return {
    status: true,
    message: 'Tạo field mới không thành công!',
  };
};

export const getAsyncProps = (props: any) => {
  const {
    action,
    queryParams,
    fieldKey,
    pathToSource,
    indexLabel,
    indexValue,
    headers,
    transformDataOption,
    data,
  } = props;

  return {
    action,
    queryParams,
    fieldKey,
    pathToSource,
    indexLabel,
    indexValue,
    headers,
    transformDataOption,
    data,
  };
};

export const getDefaultColumnWrapper = (fieldName: string) => {
  if (fieldName === FIELD_NAME.BUTTON) return 4;

  if (fieldName === FIELD_NAME.UPLOAD || fieldName === FIELD_NAME.VIEW_SELECT_FILE) return 12;

  return 24;
};

export const getUserIdPageContext = () => {
  try {
    // @ts-expect-error: _spPageContextInfo
    const { userId } = _spPageContextInfo;

    return userId;
  } catch (error) {
    console.error('Can not get userId from _spPageContextInfo', error);
    // 193: nguoi dung
    // 549: doannh nghiep
    // return '549';
    return 193;
    return null;
  }
};

export const getWebAbsoluteUrlPageContext = () => {
  try {
    // @ts-expect-error: webAbsoluteUrl
    const { webAbsoluteUrl } = _spPageContextInfo;
    console.log("webAbsoluteUrl::", webAbsoluteUrl)
    return webAbsoluteUrl;
  } catch (error) {
    console.error('Can not get webAbsoluteUrl from _spPageContextInfo', error);
    // 193: nguoi dung
    // 549: doannh nghiep
    // return '549';
    // return 193;
    return import.meta.env.VITE_API_DVC_URL;
  }
};

export const isDuplicate = (data: any, path: string) => {
  let count = 0;

  const mapValues = _.map(data, (item) => _.get(item, path));

  data.forEach((item: any) => {
    const value = _get(item, path);

    if (_.filter(mapValues, (_item) => _.isEqual(_item, value)).length >= 2) {
      count += 1;
    }
  });

  return count >= 2;
};

export const SPECIFIC_HIDDEN_KEYS = ['ThuTuXuLy', 'Table', 'Table2Line', 'Single', 'INPUT_FUNCTION'];

export const SPECIFIC_KEYS_HIDDEN_WHEN_MAPPING = ['ThuTuXuLy', 'Table', 'Table2Line', 'Single', 'Reference'];

export const SPECIFIC_KEYS_WHEN_MAPPING = ['TEXT_VIEW', 'GROUP_FIELDS', 'TAB', 'COLUMN_FIELD', 'INPUT_FUNCTION', 'TABLE', 'CHECKBOX_TOGGLE'];

export const F_ADDRESS_REPLACEMENT = {
  TinhId: 'INPUT_NUMBER',
  TinhIdHidden: 'INPUT',
  HuyenId: 'INPUT_NUMBER',
  HuyenIdHidden: 'INPUT',
  XaId: 'INPUT_NUMBER',
  XaIdHidden: 'INPUT',
};

export const onValidateFileThanhPhanHoSoQuyDinh = (objValue: any): boolean => {
  const _getValueHoSoQuyDinh = _get(objValue, 'ThanhPhanHoSoQD', []);
  if (_isArray(_getValueHoSoQuyDinh) && _getValueHoSoQuyDinh.length > 0) {
    // Kiểm tra nếu có bất kỳ phần tử nào trong mảng không có file đính kèm và BatBuoc = 1

    const _findFile = _getValueHoSoQuyDinh.find((_i) => {
      return _get(_i, 'BatBuoc') === 1 && !_get(_i, 'file');
    });

    if (_findFile) {
      message.error(`Vui lòng chọn tệp đính kèm: [${_get(_findFile, 'name')}]`);
      return true;
    }
  }
  return false;
};

export const onValidateThanhPhanHoSoKhac = (fields: any, objValue: any): boolean => {
  const _allField = fields.filter(
    (item: any) => item.fieldName !== FIELD_NAME.BUTTON
    && item.fieldName === FIELD_NAME.FIELD_TABLE_SINGLE,
  );
  const _targetKeyFieldTableSingle = _allField.map(
    (item: any) => item?.formItemPropsAllowConfig?.serverPayloadKey?.props?.defaultValue,
  );

  const _getFieldKey = _targetKeyFieldTableSingle.filter((item: any) => item);

  const _targetValueThanhPhanHoSoKhac = _getFieldKey.reduce((acc: any, key: any) => {
    if (acc !== undefined) return acc;
    const value = _get(objValue, key);

    return value !== undefined ? value : acc;
  }, undefined) ?? [];

  if (_isArray(_targetValueThanhPhanHoSoKhac) && _targetValueThanhPhanHoSoKhac.length > 0) {
    const targetFieldConfig = _allField.find((f: any) => {
      const k = f?.formItemPropsAllowConfig?.serverPayloadKey?.props?.defaultValue;

      return _get(objValue, k) === _targetValueThanhPhanHoSoKhac;
    });
    // eslint-disable-next-line max-len
    const allColumns: any[] = targetFieldConfig?.componentPropsAllowConfig?.columns?.props?.defaultValue ?? [];

    const _targetEachValue = _targetValueThanhPhanHoSoKhac.find((_i) => {
      const emptyKeys = Object.entries(_i)
        .filter(([key]) => key !== 'Reference' && key !== 'key')
        .filter(([, value]) => value === '')
        .map(([key]) => key);

      if (emptyKeys.length > 0) {
        const missingTitles = emptyKeys
          .map((key) => {
            const col = allColumns.find((_col: any) => _col.dataIndex === key);

            return col?.title ?? key;
          })
          .filter(Boolean);

        message.error(`Vui lòng nhập: ${missingTitles.join(', ')}`);
        return true;
      }

      return false;
    });

    if (_targetEachValue) return true;
  }
  return false;
};

/**
 * Đệ quy chuyển tất cả các giá trị kiểu `dayjs` trong một object bất kỳ
 * thành chuỗi định dạng 'DD-MM-YYYY'.
 *
 * - Nếu giá trị là `dayjs`, chuyển thành string theo định dạng ngày.
 * - Nếu là mảng, xử lý từng phần tử trong mảng.
 * - Nếu là object, xử lý đệ quy các key bên trong object.
 * - Các giá trị khác được giữ nguyên.
 *
 * @param obj - Dữ liệu đầu vào có thể là object, array, hoặc primitive.
 * @returns Dữ liệu mới với các trường `dayjs` đã được chuyển thành string.
 *
 * @example
 * ```ts
 * convertDayjsToString({
 *   name: 'Tiến',
 *   date: dayjs('2025-01-01'),
 *   nested: {
 *     birthday: dayjs('2000-10-10')
 *   }
 * });
 * // =>
 * // {
 * //   name: 'Tiến',
 * //   date: '01-01-2025',
 * //   nested: { birthday: '10-10-2000' }
 * // }
 * ```
 */

export const convertDayjsToString = (obj: any): any => {
  if (obj == null) return obj;

  if (dayjs.isDayjs(obj)) {
    return obj.format(DATE_FORMAT.DD_MM_YYYY);
  }

  if (Array.isArray(obj)) {
    return obj.map(convertDayjsToString);
  }

  if (_.isObject(obj) && !_.isDate(obj) && typeof obj !== 'function' && !dayjs.isDayjs(obj)) {
    return _.mapValues(obj, convertDayjsToString);
  }

  return obj;
};

type Callback = (data: any) => void;

const subscribers: Callback[] = [];

export const subscribeMutualExclusion = (cb: Callback) => {
  subscribers.push(cb);
  return () => {
    const idx = subscribers.indexOf(cb);
    if (idx >= 0) subscribers.splice(idx, 1);
  };
};

export const publishMutualExclusion = (payload: { groupName: string; sourceKey: string }) => {
  subscribers.forEach((cb) => cb(payload));
};
