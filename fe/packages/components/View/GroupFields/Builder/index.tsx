import { TOnClickActionField } from '@packages/@types';
import { BuilderBar } from '@packages/components/BuilderBar';
import ConfigFieldSideBar from '@packages/components/ConfigFieldSideBar';
import { MODE_VIEW } from '@packages/constants/modeView';
import {
  Field, FormViewerStandalone, IField, Schema,
} from '@packages/main/Forms';
import FieldItem from '@packages/main/Forms/FormBase/FieldItem';
import { getFieldsByColumnIndex } from '@packages/utils/fields';
import { insertJsonToSchema } from '@packages/utils/insertJsonToSchema';
import { Col, Modal, Row } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import React, { useMemo, useState } from 'react';
import { useAppDispatch } from '~/redux/hooks';
import {
  addFieldColumn,
  updateFieldInSubForm,
} from '~/redux/slices';
import ChildrenEmpty from '../../FormStep/ChildrenEmpty';

type TGroupFieldsBuilderProps = {
  subForm: Schema,
  fieldKey: string,
  onSave: (value: AnyObject) => void,
  fieldsInColumnIndex: IField['fieldsInColumnIndex'],
  fields: Field[],
  onClickActionField?: TOnClickActionField
};

const GroupFieldsBuilder = (props: TGroupFieldsBuilderProps) => {
  const {
    fieldKey,
    fieldsInColumnIndex,
    fields,
    onClickActionField,
  } = props;
  const [isOpenConfigUpload, setIsOpenConfigUpload] = useState(false);
  const [activeConfig, setActiveConfig] = useState<any>();
  const [isOpenControl, setIsOpenControl] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleChangeConfig = (configUpdated: any) => {
    setActiveConfig(configUpdated);
  };

  const handleAddField = (fieldName: string) => {
    const fieldJson = insertJsonToSchema(fieldName);

    dispatch(
      addFieldColumn({
        columnIndex: 0,
        fieldKeyCol: fieldJson.key,
        singleField: fieldJson,
        viewContainerKey: fieldKey,
      }),
    );
  };

  const fieldContainer = useMemo(() => (
    getFieldsByColumnIndex(fields, fieldsInColumnIndex)
  ), [fields, fieldsInColumnIndex]);

  const handleSave = () => {
    dispatch(
      updateFieldInSubForm({
        parentFormKey: fieldKey,
        newData: activeConfig,
      }),
    );
    setIsOpenConfigUpload(false);
  };

  return (
    <div>
      <Row justify="start" gutter={[20, 0]}>
        {fieldContainer.map((field, fieldIndex) => {
          if (field && field?.columnIndex === 0) {
            const { columnIndex, ...item } = field;

            return (
              <FieldItem
                field={item as Field<any>}
                fieldIndex={fieldIndex}
                modeView={MODE_VIEW.EDIT}
                key={field?.key}
                fields={fields}
                viewContainerKey={fieldKey}
                parentColumnIndex={0}
                onClickActionField={onClickActionField}
              />
            );
          }

          return null;
        })}
      </Row>
      <ChildrenEmpty
        onClick={() => {
          setIsOpenControl(true);
        }}
        style={{ border: '1px solid red', borderRadius: 6 }}
      />
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
          onAddField={(_fieldKey: string) => {
            handleAddField(_fieldKey);
            setIsOpenControl(false);
          }}
        />
      </Modal>
      <Modal
        open={isOpenConfigUpload}
        onCancel={() => setIsOpenConfigUpload(false)}
        
        style={{ top: 20 }}
        width="100%"
        onOk={handleSave}
      >
        {activeConfig && (
          <Row gutter={8}>
            <Col span={12}>
              <FormViewerStandalone modeView={MODE_VIEW.VIEW} schema={{ fields: [activeConfig] }} />
            </Col>
            <Col span={12}>
              <ConfigFieldSideBar
                activeConfigFieldKey={activeConfig.key}
                fields={[
                  activeConfig,
                ]}
                onChange={handleChangeConfig}
                modeView={MODE_VIEW.EDIT}
              />
            </Col>
          </Row>
        )}
      </Modal>
    </div>
  );
};

export default GroupFieldsBuilder;
