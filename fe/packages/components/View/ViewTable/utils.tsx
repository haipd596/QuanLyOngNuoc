/* eslint-disable no-case-declarations */
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { parsePropsFromJsonTree } from '@packages/utils/browseJsonTree';
import { ColumnType, TableProps } from 'antd/es/table';
import { ColumnGroupType } from 'antd/lib/table';
import _ from 'lodash';
import _get from 'lodash/get';
import _uniqBy from 'lodash/uniqBy';
import _values from 'lodash/values';

import { DIVIDER_HIDDEN } from '@packages/constants/commons';
import { DATE_TIME_FORMAT } from '@packages/constants/date';
import { IField } from '@packages/main/Forms';
import { ConfigBasic } from '@packages/schema/fields/fieldConfig';
import { AnyObject } from 'antd/es/_util/type';
import dayjs from 'dayjs';
import { IParagraph, TColumnTableDefaultValue, TGroupColumn } from './type.table';

const LIST_FILED_NAME_SUPPORTS = _values([FIELD_NAME][0]);

export const isInputHidden = (input: string) => {
  return input.includes(DIVIDER_HIDDEN);
};

export const groupTableHead = (
  columns: (ColumnType<any> | ColumnGroupType<any>)[],
  groupColumns: TGroupColumn[],
) => {
  const clonedColumns = [...columns];
  columns.forEach((_item, index) => {
    groupColumns?.forEach(({ title, selectChildren }) => {
      const columnKeys = _get(selectChildren, 'props.defaultValue', []) as React.Key[];
      if (_item.key && columnKeys?.includes(_item.key)) {
        clonedColumns[index] = {
          title,
          children: columns
            .filter(({ key }) => key && columnKeys?.includes(key))
            .map((item) => item),
        };
      }
    });
  });

  return _uniqBy(clonedColumns, 'title');
};

const getColumnsByFieldConfig = (options: any, columnDataType: any) => {
  return ({
    title: options.label,
    dataIndex: options.name,
    required: options.required,
    isShowColumn: true,
    columnDataType,
    key: options.key,
    width: 100,
  });
};

export const formatFieldConfigToColumnTable = (fieldConfig: TColumnTableDefaultValue['fieldConfig'], columnDataType: TColumnTableDefaultValue['columnDataType']) => {
  const componentPropsAllowConfig = _get(fieldConfig, 'componentPropsAllowConfig', {});
  const results = parsePropsFromJsonTree(componentPropsAllowConfig);
  const fieldName = columnDataType.props.defaultValue;

  if (fieldName === FIELD_NAME.RANGEPICKER) {
    const { nameStartDate, nameEndDate, isRequired } = results;

    return [nameStartDate, nameEndDate].map((item) => (
      getColumnsByFieldConfig({ ...item, required: isRequired, key: item.name }, columnDataType)
    ));
  }

  if (fieldName === FIELD_NAME.INPUT_NUMBER_RANGE) {
    const {
      maxLabel, minLabel, serverPayloadKeyMax, serverPayloadKeyMin,
    } = results;

    return [
      getColumnsByFieldConfig({
        label: minLabel,
        name: serverPayloadKeyMin,
        key: serverPayloadKeyMin,
      }, columnDataType),
      getColumnsByFieldConfig({
        label: maxLabel,
        name: serverPayloadKeyMax,
        key: serverPayloadKeyMax,
      }, columnDataType),
    ];
  }
};

export const renderContent = (data: IParagraph) => {
  const {
    value, record, rowData,
  } = data;
  const { dataIndex } = record;
  const fieldName = _get(record, 'columnDataType.props.defaultValue');

  if (LIST_FILED_NAME_SUPPORTS.includes(fieldName)) {
    switch (fieldName) {
  
      case FIELD_NAME.SELECT:
        const initialObject: AnyObject = {};
        Object.entries(rowData).forEach(([key, val]) => {
          if (isInputHidden(key)) {
            try {
              const { label: _labelOption, value: _valueOption, fieldId } = JSON.parse(val);
              if ((_valueOption === value) && (fieldId === dataIndex)) {
                initialObject[dataIndex] = _labelOption;
              }
            } catch (_error) {
              return value;
            }
          }
        });
        return _get(initialObject, dataIndex) || value;

      case FIELD_NAME.CHECKBOX_GROUP:
        let labelStr = '';
        Object.entries(rowData).forEach(([key, val]) => {
          if (isInputHidden(key)) {
            const { label: _labelCheckbox, fieldId } = val;
            if (fieldId === dataIndex) labelStr = _labelCheckbox;
          }
        });
        return labelStr || value;

      case FIELD_NAME.RADIO_GROUP:
        let labelRadio = '';
        Object.entries(rowData).forEach(([key, val]) => {
          if (isInputHidden(key)) {
            const { label: _labelRadio, fieldId } = val;
            if (fieldId === dataIndex) labelRadio = _labelRadio;
          }
        });
        return labelRadio || value;

        // case FIELD_NAME.DATE_PICKER:
        //   const fieldNameDisplay = buildDisplayForHiddenField(dataIndex);

        //   return dayjs(value as any).format(DATE_FORMAT.DD_MM_YYYY);

      case FIELD_NAME.DATETIME_PICKER:
        return dayjs(value as any).format(DATE_TIME_FORMAT.YYYY_MM_DD_HH_mm_ss);

      case FIELD_NAME.INPUT_NUMBER:
        if (value === null || value === undefined || value === '') {
          return '';
        }
        // Format number with thousand separator
        return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      
      case FIELD_NAME.ASYNC_SELECT:
        let contentAsync: React.ReactNode = value;

        Object.entries(rowData).forEach(([key, val]) => {
          if (isInputHidden(key)) {
            try {
              const {
                value: _value,
                label: _label,
              } = JSON.parse(val);

              if (_value === value) {
                contentAsync = (
                  <span>{_label}</span>
                );
              }
            } catch (_error) {
              contentAsync = value;
            }
          }
        });

        return contentAsync;
      
      case FIELD_NAME.F_ADDRESS:
        const addressObj: AnyObject = {};
        Object.entries(rowData).forEach(([key, val]) => {
          if (isInputHidden(key)) {
            try {
              const { label: _labelOption, value: _valueOption } = JSON.parse(val);
              if ((_valueOption === value)) {
                addressObj[dataIndex] = _labelOption;
              }
            } catch (_error) {
              return value;
            }
          }
        });
        return _get(addressObj, dataIndex) || value;

      default:
        return value;
    }
  }
  return '';
};

export const buildSubForm = (
  fields: IField[],
  fieldsInColumnIndex: IField['fieldsInColumnIndex'],
  columns?: TColumnTableDefaultValue[] & TableProps['columns'],
) => {
  return {
    fields: _.sortBy(
      (fields || [])
        .map((item) => {
          const foundIndex: any = columns?.findIndex(({ uniqId }) => uniqId === item.uniqId);
          const found = columns?.[foundIndex];

          let overrideLabelAndKey: any = {};

          if (found) {
            overrideLabelAndKey = {
              formItemPropsReadOnly: {
                label: found?.title,
                name: found?.dataIndex,
              },
              formItemPropsAllowConfig: {
                ...item.formItemPropsAllowConfig,
                serverPayloadKey: new ConfigBasic({
                  type: CONFIG_BASIC_FIELD_TYPE.STRING,
                  props: {
                    defaultValue: found?.dataIndex,
                  },
                }),
                label: new ConfigBasic({
                  type: CONFIG_BASIC_FIELD_TYPE.STRING,
                  props: {
                    defaultValue: found?.title,
                  },
                }),
              },
              key: found.key !== undefined ? found.key : item.key,
            };
          }

          const colKey: any = (fieldsInColumnIndex || []).find(
            ({ fieldKeyCol }) => fieldKeyCol === item.uniqId,
          );

          if (colKey) {
            return {
              ...item,
              columnIndex: colKey.columnIndex,
              isShowField: true,
              order: foundIndex ?? 0,
              ...overrideLabelAndKey,
            };
          }

          return null;
        })
        .filter((item) => !_.isEmpty(item)),
      ['order'],
    ) as any,
  };
};
