import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { AnyObject } from 'antd/es/_util/type';
// import { ConfigBasic } from '../fieldConfig';
import { InputWithUploadViewerProps } from '@packages/components/View/InputWithUpload/Viewer';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createInputWithUploadField = (
  extraFieldConfig: AnyObject = {},
) => new Field<Partial<InputWithUploadViewerProps>>({
  key: '',
  fieldName: FIELD_NAME.INPUT_WITH_UPLOAD,
  version: 0,
  componentPropsAllowConfig: {
    isMultipleUpload: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
      props: {
        defaultValue: false,
      },
    }),
  },
  ...extraFieldConfig,
});
