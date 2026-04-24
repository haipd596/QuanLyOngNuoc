import { TModeView, TOnClickActionField } from '@packages/@types';
import ConfigColumn from '@packages/components/ConfigColumn';
import { withLazySupport } from '@packages/components/LazySupport';
import NotSupport from '@packages/components/NotSupport';
import { isTabKhoangSanKeys } from '@packages/components/View/TableTabKhoangSan/Viewer/utils';
import { isTabKhoangSanKeys2 } from '@packages/components/View/TableTabKhoangSan_2/Viewer/utils';
import { IPropsValue } from '@packages/components/View/ViewInfo/type';
import { FIELD_NAME } from '@packages/constants/fields';
import { Field } from '@packages/schema/fields/fieldModel';
import { buildDisplayForHiddenField } from '@packages/utils';
import { parsePropsFromJsonTreeAsync } from '@packages/utils/browseJsonTree';
import { defineComponent } from '@packages/utils/common';
import { isNeedWrapFormItem } from '@packages/utils/fields';
import { HIDDEN_FIELDS } from '@packages/utils/hiddenFields';
import { omitFormItem } from '@packages/utils/omitProps';
import { VIEW_FIELDS } from '@packages/utils/viewFields';
import {
  isDetailsMode, isEditMode, isViewMode, isViewOrDetailMode,
} from '@packages/utils/viewMode';
import { Form } from 'antd';
import clsx from 'clsx';
import _isBoolean from 'lodash/isBoolean';
import _isEmpty from 'lodash/isEmpty';
import _isString from 'lodash/isString';
import { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '~/redux/hooks';
import { selectActiveFields } from '~/redux/slices';
import { ConfigButton } from '../ConfigButton';
import StyleProvider from '../StyleWrapper';
import './styles.scss';

type TFormBaseProps = {
  field: Field<any, any>,
  fieldIndex: number,
  modeView: TModeView,
  fields?: Field[],
  listKeyValueInViewInfo?: IPropsValue[] | undefined,
  fieldsInColumnIndex?: []
  viewContainerKey?: string | undefined,
  parentColumnIndex?: string | number,
  onClickActionField?: TOnClickActionField,
  isNotGrid?: boolean,
  isModeEditModal?: boolean;
};

function FieldItem({
  field, fieldIndex, modeView, viewContainerKey, isModeEditModal,
  parentColumnIndex, onClickActionField, isNotGrid, fields,
}: TFormBaseProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [fieldProps, setFieldProps] = useState<any>({});
  const _activeFields = useAppSelector(selectActiveFields);
  const activeFields = isTabKhoangSanKeys(field.key) || isTabKhoangSanKeys2(field.key)
    ? fields
    : _activeFields;

  const [formItemProps, setFormItemProps] = useState<any>({});
  // const isDuThao = useAppSelector(selectIsDuThao);

  const {
    fieldName,

    key,

    formItemPropsAllowConfig = {},

    formItemPropsReadOnly = {},

    componentPropsAllowConfig = {},

    componentPropsReadOnly = {},

    version,

    styleWrapperAllowConfig = {},

    styleComponentAllowConfig = {},

    styleLabelAllowConfig = {},

    listKeyValueInViewInfo,

    fieldsInColumnIndex,

    extraDataSourceField,

    subForm,
  } = field;

  const supportedField = useMemo(() => (
    _isString(fieldName) ? withLazySupport(VIEW_FIELDS[fieldName]) : undefined
  ), [fieldName]);

  useEffect(() => {
    if (supportedField) {
      setIsLoading(true);

      Promise.all([
        parsePropsFromJsonTreeAsync(componentPropsAllowConfig),
        parsePropsFromJsonTreeAsync(formItemPropsAllowConfig),
        parsePropsFromJsonTreeAsync(styleComponentAllowConfig),
        parsePropsFromJsonTreeAsync(styleWrapperAllowConfig),
        parsePropsFromJsonTreeAsync(styleLabelAllowConfig),
      ]).then((results) => {
        const [
          fieldPropsParseFromJsonTree,
          formItemPropsPropsParseFromJsonTree,
          stylesPropsParseFromJsonTree,
          styleWrapperParseFromJsonTree,
          styleLabelParseFromJsonTree,
        ] = results;

        setIsLoading(false);

        const _fieldProps = {
          ...fieldPropsParseFromJsonTree,
          ...componentPropsReadOnly,
          version,
          stylesPropsParseFromJsonTree,
          styleWrapperParseFromJsonTree,
          styleLabelParseFromJsonTree,
          name: formItemPropsPropsParseFromJsonTree.serverPayloadKey,
          modeView,
        };

        if (isEditMode(modeView)) {
          _fieldProps.disabled = true;
        }

        const _formItemProps = {
          ...formItemPropsPropsParseFromJsonTree,
          ...formItemPropsReadOnly,
          name: formItemPropsPropsParseFromJsonTree.serverPayloadKey,
        };
        setFieldProps(_fieldProps);
        setFormItemProps(_formItemProps);
      }).catch((error) => {
        throw new Error(error?.message);
      });
    }
  }, [
    field.componentPropsAllowConfig,
    field.componentPropsReadOnly,
    field.formItemPropsAllowConfig,
    field.styleComponentAllowConfig,
    field.stylePropsReadOnly,
    field.styleWrapperAllowConfig,
    field.styleLabelAllowConfig,
    version,
  ]);

  let _component = useMemo(() => {
    if (_isEmpty(fieldProps)) return null;
    return defineComponent(supportedField, {
      ...fieldProps,
      fieldName,
      fields: activeFields,
      subForm,
      listKeyValueInViewInfo,
      fieldsInColumnIndex,
      fieldKey: field.key,
      onClickActionField,
      extraDataSourceField,
    });
  }, [
    fieldProps,
    supportedField,
    activeFields,
    subForm,
    listKeyValueInViewInfo,
    fieldsInColumnIndex,
    onClickActionField,
    extraDataSourceField,
  ]);

  if (!supportedField) {
    return <NotSupport />;
  }

  if (isLoading) return <p>Loading...</p>;

  if (fieldProps.hideIf && isViewMode(modeView)) {
    return null;
  }

  if (isNeedWrapFormItem(fieldName)) {
    const defineBorder = () => {
      const borderWidth = fieldProps.styleLabelParseFromJsonTree?.borderWidth;

      const borderSide = fieldProps.styleLabelParseFromJsonTree?.border;

      const borderColor = fieldProps.styleLabelParseFromJsonTree?.borderColor;

      const borderStyle = 'solid';

      if (!borderWidth || !borderSide || !borderColor || !borderStyle) return {};

      return {
        border: 'none',
        [borderSide]: `${borderWidth}px ${borderStyle} ${borderColor}`,
      };
    };

    const border = defineBorder();

    _component = (
      <>
        <Form.Item
          {...omitFormItem(formItemProps)} // Form item props doesn't include Styling
          name={
            HIDDEN_FIELDS[fieldName]
              ? buildDisplayForHiddenField(formItemProps.name)
              : formItemProps.name
          }
          label={formItemProps.label && (
          <span
            style={{
              ...fieldProps.styleLabelParseFromJsonTree,
              ...border,
            }}
          >
            {formItemProps.label}
          </span>
          )}
        >
          {_component}
        </Form.Item>
        {HIDDEN_FIELDS[fieldName] ? (
          <Form.Item
            {...omitFormItem(formItemProps)}
            name={formItemProps.name}
            hidden
          >
            {defineComponent(HIDDEN_FIELDS[fieldName], {
              parentName: buildDisplayForHiddenField(formItemProps.name),
              typeOfDate: fieldProps.typeOfDate,
            })}
          </Form.Item>
        ) : null}
        {fieldName === FIELD_NAME.DATE_PICKER ? (
          <>
            <Form.Item name={`${formItemProps.name}_date`} hidden>
              {defineComponent(HIDDEN_FIELDS[fieldName], {
                parentName: buildDisplayForHiddenField(formItemProps.name),
                typeOfDate: 'DD',
              })}
            </Form.Item>
            <Form.Item name={`${formItemProps.name}_month`} hidden>
              {defineComponent(HIDDEN_FIELDS[fieldName], {
                parentName: buildDisplayForHiddenField(formItemProps.name),
                typeOfDate: 'MM',
              })}
            </Form.Item>
            <Form.Item name={`${formItemProps.name}_year`} hidden>
              {defineComponent(HIDDEN_FIELDS[fieldName], {
                parentName: buildDisplayForHiddenField(formItemProps.name),
                typeOfDate: 'YYYY',
              })}
            </Form.Item>
          </>
        ) : null}
        <Form.Item
          name="checkBoxObj"
          hidden
        />
        <Form.Item
          name="checkBoxObj2"
          hidden
        />
      </>
    );
  }

  if (isViewOrDetailMode(modeView)) {
    if (fieldProps.name === 'MaXacThuc' || fieldProps.name === 'XacNhanDongY') {
      return null;
    }

    return (
      <ConfigColumn className={fieldName === FIELD_NAME.VIEW_INFO_HIDDEN ? 'style_view_info_hidden_duthao' : ''} key={key} columnWith={formItemProps.wrapperColumnNumber} isNotGrid={isNotGrid}>
        <div className={clsx({
          'view-mode-only': isViewMode(modeView),
          'details-mode-only': isDetailsMode(modeView),
        })}
        >
          <StyleProvider fieldProps={fieldProps}>
            {_component}
          </StyleProvider>
        </div>
      </ConfigColumn>
    );
  }

  if (isEditMode(modeView)) {
    return (
      <ConfigColumn key={key} columnWith={formItemProps.wrapperColumnNumber} isNotGrid={isNotGrid}>
        <ConfigButton
          componentKey={key}
          index={fieldIndex}
          viewContainerKey={viewContainerKey}
          onClickActionField={onClickActionField}
          serverPayloadKey={fieldProps.name}
          parentColumnIndex={parentColumnIndex}
          isModeEditModal={isModeEditModal}
        >
          <StyleProvider fieldProps={fieldProps}>
            {_component}
          </StyleProvider>
        </ConfigButton>
      </ConfigColumn>
    );
  }

  return null;
}

export default FieldItem;
