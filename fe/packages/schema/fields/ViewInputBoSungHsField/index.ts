import { HTMLViewerEditorProps } from '@packages/components/View/ViewHtml';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { AnyObject } from 'antd/es/_util/type';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createViewInputBoSungHsField = (
  extraFieldConfig: AnyObject = {},
) => new Field<Partial<HTMLViewerEditorProps>>({
  key: '',
  fieldName: FIELD_NAME.VIEW_INPUT_BO_SUNG_HS,
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
