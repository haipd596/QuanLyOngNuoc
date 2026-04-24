import { FIELD_NAME } from '@packages/constants/fields';

export const parseFormError = (error: any, flattenFields: any) => {
  let message = '';

  if (error?.errorFields && Array.isArray(error.errorFields) && error.errorFields.length > 0) {
    const firstError = error.errorFields[0];
    const nameError = firstError?.name?.[0] || 'Unknown Field';
    const errors = firstError?.errors?.join(', ') || 'Unknown Error';

    const formItemConfig = flattenFields.find((field: any) => {
      const configKey = field?.formItemPropsAllowConfig?.serverPayloadKey?.props?.defaultValue;

      return configKey === nameError;
    });
    if (formItemConfig?.fieldName === FIELD_NAME.TABLE) {
      // const targetError = error?.errorFields[0].name.map((obj: any) => obj);
      // const targetField = formItemConfig.key;
      // if (targetError[0] === targetField) {
      //   message = 'Bảng chưa nhập dữ liệu';
      // }
      message = 'Thiếu thông tin tờ khai.';
    } else {
      const label = formItemConfig?.formItemPropsAllowConfig?.label?.props?.defaultValue;

      message = `${label ? label.replaceAll(':', '') : ''}${label ? ':' : ''} ${errors}`;
    }
  }

  return message;
};
