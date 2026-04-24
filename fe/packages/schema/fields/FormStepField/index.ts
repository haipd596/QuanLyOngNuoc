import { TFormStepProps } from '@packages/components/View/FormStep/type';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { AnyObject } from 'antd/es/_util/type';
import { THEME_CONFIG } from '~/configs/theme.config';
import { ConfigBasic } from '../fieldConfig';

import { Field } from '../fieldModel';

export const createFormStepField = (extraFieldConfig: AnyObject = {}) => (
  new Field<Partial<TFormStepProps>>({
    fieldName: FIELD_NAME.FORM_STEP,
    key: '',
    version: 0,
    componentPropsAllowConfig: {
      items: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.ARRAY,
        props: {
          defaultValue: [
            {
              key: '1',
              label: THEME_CONFIG[FIELD_NAME.FORM_STEP].label?.labelStep1,
            },
            {
              key: '2',
              label: THEME_CONFIG[FIELD_NAME.FORM_STEP].label?.labelStep2,
            },
            {
              key: '3',
              label: THEME_CONFIG[FIELD_NAME.FORM_STEP].label?.labelStep3,
            },
          ],
        },
      }),
      isShowProgressBar: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
        props: {
          defaultValue: true,
        },
      }),
      callBackFunctionName: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.STRING,
        props: {
          defaultValue: 'callbackNopHoSo',
        },
      }),
    },
    styleComponentAllowConfig: {
      stepButtonColor: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.COLOR_PICKER,
        props: {
          defaultValue: THEME_CONFIG[FIELD_NAME.FORM_STEP].style?.stepBtnColor,
        },
      }),
    },
    ...extraFieldConfig,
  })
);
