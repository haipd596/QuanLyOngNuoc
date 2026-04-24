import { TPropConfig } from '@packages/schema/fields/fieldConfig';
import { isConfigAdvanceType, isConfigBasicType } from '@packages/utils/configFields';
import { FormItemProps } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import _isEmpty from 'lodash/isEmpty';
import _isObject from 'lodash/isObject';

const recursiveGetProps = (_config: AnyObject) => {
  if (_isObject(_config)) {
    return Object.keys(_config).reduce((acc, cur) => {
      const { children, type } = _config[cur] || {};
      if (_isObject(children) && isConfigAdvanceType(type) && !_isEmpty(children)) {
        acc[cur] = recursiveGetProps(children);
        return acc;
      }

      if (_isObject(_config[cur]?.props) && isConfigBasicType(type)) {
        acc[cur] = _config[cur].props.defaultValue;
      }

      return acc;
    }, {} as AnyObject);
  }

  return {};
};

export const parsePropsFromJsonTree = (config: AnyObject) => {
  const customProps: AnyObject = {};

  Object.keys(config).forEach((key) => {
    if (config[key]) {
      const { type, children, props } = config[key];

      if (isConfigAdvanceType(type)) {
        customProps[key] = recursiveGetProps(children);
      }

      if (!_isEmpty(props) && isConfigBasicType(type)) {
        customProps[key] = props.defaultValue;
      }
    }
  });

  return customProps;
};

export const parsePropsFromJsonTreeAsync = (config: AnyObject) => (
  new Promise<TPropConfig<FormItemProps>>((resolve) => {
    const customProps = parsePropsFromJsonTree(config);

    resolve(customProps);
  })
);
