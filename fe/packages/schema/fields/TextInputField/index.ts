import { TCommonConfigArray } from '@packages/@types';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { InputProps } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { FormItemProps } from 'antd/lib';
import vi from '../../../locales/vi/translation.json';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createInputField = (extraFieldConfig: AnyObject = {}) => (
  new Field<InputProps>({
    key: '',
    fieldName: FIELD_NAME.INPUT,
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
              pattern: '^(?!.*<[^>]+>)[\\s\\S]*$',
              message: 'Không cho phép nhập thẻ HTML!',
            },
            {
              // @ts-expect-error: should work correctly
              pattern: '^.{1,256}$',
              message: 'Không được vượt quá 256 ký tự!',
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
