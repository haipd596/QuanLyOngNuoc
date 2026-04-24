import { TCommonConfigArray } from '@packages/@types';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { InputProps } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { FormItemProps } from 'antd/lib';
import vi from '../../../locales/vi/translation.json';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createCMNDNumberField = (extraFieldConfig: AnyObject = {}) => (
  new Field<InputProps>({
    key: '',
    fieldName: FIELD_NAME.CMND_NUMBER,
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
              // CCCD: 12 số | Hộ chiếu VN/quốc tế: 6–12 ký tự Latin + số, có ít nhất một chữ cái
              // @ts-expect-error: should work correctly
              pattern:
                '^(?:\\d{12}|(?=[A-Za-z0-9]{6,12}$)(?=.*[A-Za-z])[A-Za-z0-9]+)$',
              message: vi.CMND_NUMBER_VALIDATE,
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
