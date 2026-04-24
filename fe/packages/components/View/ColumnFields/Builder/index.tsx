import { PlusOutlined } from '@ant-design/icons';
import {
  Button, Col, Modal, Row,
} from 'antd';
import { useState } from 'react';

import { TModeView, TOnClickActionField } from '@packages/@types';
import { BuilderBar } from '@packages/components/BuilderBar';
import { MODE_VIEW } from '@packages/constants/modeView';
import FieldItem from '@packages/main/Forms/FormBase/FieldItem';
import { Field } from '@packages/schema/fields/fieldModel';
import { insertJsonToSchema } from '@packages/utils/insertJsonToSchema';
import { useAppDispatch } from '~/redux/hooks';
import { addFieldColumn } from '~/redux/slices';
import '../styles.scss';
import { IBaseColumnField } from '../type';

export interface ViewRowAndColumnProps extends IBaseColumnField {
  fieldKey: string;
  fieldsInColumnIndex: [],
  modeView: TModeView,
  fields: Field[],
  onRemoveField: any,
  onClickActionField?: TOnClickActionField,
}

function ColumnFieldsBuilder(props: ViewRowAndColumnProps) {
  const {
    rows,
    columns = [],
    fieldKey: viewContainerKey,
    fieldsInColumnIndex,
    fields,
    onClickActionField,
  } = props;
  const [isOpenControl, setIsOpenControl] = useState<boolean>(false);
  const [columnIndex, setColumnIndex] = useState<number>(0);
  // const fieldSchema = useAppSelector(selectActiveFields);
  const dispatch = useAppDispatch();

  const handleAddField = (fieldKey: string) => {
    const fieldJson = insertJsonToSchema(fieldKey);

    const data = {
      columnIndex,
      fieldKeyCol: fieldJson.key,
      singleField: fieldJson,
      viewContainerKey,
    };

    dispatch(
      addFieldColumn(data),
    );
  };

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
    .filter((item) => item !== undefined);

  return (
    <div className="wrapper-view-container">
      <Row {...rows} gutter={0}>
        {columns.map((item, indexRow) => (
          <Col {...item} key={indexRow}>
            <div
              className="item-field"
            >
              {fieldContainer.map((field, fieldIndex) => {
                if (field && field?.columnIndex === indexRow) {
                  // eslint-disable-next-line @typescript-eslint/no-shadow
                  const { columnIndex, ...item } = field;

                  return (
                    <FieldItem
                      field={item as Field<any>}
                      fieldIndex={fieldIndex}
                      modeView={MODE_VIEW.EDIT}
                      key={field?.key}
                      fields={fields}
                      viewContainerKey={viewContainerKey}
                      parentColumnIndex={indexRow}
                      onClickActionField={onClickActionField}
                    />
                  );
                }

                return null;
              })}
              <div
                className="btn-add-field"
                onClick={() => {
                  setIsOpenControl(true);
                  setColumnIndex(indexRow);
                }}
              >
                <Button
                  type="primary"
                  shape="circle"
                  icon={<PlusOutlined />}
                />
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <Modal
        title="Click to add a field"
        className="modal-field-control"
        open={isOpenControl}
        onOk={() => {
          setIsOpenControl(false);
        }}
        onCancel={() => {
          setIsOpenControl(false);
        }}
        footer={null}
        styles={{ body: { height: 550, overflow: 'auto', marginRight: -20 } }}
      >
        <BuilderBar
          onAddField={(fieldKey: string) => {
            handleAddField(fieldKey);
            setIsOpenControl(false);
          }}
        />
      </Modal>
    </div>
  );
}

export default ColumnFieldsBuilder;
