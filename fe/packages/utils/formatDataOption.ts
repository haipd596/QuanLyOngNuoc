import { AnyObject } from 'antd/es/_util/type';
import axios from 'axios';
import _ from 'lodash';

import { TAsyncSupportProps } from '@packages/components/AsyncSupport';
import { IDataOptions } from '@packages/components/View/ViewTable/type.table';
import { isInputHidden } from '@packages/components/View/ViewTable/utils';
import { FIELD_NAME } from '@packages/constants/fields';
import { JsonSchema } from '@packages/schema/schemaModel';
import { isConfigBasicType } from './configFields';

interface IQueryParam {
  key: string;
  value: string;
}

export const FIELD_OPTIONS_ASYNC = [
  FIELD_NAME.ASYNC_SELECT,
];

export const FIELD_OPTIONS = [
  FIELD_NAME.SELECT,
  FIELD_NAME.RADIO_GROUP,
  FIELD_NAME.CHECKBOX_GROUP,
];

export const FIELD_OPTIONS_SUPPORT = [
  ...FIELD_OPTIONS_ASYNC, ...FIELD_OPTIONS,
];

const isValidIndexKey = (value: any) => !_.isArray(value) || !_.isObject(value);

export const createQueryString = (queryParams: IQueryParam[]) => {
  const queryStrings = queryParams.map((param) => `${param.key}=${encodeURIComponent(param.value)}`);

  return queryStrings.join('&');
};

const fetchAllData = (params: TAsyncSupportProps) => {
  try {
    let queryString: string = '';
    const {
      queryParams, action, pathToSource, indexLabel, indexValue, fieldKey,
    } = params;

    if (!action) throw new Error('Action required');

    if (_.isArray(queryParams)) queryString = createQueryString(queryParams);

    const url = `${action}?${queryString}`;

    return axios.get(url).then((response) => {
      const { data } = response;
      if (data) {
        const _dataSource = _.isArray(data) ? data : _.get(data, pathToSource, []);
        if (_.isArray(_dataSource)) {
          const _options = _dataSource
            .map((_data) => {
              const label = _.get(_data, indexLabel, '');
              const value = _.get(_data, indexValue, '');

              return {
                label: isValidIndexKey(label) ? label : '',
                value: isValidIndexKey(value) ? value : '',
              };
            })
            .filter(({ value }) => Boolean(value));

          return { fieldKey, options: _options };
        }
      }
      return [];
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const _generateDataOptions = async (schema: JsonSchema): Promise<IDataOptions[]> => {
  const listAllUrl: any = [];
  const _getAllDataOptions = schema
    .fields
    .filter((field) => FIELD_OPTIONS_SUPPORT.includes(field.fieldName));

  const getOptions = _getAllDataOptions.map((field) => {
    if (FIELD_OPTIONS.includes(field.fieldName)) {
      const options = _.get(field, 'componentPropsAllowConfig.options.props.defaultValue');
      if (options && _.isArray(options)) {
        return ({ fieldKey: field.key, options });
      }
    }

    if (FIELD_OPTIONS_ASYNC.includes(field.fieldName)) {
      const customProps: AnyObject = {};
      const config = field.componentPropsAllowConfig;

      if (_.isObject(config)) {
        Object.keys(config).forEach((key) => {
          if (config[key]) {
            const { type, props }: any = config[key];
            if (!_.isEmpty(props) && isConfigBasicType(type)) {
              customProps[key] = props.defaultValue;
            }
          }
        });
      }
      listAllUrl.push({ ...customProps, fieldKey: field.key });
    }
    return undefined;
  });

  const filterOptions = getOptions.filter((item) => item !== undefined);

  const promises = listAllUrl.map(fetchAllData);
  const optionsAsync: any = await Promise.all(promises)
    .then((results) => results.map((options) => (options)))
    .catch((error) => {
      console.error('An error occurred:', error);
    });

  return [...filterOptions, ...optionsAsync];
};

/**
 *
 * @param data Là Object Array
 * @param keyLabel Tên key
 * @param keyValue Tên key
 * @returns Là 1 object array dạng: [{label: string, value: string}]
 */
export const transformDataOptions = (data: AnyObject, keyLabel: string, keyValue: string) => {
  if (data && _.isArray(data)) {
    return data.map((item) => ({
      label: _.get(item, keyLabel, ''),
      value: _.get(item, keyValue, ''),
    }));
  }
  return [];
};

export const filterOptionSelect = (input: string, option?: { label: string; value: string }) => {
  const replaceLabel = (option?.label.normalize('NFD').replace(/[\u0300-\u036f]/g, '') ?? '').toLowerCase();
  const replaceSearchString = (input.normalize('NFD').replace(/[\u0300-\u036f]/g, '')).toLowerCase();

  return replaceLabel.includes(replaceSearchString);
};

export const transformLabelReference = (keyName: string, data: AnyObject) => {
  const referenceValue = _.get(data, keyName, '');
  if (
    referenceValue
    && typeof (referenceValue === 'string' || referenceValue instanceof String)
  ) {
    let label = '';
    try {
      const optionValue = JSON.parse(referenceValue);
      label = _.get(optionValue, 'label', '');
    } catch (error: any) {
      return '';
    }

    return label;
  }
  return '';
};

export const getLabelReference = (serverKey: string, data: AnyObject) => {
  let initLabel: string = '';
  Object.entries(data).forEach(([key, val]) => {
    if (isInputHidden(key)) {
      try {
        const { label: _labelOption, serverPayloadKey } = JSON.parse(val);
        if (serverPayloadKey === serverKey) initLabel = _labelOption;
      } catch (_error) {
        return initLabel;
      }
    }
  });

  return initLabel;
};
