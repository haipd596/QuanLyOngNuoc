import { ViewTextProps } from '@packages/components/View/ViewText';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { BORDER } from '@packages/utils/common';
import { InputNumberProps } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { THEME_CONFIG } from '~/configs/theme.config';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createTextField = (
  extraFieldConfig: AnyObject = {},
) => new Field<Partial<ViewTextProps>>({
  key: '',
  fieldName: FIELD_NAME.TEXT_VIEW,
  version: 0,
  componentPropsAllowConfig: {
    content: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'Text',
      },
    }),
    isAdditionalContent: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
      props: {
        defaultValue: false,
      },
    }),
    additionalContent: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'Text2',
      },
    }),
    textType: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.SELECT,
      props: {
        defaultValue: 'text',
        options: [
          {
            label: 'text',
            value: 'text',
          },
          {
            label: 'link',
            value: 'link',
          },
        ],
      },
    }),
    typeTransform: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.SELECT,
      props: {
        defaultValue: THEME_CONFIG[FIELD_NAME.TEXT_VIEW].style?.typeTransform,
        options: [
          {
            label: 'uppercase',
            value: 'uppercase',
          },
          {
            label: 'capitalize',
            value: 'capitalize',
          },
          {
            label: 'lowercase',
            value: 'lowercase',
          },
          {
            label: 'none',
            value: 'none',
          },
        ],
      },
    }),
    fontSize: new ConfigBasic<InputNumberProps>({
      type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
      props: {
        defaultValue: 16,
        min: 0,
      },
    }),
    textColor: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.COLOR_PICKER,
      props: {
        defaultValue: THEME_CONFIG[FIELD_NAME.TEXT_VIEW].style?.color,
      },
    }),
    textColorAdditional: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.COLOR_PICKER,
      props: {
        defaultValue: THEME_CONFIG[FIELD_NAME.TEXT_VIEW].style?.colorAdditionalContent,
      },
    }),
    borderColor: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.COLOR_PICKER,
      props: {
        defaultValue: THEME_CONFIG[FIELD_NAME.TEXT_VIEW].style?.borderColor,
      },
    }),
    borderStyle: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.SELECT,
      props: {
        defaultValue: 'solid',
        options: [
          {
            label: 'solid',
            value: 'solid',
          },
          {
            label: 'dotted',
            value: 'dotted',
          },
        ],
      },
    }),
    borderWidth: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
      props: {
        defaultValue: THEME_CONFIG[FIELD_NAME.TEXT_VIEW].style?.borderWidth,
      },
    }),
    showBorder: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.SELECT,
      props: {
        options: [
          {
            label: 'showBorderTop',
            value: BORDER.BORDER_TOP,
          },
          {
            label: 'showBorderLeft',
            value: BORDER.BORDER_LEFT,
          },
          {
            label: 'showBorderRight',
            value: BORDER.BORDER_RIGHT,
          },
          {
            label: 'showBorderBottom',
            value: BORDER.BORDER_BOTTOM,
          },
          {
            label: 'showBorderNone',
            value: BORDER.BORDER_NONE,
          },
        ],
      },
    }),
    isPaddingBottom: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
      props: {
        defaultValue: THEME_CONFIG[FIELD_NAME.TEXT_VIEW].style?.isPaddingBottom,
      },
    }),
    underline: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
      props: {
        defaultValue: false,
      },
    }),
    italic: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
      props: {
        defaultValue: false,
      },
    }),
    fontWeight: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.SELECT,
      props: {
        defaultValue: THEME_CONFIG[FIELD_NAME.TEXT_VIEW].style?.fontWeight,
        options: [
          {
            label: 'normal',
            value: 'normal',
          },
          {
            label: 'bold',
            value: 'bold',
          },
          {
            label: 'bolder',
            value: 'bolder',
          },
          {
            label: 'lighter',
            value: 'lighter',
          },
          {
            label: 'inherit',
            value: 'inherit',
          },
          {
            label: 'initial',
            value: 'initial',
          },
          {
            label: 'revert',
            value: 'revert',
          },
          {
            label: 'revert-layer',
            value: 'revert-layer',
          },
          {
            label: 'unset',
            value: 'unset',
          },
        ],
      },
    }),
    maxWidth: new ConfigBasic<InputNumberProps>({
      type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
      props: {
        defaultValue: undefined,
        min: 0,
      },
    }),
    level: new ConfigBasic<InputNumberProps>({
      type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
      props: {
        defaultValue: 0,
        min: 0,
        max: 5,
      },
    }),
    justifyContent: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.SELECT,
      props: {
        defaultValue: 'normal',
        options: [
          {
            label: 'normal',
            value: 'normal',
          },
          {
            label: 'center',
            value: 'center',
          },
          {
            label: 'end',
            value: 'end',
          },
          {
            label: 'right',
            value: 'right',
          },
          {
            label: 'left',
            value: 'left',
          },
          {
            label: 'flex-end',
            value: 'flex-end',
          },
          {
            label: 'flex-start',
            value: 'flex-start',
          },
        ],
      },
    }),
  },
  styleWrapperAllowConfig: {
    paddingBlock: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
      props: {
        defaultValue: THEME_CONFIG[FIELD_NAME.TEXT_VIEW].style?.paddingBlock,
      },
    }),
  },
  ...extraFieldConfig,
});
