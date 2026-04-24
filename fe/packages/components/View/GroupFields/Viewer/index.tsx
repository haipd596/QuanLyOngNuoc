import { COLUMN_REFERENCES, FE_KEY } from '@packages/constants/commons';
import {
  Field, FormViewerStandalone, IField, Schema,
} from '@packages/main/Forms';
import { getFieldsByColumnIndex } from '@packages/utils/fields';
import { formManagers } from '@packages/utils/formManager';
// import { generateFeKey } from '@packages/utils/generateUniqId';
import { Row } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

import { FormInstance } from 'antd/lib';
import _ from 'lodash';
import {
  useCallback,
  useEffect, useMemo, useRef, useState,
} from 'react';
import { useAppSelector } from '~/redux/hooks';
import { selectActiveFields, selectIsDuThao } from '~/redux/slices';

export type TGroupFieldsViewerProps = {
  value: AnyObject,
  onChange: (value: AnyObject) => void,
  subForm: Schema,
  fieldsInColumnIndex: IField['fieldsInColumnIndex'],
  fields: Field[],
  modeView: string,
  fieldKey: string,
  columnReferenceType: string,
  name: string
};

const GroupFieldsViewer = (props: TGroupFieldsViewerProps) => {
  const {
    value,
    onChange,
    fieldsInColumnIndex,
    modeView,
    fieldKey,
    columnReferenceType,
    name,
  } = props;
  const ref:any = useRef<FormInstance>(null);
  const [formData, setFormData] = useState({});
  const refTimeOut = useRef<any>(null);
  const [isTriggerOnChange, setIsTriggerOnChange] = useState(true);
  const fields = useAppSelector(selectActiveFields);
  const isDuThao = useAppSelector(selectIsDuThao);

  useEffect(() => {
    if (isTriggerOnChange) {
      refTimeOut.current = setTimeout(() => {
        setIsTriggerOnChange(false);
        onChange({
          ...ref.current?.getFieldsValue(),
          // [FE_KEY]: generateFeKey(name, 0),
          // [COLUMN_REFERENCES]: columnReferenceType,
        });
      }, 1000);

      return () => {
        clearTimeout(refTimeOut.current);
      };
    }
  }, [isTriggerOnChange, name]);

  useMemo(() => {
    if (_isEmpty(formData)) {
      const __value = _get(_.cloneDeep(value), 0, {});
      delete __value[FE_KEY];
      delete __value[COLUMN_REFERENCES];
      setFormData(__value);
    }
  }, [value, columnReferenceType]);

  useEffect(() => {
    return () => {
      formManagers.remove(fieldKey);
    };
  }, []);

  const fieldContainer = useMemo(() => (
    getFieldsByColumnIndex(fields, fieldsInColumnIndex)
  ), [fields, fieldsInColumnIndex]);

  const handleInitValueForGroupField = useCallback((allFieldValues: any) => {
    setIsTriggerOnChange(true);
    setFormData(allFieldValues);
  }, []);

  const handleWatchValuesChange = useCallback((watchedValues: any) => {
    setIsTriggerOnChange(true);
    setFormData(watchedValues);
  }, []);

  return (
    <Row justify="start" gutter={[20, 0]} id={fieldKey}>
      <FormViewerStandalone
        modeView={modeView}
        onValuesChange={(_values, allValues) => {
          setIsTriggerOnChange(true);
          setFormData(allValues);
        }}
        onFormWatchChange={handleWatchValuesChange}
        onInitValueByInitialField={handleInitValueForGroupField}
        formData={formData}
        schema={{ fields: fieldContainer as any }}
        style={{ width: '100%' }}
        ref={(node: any) => {
          if (!ref.current) {
            formManagers.add({
              [fieldKey]: node,
            }, isDuThao);
            ref.current = node;
          }
        }}
      />
    </Row>
  );
};

export default GroupFieldsViewer;
