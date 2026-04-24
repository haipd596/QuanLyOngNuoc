import { TOnClickActionField } from '@packages/@types';
import { BuilderBar } from '@packages/components/BuilderBar';
import { MODE_VIEW } from '@packages/constants/modeView';
import FieldItem from '@packages/main/Forms/FormBase/FieldItem';
import { Field, IField } from '@packages/schema/fields/fieldModel';
import { insertJsonToSchema } from '@packages/utils/insertJsonToSchema';
import { Modal } from 'antd';
import _get from 'lodash/get';
import React, { useState } from 'react';
import { useAppDispatch } from '~/redux/hooks';
import { addFieldColumn } from '~/redux/slices';
import ChildrenEmpty from '../../FormStep/ChildrenEmpty';
import { IPropsValue } from '../../ViewInfo/type';

export type TBuilderCheckBoxToggleProps = {
  listKeyValueInViewInfo: IPropsValue[],
  fieldsInColumnIndex: IField['fieldsInColumnIndex'],
  fields: Field[],
  fieldKey: string,
  onClickActionField?: TOnClickActionField,
};

const BuilderCheckBoxToggle = (props: TBuilderCheckBoxToggleProps) => {
  const {
    fields,
    fieldKey: viewContainerKey,
    fieldsInColumnIndex = [],
    onClickActionField,
  } = props;
  const [isOpenControl, setIsOpenControl] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleAddField = (fieldKey: string) => {
    const fieldJson = insertJsonToSchema(fieldKey, { isInCheckBoxToggle: true });

    fieldJson.isShowField = false;

    dispatch(addFieldColumn({
      columnIndex: 0,
      fieldKeyCol: fieldJson.key,
      singleField: fieldJson,
      viewContainerKey,
    }));
  };

  const fieldInToggle = fields
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
    <div>
      {fieldInToggle
        .map((field, index) => {
          if (!field) return null;

          const label = _get(field, 'componentPropsAllowConfig.labelCheckBox.props.defaultValue', '');

          return (
            <div key={index}>
              {label}
              <FieldItem
                field={field as any}
                fieldIndex={index}
                modeView={MODE_VIEW.EDIT}
                key={field.key}
                fields={fields}
                viewContainerKey={viewContainerKey}
                parentColumnIndex={index}
                onClickActionField={onClickActionField}
              />
            </div>
          );
        })}
      <ChildrenEmpty onClick={(e) => {
        e.stopPropagation();
        setIsOpenControl(true);
      }}
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
          onAddField={(fieldKey: string) => {
            handleAddField(fieldKey);
            setIsOpenControl(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default BuilderCheckBoxToggle;
