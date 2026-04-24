import { isConfigBasicType, isConfigAdvanceType } from '@packages/utils/configFields';
import _isObject from 'lodash/isObject';
import { AnyObject } from 'antd/es/_util/type';
import _flattenDeep from 'lodash/flattenDeep';
import _set from 'lodash/set';
import _cloneDeep from 'lodash/cloneDeep';
import _isEmpty from 'lodash/isEmpty';
import { TPropConfig } from '@packages/schema/fields/fieldConfig';

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

const recursiveGetConfig = (config: AnyObject, basePath: string): TComponents[] => {
  if (_isObject(config)) {
    return Object.keys(config).reduce((acc, cur) => {
      let _basePath = `${basePath}.${cur}`;
      const { children, type, props } = config[cur] || {};
      if (_isObject(children) && isConfigAdvanceType(type) && !_isEmpty(children)) {
        _basePath += '.children';
        acc.push(recursiveGetConfig(children, _basePath));
        return acc;
      }

      if (_isObject(props) && isConfigBasicType(type)) {
        acc.push(_basePath);
      }
      return acc;
    }, [] as any);
  }

  return [];
};

// Generate path for each key in "config" object
export const generatePath = <T>(config: TPropConfig<T>, prefix: string) => {
  const _config = _cloneDeep(config);

  Object.keys(_config).forEach((key) => {
    // @ts-expect-error should work
    if (_config[key]) {
      // @ts-expect-error should work
      const { type, children } = _config[key];

      if (_isObject(children) && isConfigAdvanceType(type)) {
        const basePath = 'children';
        const contents = recursiveGetConfig(children, basePath);
        _flattenDeep(contents).forEach((path) => {
          // @ts-expect-error should work
          _config[key] = _set((_config[key]), `${path}.path`, `${prefix}.${key}.${path}`);
        });
        return;
      }

      // @ts-expect-error should work
      _config[key].path = `${prefix}.${key}`;
    }
  });

  return _config;
};
