import { TCommonConfigArray } from '@packages/@types';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { FormItemProps } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { PasswordProps } from 'antd/es/input';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createPasswordField = (extraFieldConfig: AnyObject = {}) => (
  new Field<PasswordProps>({
    key: '',
    fieldName: FIELD_NAME.INPUT_PASSWORD,
    version: 0,
    componentPropsAllowConfig: {
      iconRender: new ConfigBasic<{ defaultValue: string }>({
        type: CONFIG_BASIC_FIELD_TYPE.CODE,
        props: {
          defaultValue: `function iconRender(isVisible){
          return isVisible ? 'hide' : 'show'            
          }`,
        },
      }),
      defaultValue: new ConfigBasic<any>({
        type: CONFIG_BASIC_FIELD_TYPE.STRING,
        props: {
          defaultValue: '',
        },
      }),
    },
    formItemPropsAllowConfig: {
      rules: new ConfigBasic<{
        defaultValue: FormItemProps['rules']
      } & TCommonConfigArray>({
        type: CONFIG_BASIC_FIELD_TYPE.ARRAY,
        props: {
          defaultValue: [
            {
              whitespace: true,
              message: 'password can not empty',
            },
            {
              // @ts-expect-error: should work correctly
              pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$',
              message: 'Minimum eight characters, at least one letter and one number',
            },
          ],
          isAddable: false,
        },
      }),
    },
    ...extraFieldConfig,
  })
);
