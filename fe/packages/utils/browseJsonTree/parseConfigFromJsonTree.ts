import { CONFIG_FIELDS, isConfigAdvanceType, isConfigBasicType } from '@packages/utils/configFields';
import { AnyObject } from 'antd/es/_util/type';
import _flattenDeep from 'lodash/flattenDeep';
import _isEmpty from 'lodash/isEmpty';
import _isObject from 'lodash/isObject';
import _uniqueId from 'lodash/uniqueId';

export type TComponents = {
  component: any,
  label?: string,
  props: AnyObject,
  path: string,
  key: string,
  useCalculable?: boolean,
  calculateFnc?: string
};

export type TComponentRender = {
  label?: string,
  content: TComponents[],
};

const recursiveGetConfig = (config: AnyObject): TComponents[] => {
  if (_isObject(config)) {
    return Object.keys(config).reduce((acc, cur) => {
      const {
        children, type, props, useCalculable, calculableFn, path,
      } = config[cur] || {};
      if (_isObject(children) && isConfigAdvanceType(type) && !_isEmpty(children)) {
        acc.push(recursiveGetConfig(children));
        return acc;
      }

      if (_isObject(props) && isConfigBasicType(type)) {
        acc.push({
          component: CONFIG_FIELDS[type],
          label: cur,
          props,
          path,
          key: _uniqueId(),
          useCalculable,
          calculableFn,
        });
      }
      return acc;
    }, [] as any);
  }

  return [];
};

/**
 * Parses a JSON tree configuration
 * and returns a Promise that resolves to an array of TComponentRender objects.
 *
 * @param {AnyObject} config - The configuration object to parse. Defaults to an empty object.
 * @return {Promise<TComponentRender[]>}
 * A Promise that resolves to an array of TComponentRender objects.
 */
export const parseConfigFromJsonTree = (
  config: AnyObject = {},
) => (
  new Promise<TComponentRender[]>((resolve) => {
    const _configComponentForField: TComponentRender[] = [];

    Object.keys(config).forEach((key) => {
      if (config[key]) {
        const {
          type, children, props, useCalculable, calculateFnc, path,
        } = config[key];

        if (_isObject(children) && isConfigAdvanceType(type) && !_isEmpty(children)) {
          const contents = recursiveGetConfig(children);
          _configComponentForField.push({
            content: _flattenDeep(contents),
            label: key,
          });
          return;
        }

        _configComponentForField.push({
          content: [
            {
              component: CONFIG_FIELDS[type],
              props,
              path,
              key: _uniqueId(),
              useCalculable,
              calculateFnc,
            },
          ],
          label: key,
        });
      }
    });

    resolve(_configComponentForField);
  })
);

export const SPECLAL_KEY_USERS = [
  'TenTCCN',
  'SoGPDKKD',
  'NgayCap',
  'NoiCap',
  'DiaChi',
  'SoDienThoai',
  'Fax',
  'Email',
  'NguoiDaiDien',
  'ChucVu',
  'Ngay',
  'Thang',
  'Nam',
  'SoCMTND',
  'MaSoThue',
];

export const isSpecialKeyUser = (value: string) => {
  if (value?.trim()) {
    return SPECLAL_KEY_USERS.includes(value.trim());
  }
  return false;
};
