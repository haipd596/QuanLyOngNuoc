import { ConfigCheckboxProps } from '@packages/components/Config';
import { ViewSelectProps } from '@packages/components/View/ViewSelect';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { SelectProps } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createSelectField = (extraFieldConfig: AnyObject = {}) => (
  new Field<SelectProps | ViewSelectProps>({
    fieldName: FIELD_NAME.SELECT,
    key: '',
    version: 0,
    componentPropsAllowConfig: {
      allowClear: new ConfigBasic<ConfigCheckboxProps>({
        type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
        props: {
          defaultValue: false,
        },
      }),
      isModeMultiple: new ConfigBasic<ConfigCheckboxProps>({
        type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
        props: {
          defaultValue: false,
        },
      }),
      onSelect: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.CODE,
        props: {
          defaultValue: `function onSelect(value, option) {
  console.log({ value, option })
}`,
        },
      }),
      options: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.CONFIG_OPTION_FOR_SELECT,
        props: {
          defaultValue: {
            isGetFromOtherField: false,
            dataSource: {
              dataIndex: '',
              fieldKey: '',
              parentSchemaKey: '',
            },
            staticOption: [
              {
                label: 'Lựa Chọn 1',
                value: 'lua_chon_1',
              },
              {
                label: 'Lựa Chọn 2',
                value: 'lua_chon_2',
              },
              {
                label: 'Lựa Chọn 3',
                value: 'lua_chon_3',
              },
            ],
          },
        },
      }),
    },
    ...extraFieldConfig,
  })
);
