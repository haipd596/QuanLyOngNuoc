import { HTMLViewerEditorProps } from '@packages/components/View/ViewHtml';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { AnyObject } from 'antd/es/_util/type';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createTableVeterinary1Field = (
  extraFieldConfig: AnyObject = {},
) => new Field<Partial<HTMLViewerEditorProps>>({
  key: '',
  fieldName: FIELD_NAME.TABLE_VETERINARY1,
  version: 0,
  componentPropsAllowConfig: {
    initialContent: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'Html viewer editor',
      },
    }),
  },
  ...extraFieldConfig,
});
