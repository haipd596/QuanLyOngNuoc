import { ViewSelectFileFieldsProps } from '@packages/components/View/ViewSelectFileFields';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { asyncSelectFileConfig } from '@packages/constants/jsonConfig';
import { AnyObject } from 'antd/es/_util/type';
import { createButtonField } from '../ButtonField';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createSelectFileField = (extraFieldConfig: AnyObject = {}) => {
  const buttonConfig = createButtonField();
  delete buttonConfig.formItemPropsAllowConfig?.wrapperColumnNumber;

  return (
    new Field<Partial<ViewSelectFileFieldsProps>>({
      ...buttonConfig as any,
      fieldName: FIELD_NAME.VIEW_SELECT_FILE,
      key: '',
      version: 0,
      componentPropsAllowConfig: {
        ...asyncSelectFileConfig,
        ...buttonConfig.componentPropsAllowConfig,
        htmlType: undefined,
        isShowListImage: new ConfigBasic({
          type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
          props: {
            defaultValue: true,
          },
        }),
        buttonContent: new ConfigBasic({
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: '',
          },
        }),
        buttonType: new ConfigBasic({
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: 'text',
          },
        }),
      },
      ...extraFieldConfig,
    })
  );
};
