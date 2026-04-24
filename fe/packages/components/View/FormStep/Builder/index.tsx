import { BuilderBar } from '@packages/components/BuilderBar';
import { MODE_VIEW } from '@packages/constants/modeView';
import FieldItem from '@packages/main/Forms/FormBase/FieldItem';
import { Field } from '@packages/schema/fields/fieldModel';
import { getFieldsByColumnIndex } from '@packages/utils/fields';
import { insertJsonToSchema } from '@packages/utils/insertJsonToSchema';
import { Modal, Row, Tabs } from 'antd';
import React, { useMemo, useState } from 'react';
import { useAppDispatch } from '~/redux/hooks';
import { addFieldColumn } from '~/redux/slices';
import ChildrenEmpty from '../ChildrenEmpty';
import TabLabel from '../TabLabel';
import '../styles.scss';
import { TFormStepProps } from '../type';

const FormStepBuilder = (props: TFormStepProps) => {
  const {
    items,
    fieldKey: viewContainerKey,
    fieldsInColumnIndex,
    fields,
    onClickActionField,
    ...rest
  } = props;
  const [isOpenControl, setIsOpenControl] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useAppDispatch();

  const handleAddField = (fieldKey: string) => {
    const fieldJson = insertJsonToSchema(fieldKey);

    dispatch(
      addFieldColumn({
        columnIndex: activeStep,
        fieldKeyCol: fieldJson.key,
        singleField: fieldJson,
        viewContainerKey,
      }),
    );
  };

  const fieldContainer = useMemo(() => (
    getFieldsByColumnIndex(fields, fieldsInColumnIndex)
  ), [fields, fieldsInColumnIndex]);

  const itemFields = items?.map((item, index) => ({
    ...item,
    key: String(index),
    label: (
      <TabLabel
        index={index}
        label={item.label}
      />
    ),
    children: (
      <div>
        <Row justify="start" gutter={[20, 0]}>
          {fieldContainer.map((field, fieldIndex) => {
            if (field && field?.columnIndex === activeStep) {
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
                  parentColumnIndex={activeStep}
                  onClickActionField={onClickActionField}
                />
              );
            }

            return null;
          })}
        </Row>
        <ChildrenEmpty onClick={(e) => {
          e.stopPropagation();
          setIsOpenControl(true);
        }}
        />
      </div>
    ),
  }));

  return (
    <div>
      <Tabs {...rest} moreIcon={<span />} className="form-step" activeKey={String(activeStep)} onChange={(value) => setActiveStep(Number(value))} items={itemFields} />
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
};

export default FormStepBuilder;
