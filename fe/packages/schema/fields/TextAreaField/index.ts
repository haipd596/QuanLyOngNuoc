import { TCommonConfigArray } from '@packages/@types';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { InputProps } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { FormItemProps } from 'antd/lib';
import vi from '../../../locales/vi/translation.json';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createInputAreaField = (extraFieldConfig: AnyObject = {}) => (
  new Field<InputProps>({
    key: '',
    fieldName: FIELD_NAME.TEXTAREA,
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
              message: 'Không cho phép nhập thẻ HTML',
            },
          ],
          isAddable: true,
        },
      }),
    },
    ...extraFieldConfig,
  })
);
