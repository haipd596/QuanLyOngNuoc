import _omit from 'lodash/omit';

export const omitFormItem = (formItemProps: any) => {
  return _omit(formItemProps, ['serverPayloadKey', 'wrapperColumnNumber', 'initFieldData']);
};

export const omitRedundantFieldProps = (inputProps: any): any => {
  return _omit(
    inputProps,
    [
      'styleLabelParseFromJsonTree',
      'styleWrapperParseFromJsonTree',
      'stylesPropsParseFromJsonTree',
      'subForm',
      'isShowInDetailModeView',
      'isShowInModeView',
      'listKeyValueInViewInfo',
      'modeView',
      'fields',
      'fieldsInColumnIndex',
      'fieldName',
      'fieldKey',
      'individualStyle',
      'hideIf',
      'onClickActionField',
    ],
  );
};

export const omitRedundantAsyncFieldProps = (props: any) => {
  return _omit(props, ['indexLabel', 'pathToSource', 'indexValue', 'transformDataOption']);
};
