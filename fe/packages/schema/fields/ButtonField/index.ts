import { ViewButtonProps } from '@packages/components/View/ViewButton';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { SelectProps } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

/**
 * Creates a new button field with the specified properties.
 * [ ]: Generate tooltip's content
 * [ ]: Standardize button title (create new object key)
 * @return {Field<ViewButtonProps>} A new button field instance.
 */
export const createButtonField = (
  extraFieldConfig: AnyObject = {},
) => new Field<Partial<ViewButtonProps>>({
  fieldName: FIELD_NAME.BUTTON,
  key: '',
  version: 0,
  componentPropsAllowConfig: {
    buttonContent: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'Submit',
      },
    }),
    callBackFunctionName: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'callbackNopHoSo',
      },
    }),
    htmlType: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.SELECT,
      props: {
        defaultValue: 'submit',
        options: [
          {
            label: 'Submit',
            value: 'submit',
          },
          {
            label: 'Reset',
            value: 'reset',
          },
          {
            label: 'Button',
            value: 'button',
          },
        ],
      },
    }),
    disabled: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
      props: {
        defaultValue: false,
      },
    }),
    icon: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: '',
      },
    }),
    buttonType: new ConfigBasic<SelectProps>({
      type: CONFIG_BASIC_FIELD_TYPE.SELECT,
      props: {
        defaultValue: 'primary',
        options: [
          {
            label: 'Primary',
            value: 'primary',
          },
          {
            label: 'Default',
            value: 'default',
          },
          {
            label: 'Dashed',
            value: 'dashed',
          },
          {
            label: 'Text',
            value: 'text',
          },
          {
            label: 'Link',
            value: 'link',
          },
        ],
        allowClear: true,
      },
    }),
  },
  ...extraFieldConfig,
});
