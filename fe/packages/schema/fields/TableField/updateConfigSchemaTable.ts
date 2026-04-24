/* eslint-disable no-lonely-if */
import { COLUMN_REFERENCES } from '@packages/constants/commons';
import { CONFIG_BASIC_FIELD_TYPE } from '@packages/constants/fields';
import { transformFieldMatchWithDefinedColumn } from '@packages/utils';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { ConfigBasic } from '../fieldConfig';
import { FORM_TABLE_SUPPORT } from './configSchemaTable';

export const updateConfigSchemaTable = (columns: any, fields: any) => {
  columns.forEach((col: any) => {
    const {
      key,
      uniqId,
      title: label,
      dataIndex,
      columnReferenceType,
      fieldConfig,
      columnDataType,
    } = col;

    const formActiveIndex = fields.findIndex(
      (field: any) => uniqId === field.uniqId,
    );
    if (formActiveIndex > -1) {
      const currentFieldName = fields[formActiveIndex].fieldName;
      const newFieldFieldName = columnDataType.props.defaultValue;

      if (!_isEmpty(fieldConfig)) { // special config like: f-address
        fields[formActiveIndex] = {
          ..._get(fieldConfig, 'props.defaultValue', {}),
          uniqId,
        };
        // column reference need specific update data
      } else if (key === COLUMN_REFERENCES) { // use for column reference
        fields[formActiveIndex] = {
          ...fields[formActiveIndex],
          formItemPropsAllowConfig: {
            serverPayloadKey: new ConfigBasic({
              type: CONFIG_BASIC_FIELD_TYPE.STRING,
              props: {
                defaultValue: dataIndex,
              },
            }),
            hidden: new ConfigBasic({
              type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
              props: {
                defaultValue: true,
              },
            }),
            initFieldData: new ConfigBasic({
              type: CONFIG_BASIC_FIELD_TYPE.STRING,
              props: {
                defaultValue: columnReferenceType?.props.defaultValue,
              },
            }),
          },
          key: dataIndex,
          uniqId,
          formItemPropsReadOnly: {
            label,
            name: dataIndex,
            rules: [],
          },
        };
      } else { // other fields
        if (currentFieldName !== newFieldFieldName) {
          fields[formActiveIndex] = {
            ...transformFieldMatchWithDefinedColumn(newFieldFieldName, col),
            isShowField: false,
          };
        } else {
          if (!FORM_TABLE_SUPPORT.includes(newFieldFieldName)) {
            fields[formActiveIndex] = {
              ...fields[formActiveIndex],
              key: dataIndex,
              uniqId,
              formItemPropsReadOnly: {
                ...fields[formActiveIndex].formItemPropsReadOnly || {},
                label,
                name: dataIndex,
              },
              formItemPropsAllowConfig: {
                ...fields[formActiveIndex].formItemPropsAllowConfig || {},
                serverPayloadKey: new ConfigBasic({
                  type: CONFIG_BASIC_FIELD_TYPE.STRING,
                  props: {
                    defaultValue: dataIndex,
                  },
                }),
              },
            };
          }
        }
      }
    }
  });

  return fields;
};
