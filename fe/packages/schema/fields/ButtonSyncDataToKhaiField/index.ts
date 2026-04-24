import { HTMLViewerEditorProps } from '@packages/components/View/ViewHtml';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { AnyObject } from 'antd/es/_util/type';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createButtonSyncDataToKhaiField = (
  extraFieldConfig: AnyObject = {},
) => new Field<Partial<HTMLViewerEditorProps>>({
  key: '',
  fieldName: FIELD_NAME.BUTTON_SYNC_DATA_TO_KHAI,
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
