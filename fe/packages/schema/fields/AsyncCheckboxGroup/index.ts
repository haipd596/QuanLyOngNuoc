import { TViewAsyncCheckboxGroupProps } from '@packages/components/View/ViewAsyncCheckBoxGroup';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { asyncCommonConfig, directionRadioGroup } from '@packages/constants/jsonConfig';
import { AnyObject } from 'antd/es/_util/type';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const transformDataOption = new ConfigBasic({
  type: CONFIG_BASIC_FIELD_TYPE.CODE,
  props: {
    defaultValue: `function transformDataOption(dataSource) {
  return null;
}`,
  },
});

export const createAsyncCheckboxGroupField = (extraFieldConfig: AnyObject = {}) => (
  new Field<Partial<TViewAsyncCheckboxGroupProps>>({
    fieldName: FIELD_NAME.ASYNC_CHECKBOX_GROUP,
    key: '',
    version: 0,
    componentPropsAllowConfig: {
      ...asyncCommonConfig,
      transformDataOption,
      direction: directionRadioGroup,
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
    },
    ...extraFieldConfig,
  })
);
