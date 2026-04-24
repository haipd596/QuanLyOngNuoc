import { ViewRowAndColumnProps } from '@packages/components/View/ColumnFields/Builder';
import { CONFIG_ADVANCE_FIELD_TYPE, CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { COLUMN_DEFAULT_CONFIG } from '@packages/constants/jsonConfig';
import { ConfigAdvance, ConfigBasic } from '@packages/schema/fields/fieldConfig';
import { Field } from '@packages/schema/fields/fieldModel';
import { SelectProps } from 'antd';
import { AnyObject } from 'antd/es/_util/type';

export const createColumnField = (extraFieldConfig: AnyObject = {}) => (
  new Field<Partial<ViewRowAndColumnProps>>({
    fieldName: FIELD_NAME.COLUMN_FIELD,
    key: '',
    version: 0,
    componentPropsAllowConfig: {
      isAutoLayout: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
        props: {
          defaultValue: true,
        },
      }),
      columns: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.CONFIG_NUMBER_COLUMNS,
        props: {
          defaultValue: [
            { ...COLUMN_DEFAULT_CONFIG },
            { ...COLUMN_DEFAULT_CONFIG },
          ],
        },
      }),
      rows: new ConfigAdvance({
        type: CONFIG_ADVANCE_FIELD_TYPE.OBJECT,
        label: 'Row',
        children: {
          justify: new ConfigBasic<SelectProps>({
            type: CONFIG_BASIC_FIELD_TYPE.SELECT,
            props: {
              defaultValue: 'start',
              options: [
                {
                  label: 'start',
                  value: 'start',
                },
                {
                  label: 'end',
                  value: 'end',
                },
                {
                  label: 'center',
                  value: 'center',
                },
                {
                  label: 'space-around',
                  value: 'space-around',
                },
                {
                  label: 'space-between',
                  value: 'space-between',
                },
                {
                  label: 'space-evenly',
                  value: 'space-evenly',
                },
              ],
            },
          }),
          align: new ConfigBasic<SelectProps>({
            type: CONFIG_BASIC_FIELD_TYPE.SELECT,
            props: {
              defaultValue: 'top',
              options: [
                {
                  label: 'top',
                  value: 'top',
                },
                {
                  label: 'middle',
                  value: 'middle',
                },
                {
                  label: 'bottom',
                  value: 'bottom',
                },
                {
                  label: 'stretch',
                  value: 'stretch',
                },
              ],
            },
          }),
          gutter: new ConfigBasic({
            type: CONFIG_BASIC_FIELD_TYPE.ARRAY,
            props: {
              isAddable: false,
              defaultValue: [
                {
                  gutterX: 8,
                  gutterY: 8,
                },
              ],
            },
          }),
          wrap: new ConfigBasic({
            type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
            props: {
              defaultValue: true,
            },
          }),
        },
      }),
    },
    componentPropsReadOnly: {
      fieldsInColumnIndex: [],
    },
    ...extraFieldConfig,
  })
);
