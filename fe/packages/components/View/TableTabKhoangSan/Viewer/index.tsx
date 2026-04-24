import { FIELD_NAME } from '@packages/constants/fields';
import { MODE_VIEW } from '@packages/constants/modeView';
import { Schema } from '@packages/main/Forms';
import FieldItem from '@packages/main/Forms/FormBase/FieldItem';
import React, { useMemo } from 'react';
import schemaTabKhoangSan from '../../../../../schemaTemplates/base.schema.table.khoangsan.json';

const TableTabKhoangSanViewer = () => {
  const modeView = MODE_VIEW.VIEW;

  const fields = useMemo(() => {
    const schemaBase = Schema.reconcile(schemaTabKhoangSan as any);
    const { fields: _fields } = schemaBase;

    return _fields;
  }, []);

  const field = useMemo(() => {
    return fields.find((obj) => obj.fieldName === FIELD_NAME.TAB) as any || {};
  }, [fields]);

  return (
    <FieldItem
      field={field}
      fields={fields}
      fieldIndex={field.fieldsInColumnIndex}
      fieldsInColumnIndex={field.fieldsInColumnIndex}
      modeView={modeView}
    />
  );
};

export default TableTabKhoangSanViewer;
