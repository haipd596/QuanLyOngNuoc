import { TCommonConfigArray } from '@packages/@types';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { InputProps } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { FormItemProps } from 'antd/lib';
import vi from '../../../locales/vi/translation.json';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createEmailField = (extraFieldConfig: AnyObject = {}) => (
  new Field<InputProps>({
    key: '',
    fieldName: FIELD_NAME.EMAIL,
    version: 0,
    formItemPropsAllowConfig: {
      rules: new ConfigBasic<{
        defaultValue: FormItemProps['rules'],
      } & TCommonConfigArray>({
        type: CONFIG_BASIC_FIELD_TYPE.ARRAY,
        props: {
          defaultValue: [
            {
              whitespace: true,
              message: vi.notice_mess,
            },
            {
              // @ts-expect-error: should work correctly
              pattern: '[^@]{2,64}@[^.]{2,253}\\.[0-9a-z-.]{2,63}',
              message: 'Định dạng email không hợp lệ!',
            },
          ],
          isAddable: false,
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
