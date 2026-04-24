import { TJsonProperties } from '@packages/@types';
import { CONFIG_BASIC_FIELD_TYPE } from '@packages/constants/fields';
import { ConfigBasic } from '@packages/schema/fields/fieldConfig';
import { Field, IField } from '@packages/schema/fields/fieldModel';
import { SelectProps } from 'antd';
import _ from 'lodash';
import _cloneDeep from 'lodash/cloneDeep';
import _set from 'lodash/set';
import { buildPathDefaultValue, defineComponent, stringToFunc } from './common';
import { CONFIG_FIELDS } from './configFields';

const runCalculable = (object: any) => Object.keys(object).reduce(
  (acc, cur) => {
    const field = object[cur];
    if (
      (field?.useCalculable && field?.calculateFnc)
        || field?.key === CONFIG_BASIC_FIELD_TYPE.HIDE_IF
    ) {
      const { func } = stringToFunc(field.calculateFnc);
      if (func) {
        acc.push({ func, path: field.path });
      }
    }

    return acc;
  },
  [] as Array<{ func: any; path: string }>,
);

export const autoRun = (fields: IField[], formData: any) => {
  const jsonProperties: TJsonProperties[] = [];

  fields.forEach((field) => {
    const {
      formItemPropsAllowConfig = {},
      componentPropsAllowConfig = {},
      key,
    } = field;
    const autoRunResults = runCalculable({
      ...formItemPropsAllowConfig,
      ...componentPropsAllowConfig,
    });

    if (autoRunResults.length) {
      autoRunResults.forEach((_item) => {
        let data = null;

        try {
          data = _item.func(formData);
          if (data !== null && data !== undefined) {
            jsonProperties.push({
              path: buildPathDefaultValue(_item.path),
              value: data,
              fieldKey: key,
              serverPayloadKey: _.get(formItemPropsAllowConfig, 'serverPayloadKey.props.defaultValue', '') as any,
            });
          }
        } catch (error) {
          console.error('auto run error', error);
        }
      }, {});
    }
  });

  return { jsonProperties };
};

export const getDefaultCalculableFnc = (fields: Field[]) => {
  let keys = '';
  fields.forEach((item, index) => {
    if (Field.isFormField(item.fieldName) && item.isShowField) {
      keys += `const input${index} = formData['${item.key}'];
  `;
    }
  });

  return `function Calculation(formData) {
  ${keys}
  return null;
}`;
};

export const getComponentForArrayConfig = (
  field: any,
  extraProps: any = {},
) => {
  if (typeof field === 'object') {
    const fieldConfig = field as ConfigBasic;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return defineComponent(CONFIG_FIELDS[fieldConfig.type], {
      ...fieldConfig.props,
      ...extraProps,
      style: { width: '100%' },
      onChange: (value: string) => {
        const newConfig = new ConfigBasic<SelectProps>({
          ...fieldConfig,
          props: {
            ...fieldConfig.props,
            defaultValue: value,
          },
        });
        extraProps.onChange(newConfig);
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return defineComponent(CONFIG_FIELDS[typeof field], {
    defaultValue: field,
    ...extraProps,
  });
};

export const updateAutoRunValue = (fields: Field[], jsonProperties: TJsonProperties[]) => {
  return fields.map((item) => {
    const _index = jsonProperties.findIndex(({ fieldKey }) => fieldKey === item.key);

    if (_index > -1) {
      const newField = _set(
        _cloneDeep(item),
        jsonProperties[_index].path,
        jsonProperties[_index].value,
      );

      newField.configChanged[jsonProperties[_index].path] = jsonProperties[_index].value;

      return _cloneDeep(newField);
    }

    return item;
  });
};
