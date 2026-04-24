import { HTMLViewerEditorProps } from '@packages/components/View/ViewHtml';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { AnyObject } from 'antd/es/_util/type';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createMucDichKhaiThacSDField = (
  extraFieldConfig: AnyObject = {},
) => new Field<Partial<HTMLViewerEditorProps>>({
  key: '',
  fieldName: FIELD_NAME.MUC_DICH_KHAI_THAC_SD,
  version: 0,
  componentPropsAllowConfig: {
    initialContent: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'Html viewer editor',
      },
    }),
  },
  formItemPropsAllowConfig: {
    serverPayloadKey: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.CONFIG_CHANGE_SERVER_PAYLOAD_KEY,
      props: {
        defaultValue: 'MucDichKhaiThacSD',
      },
    }),
    label: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'Mục đích khai thác, sử dụng',
      },
    }),
  },
  ...extraFieldConfig,
});
