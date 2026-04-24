import { TFormTabProps } from '@packages/components/View/ViewTab/type.tab';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { AnyObject } from 'antd/es/_util/type';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createFormTabField = (extraFieldConfig: AnyObject = {}) => (
  new Field<Partial<TFormTabProps>>({
    fieldName: FIELD_NAME.TAB,
    key: '',
    version: 0,
    componentPropsAllowConfig: {
      items: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.ARRAY,
        props: {
          defaultValue: [
            {
              key: '1',
              label: 'Tab 1',
            },
            {
              key: '2',
              label: 'Tab 2',
            },
          ],
        },
      }),
      isDuplicate: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
        props: {
          defaultValue: false,
        },
      }),
    },
    ...extraFieldConfig,
  })
);
