import { FIELD_NAME } from '@packages/constants/fields';
import { lazy } from 'react';

const ViewDatePickerWithVnFormat = lazy(
  () => import('@packages/components/ViewDate/ViewDatePickerWithVnFormat'),
);
const ViewInputWithUploadFormatText = lazy(
  () => import('@packages/components/View/InputWithUpload/Viewer/ViewInputWithUploadFormatText'),
);

export const HIDDEN_FIELDS = {
  [FIELD_NAME.DATE_PICKER]: ViewDatePickerWithVnFormat,
  [FIELD_NAME.INPUT_WITH_UPLOAD]: ViewInputWithUploadFormatText,
};
