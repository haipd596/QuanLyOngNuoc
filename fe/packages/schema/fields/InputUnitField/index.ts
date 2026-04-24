import { CONFIG_ADVANCE_FIELD_TYPE, CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { AnyObject } from 'antd/es/_util/type';
import { ConfigAdvance, ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createInputUnitField = (
  extraFieldConfig: AnyObject = {},
) => new Field<Partial<any>>({
  key: '',
  fieldName: FIELD_NAME.INPUT_UNIT,
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
    fieldType: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.SELECT,
      props: {
        defaultValue: FIELD_NAME.INPUT_NUMBER,
        options: [
          {
            label: FIELD_NAME.INPUT,
            value: FIELD_NAME.INPUT,
          },
          {
            label: FIELD_NAME.INPUT_NUMBER,
            value: FIELD_NAME.INPUT_NUMBER,
          },
        ],
      },
    }),
    isDisabled: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
      props: {
        defaultValue: false,
      },
    }),
    miniMum: new ConfigAdvance({
      type: CONFIG_ADVANCE_FIELD_TYPE.OBJECT,
      label: 'options for minimum',
      children: {
        isValidatedMiniMum: {
          type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
          props: {
            defaultValue: false,
          },
        },
        min: {
          type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
          props: {
            defaultValue: null,
          },
        },
      },
    }),
    maxiMum: new ConfigAdvance({
      type: CONFIG_ADVANCE_FIELD_TYPE.OBJECT,
      label: 'options for maximum',
      children: {
        isValidatedMaxiMum: {
          type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
          props: {
            defaultValue: false,
          },
        },
        max: {
          type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
          props: {
            defaultValue: null,
          },
        },
      },
    }),
  },
  ...extraFieldConfig,
});
