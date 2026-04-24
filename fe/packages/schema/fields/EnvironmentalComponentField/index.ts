import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { AnyObject } from 'antd/es/_util/type';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createEnvironmentalComponentField = (
  extraFieldConfig: AnyObject = {},
) => new Field<Partial<any>>({
  key: '',
  fieldName: FIELD_NAME.ENVIRONMENTAL_COMPONENT,
  version: 0,
  componentPropsAllowConfig: {
    // showOtherInput: new ConfigBasic({
    //   type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
    //   props: {
    //     defaultValue: false,
    //   },
    // }),
    showOtherInput: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.ARRAY,
      props: {
        defaultValue: [
          {
            key: '1',
            showOtherInput: false,
          },
          {
            key: '2',
            showOtherInput: false,
          },
          {
            key: '3',
            showOtherInput: false,
          },
          {
            key: '4',
            showOtherInput: false,
          },
          {
            key: '5',
            showOtherInput: false,
          },
          {
            key: '6',
            showOtherInput: false,
          },
          {
            key: '7',
            showOtherInput: false,
          },
        ],
      },
    }),
  },
  ...extraFieldConfig,
});
