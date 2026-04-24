import { ViewCheckboxGroupProps } from '@packages/components/View/ViewCheckboxGroup';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { directionRadioGroup } from '@packages/constants/jsonConfig';
import { AnyObject } from 'antd/es/_util/type';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createCheckboxGroupField = (
  extraFieldConfig: AnyObject = {},
) => new Field<ViewCheckboxGroupProps>({
  fieldName: FIELD_NAME.CHECKBOX_GROUP,
  key: '',
  version: 0,
  componentPropsAllowConfig: {
    options: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.ARRAY,
      props: {
        defaultValue: [
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
    }),
    labelPosition: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.SELECT,
      props: {
        defaultValue: 'left',
        options: [
          {
            label: 'Right',
            value: 'right',
          },
          {
            label: 'Left',
            value: 'left',
          },
        ],
      },
    }),
    numberOfItems: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.SELECT,
      props: {
        defaultValue: 2,
        options: [
          {
            label: 1,
            value: 1,
          },
          {
            label: 2,
            value: 2,
          },
          {
            label: 3,
            value: 3,
          },
          {
            label: 4,
            value: 4,
          },
          {
            label: 5,
            value: 5,
          },
          {
            label: 6,
            value: 6,
          },
        ],
      },
    }),
    direction: directionRadioGroup,
    singleSelectMode: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
      props: {
        defaultValue: false,
      },
    }),
  },
  ...extraFieldConfig,
});
