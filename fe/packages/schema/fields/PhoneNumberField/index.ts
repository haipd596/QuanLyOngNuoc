import { TCommonConfigArray } from '@packages/@types';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { InputProps } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { FormItemProps } from 'antd/lib';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createPhoneNumberField = (extraFieldConfig: AnyObject = {}) => (
  new Field<InputProps>({
    key: '',
    fieldName: FIELD_NAME.PHONE_NUMBER,
    version: 0,
    formItemPropsAllowConfig: {
      rules: new ConfigBasic<{
        defaultValue: FormItemProps['rules'],
      } & TCommonConfigArray>({
        type: CONFIG_BASIC_FIELD_TYPE.ARRAY,
        props: {
          defaultValue: [
            {
              // @ts-expect-error: should work correctly
              // pattern: '^(84|0[24|3|5|7|8|9])+([0-9]{13})\\b',
              pattern: '^\\+?[0-9]{7,15}$',
              message: 'Số điện thoại chưa đúng định dạng!',
            },
          ],
          isAddable: true,
        },
      }),
      hidden: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
        props: {
          defaultValue: false,
        },
      }),
    },
    ...extraFieldConfig,
  })
);
