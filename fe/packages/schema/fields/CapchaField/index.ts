import { ViewCapchaProps } from '@packages/components/View/ViewCapchaField';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { AnyObject } from 'antd/es/_util/type';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createCapchaField = (
  extraFieldConfig: AnyObject = {},
) => {
  // const capChaConfig: any = createButtonField();
  // delete capChaConfig.formItemPropsAllowConfig?.isShowInDetailModeView;

  return (
    new Field<Partial<ViewCapchaProps>>({
      // ...capChaConfig as any,
      key: '',
      fieldName: FIELD_NAME.CAPTCHA,
      version: 0,
      componentPropsAllowConfig: {

        bgColorTextCaptcha: new ConfigBasic({
          type: CONFIG_BASIC_FIELD_TYPE.COLOR_PICKER,
          props: {
            defaultValue: '#d9d9d9',
          },
        }),
        colorRotate: new ConfigBasic({
          type: CONFIG_BASIC_FIELD_TYPE.COLOR_PICKER,
          props: {
            defaultValue: '#1677ff',
          },
        }),
        textColor: new ConfigBasic({
          type: CONFIG_BASIC_FIELD_TYPE.COLOR_PICKER,
          props: {
            defaultValue: '#000000',
          },
        }),
        captchaAlign: new ConfigBasic({
          type: CONFIG_BASIC_FIELD_TYPE.SELECT,
          props: {
            defaultValue: 'right',
            options: [
              {
                label: 'right',
                value: 'right',
              },
              {
                label: 'left',
                value: 'left',
              },
            ],
          },
        }),
        placeholder: new ConfigBasic({
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: 'Nhập mã xác thực',
          },
        }),
      },
      ...extraFieldConfig,
    })
  );
};
