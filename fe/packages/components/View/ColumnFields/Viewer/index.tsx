import {
  Col, Row,
} from 'antd';
import clsx from 'clsx';

import { HOSO_ID_PARAM1, HOSO_ID_PARAM2 } from '@packages/constants/commons';
import FieldItem from '@packages/main/Forms/FormBase/FieldItem';
import { Field, IField } from '@packages/schema/fields/fieldModel';
import { useMemo } from 'react';
import '../styles.scss';
import { IBaseColumnField } from '../type';

export interface ViewRowAndColumnProps extends IBaseColumnField {
  fieldKey: string;
  fieldsInColumnIndex: [],
  fields: IField[],
  subForm: IField['subForm'],
  modeView: string
}

function ColumnFieldsViewer(props: ViewRowAndColumnProps) {
  const {
    rows, columns = [], fieldsInColumnIndex, fields, modeView, fieldKey,
  } = props;
  const { search } = window.location;
  const params = new URLSearchParams(search);
  const hsid = params.get(HOSO_ID_PARAM1) || params.get(HOSO_ID_PARAM2);

  const fieldContainer = fields
    .map((item) => {
      const colKey: any = fieldsInColumnIndex?.find(({ fieldKeyCol }) => fieldKeyCol === item.key);
      if (colKey) {
        return {
          ...item,
          columnIndex: colKey.columnIndex,
        };
      }

      return null;
    })
    .filter((item) => item !== undefined && item !== null);

  const gutter = useMemo(() => {
    const gutters = rows.gutter[0];
    if (gutters) {
      return [gutters.gutterX, gutters.gutterY];
    }
  }, [rows]);

  return (
    <div className="wrapper-view-container">
      <Row {...rows} gutter={gutter as any}>
        {columns.map((colProps, indexRow) => (
          <Col
            {...colProps}
            key={indexRow}
            className={
              hsid
              && indexRow === 1
              && (fieldKey === 'COLUMN_FIELD_1293' || fieldKey === 'COLUMN_FIELD_262')
                ? 'hidden_btn_luuhoso'
                : ''
}
          >
            <div
              className={clsx('item-field', 'view-field')}
            >
              {fieldContainer.map((field, fieldIndex) => {
                if (field && field?.columnIndex === indexRow) {
                  const { columnIndex, ...item } = field;

                  return (
                    <FieldItem
                      field={item as Field<any>}
                      fieldIndex={fieldIndex}
                      modeView={modeView}
                      key={field?.key}
                      fields={fields as Field[]}
                    />
                  );
                }

                return null;
              })}
            </div>
          </Col>

        ))}
      </Row>
    </div>
  );
}

export default ColumnFieldsViewer;
