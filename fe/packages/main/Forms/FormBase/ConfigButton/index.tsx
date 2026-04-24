import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CopyTwoTone, DeleteOutlined, PlusCircleTwoTone,
} from '@ant-design/icons';
import { AnyObject } from 'antd/es/_util/type';
import update from 'immutability-helper';
import React, {
  useCallback, useMemo, useRef, useState,
} from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { TOnClickActionField } from '@packages/@types';
import { BuilderBar } from '@packages/components/BuilderBar';
import ShowModal from '@packages/components/ShowModal';
import ShowPopover from '@packages/components/ShowPopover';
import { ACTION_ON_FIELD } from '@packages/constants/fields';
import { defineComponent } from '@packages/utils/common';
import { duplicateFieldRecursive } from '@packages/utils/duplicateFields';
import { insertJsonToSchema } from '@packages/utils/insertJsonToSchema';
import { Button, Tooltip } from 'antd';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import {
  addFieldAtPosition,
  addFieldByPositionFormStep,
  bulkAddField,
  duplicateFieldInAContainer,
  removeField,
  selectActiveConfigFieldKey,
  selectActiveFields,
  setActiveFieldKey,
  sortFields,
} from '~/redux/slices';
import { setLoadingBuilderSchema } from '~/redux/slices/CMDKSlice';
import { EnumDragDrop } from '~/types';
import './styles.scss';

type TConfigButton = {
  children: React.ReactNode,
  componentKey: string,
  _fieldName?: string | undefined,
  index: number,
  viewContainerKey?: string | undefined,
  parentColumnIndex?: string | number,
  serverPayloadKey: string,
  isModeEditModal?: boolean;
  onClickActionField?: TOnClickActionField
};

export function ConfigButton({
  children,
  componentKey,
  index,
  viewContainerKey,
  parentColumnIndex,
  serverPayloadKey,
  isModeEditModal,
  onClickActionField,
}: TConfigButton) {
  const refElement = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const fields = useAppSelector(selectActiveFields);
  const activeConfigFieldKey = useSelector(selectActiveConfigFieldKey);
  const [isOpenControl, setIsOpenControl] = useState<boolean>(false);
  const [position, setPosition] = useState<'before' | 'after'>('after');

  // TODO: Update list field by sorting
  const moveField = useCallback((dragIndex: number, hoverIndex: number) => {
    if (onClickActionField) {
      const isContinue = onClickActionField(
        ACTION_ON_FIELD.ON_MOVE_FIELD,
        {
          dragIndex,
          hoverIndex,
          fieldKey: '',
        },
      );
      if (!isContinue) return;
    }
    dispatch(sortFields(
      update(fields, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, fields[dragIndex]],
        ],
      }),
    ));
  }, [fields]);

  const openModalConfig = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (onClickActionField) {
      const isContinue = onClickActionField(ACTION_ON_FIELD.CONFIG, { fieldKey: componentKey });
      if (!isContinue) return;
    }

    dispatch(setActiveFieldKey(componentKey));
  };

  const handleAddField = (fieldName: string) => {
    const fieldJson = insertJsonToSchema(fieldName);

    if (onClickActionField) {
      const action = position === 'after' ? ACTION_ON_FIELD.INSERT_AFTER : ACTION_ON_FIELD.INSERT_BEFORE;
      const isContinue = onClickActionField(
        action,
        { addedField: fieldJson, fieldKey: componentKey, viewContainerKey },
      );

      if (!isContinue) return;
    }

    // Currently, addFieldByPositionFormStep just working with formstep
    if (viewContainerKey && typeof parentColumnIndex === 'number') {
      dispatch(addFieldByPositionFormStep({
        columnIndex: parentColumnIndex,
        singleField: fieldJson,
        viewContainerKey,
        fieldKeyActive: componentKey,
        atPosition: position,
      }));
    } else {
      dispatch(addFieldAtPosition({ fields: fieldJson, position: position === 'before' ? index : index + 1 }));
    }
  };

  const handleDelete = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    if (onClickActionField) {
      onClickActionField(ACTION_ON_FIELD.REMOVE, { fieldKey: componentKey });
    }

    dispatch(removeField({ key: componentKey }));
    if (componentKey === activeConfigFieldKey) {
      dispatch(setActiveFieldKey(null));
    }
  };

  // Function to handle field duplication
  const handleDuplicate = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    dispatch(setLoadingBuilderSchema(true));
    e.stopPropagation();
    const { clonedFields, parentField } = duplicateFieldRecursive(fields, componentKey);

    // This function duplicate run when duplicate a component in a container
    // like a field in column field/tab/group field
    if (viewContainerKey && typeof parentColumnIndex === 'number') {
      dispatch(
        duplicateFieldInAContainer({
          columnIndex: parentColumnIndex,
          viewContainerKey,
          parentField,
          clonedFields,
          fieldActiveKey: componentKey,
        }),
      );
    } else {
      if (onClickActionField) {
        onClickActionField(ACTION_ON_FIELD.DUPLICATE, { fieldKey: componentKey, parentField });
      }
      dispatch(bulkAddField({ clonedFields, componentKey }));
    }

    setTimeout(() => {
      dispatch(setLoadingBuilderSchema(false));
    }, 1500);
  };

  // TODO: Drag element
  const [, drag] = useDrag({
    type: EnumDragDrop.FORM_ITEM,
    item: () => ({ componentKey, index }),
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  // TODO: Drop element and move element
  const [{ handlerId }, drop] = useDrop({
    accept: EnumDragDrop.FORM_ITEM,
    collect: (monitor) => ({ handlerId: monitor.getHandlerId() }),
    hover: (item: { index: number }, monitor: AnyObject) => {
      if (!refElement.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = refElement.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveField(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(refElement));

  const handleAddBefore = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setPosition('before');
    setIsOpenControl(true);
  };

  const handleAddAfter = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setPosition('after');
    setIsOpenControl(true);
  };

  // Kiểm tra xem nếu là table thì không hiện thị button copy và di chuyển field
  const isCheckTable = useMemo(() => {
    return isModeEditModal;
  }, [isModeEditModal]);

  return (
    <>
      <div
        ref={refElement}
        className={clsx({ active: componentKey === activeConfigFieldKey }, 'config-action-wrapper')}
        data-handler-id={handlerId}
        onClick={openModalConfig}
      >
        <div className="config-action-inner">
          <div className="actions">
            <Tooltip title={componentKey} placement="left">
              {serverPayloadKey}
            </Tooltip>
            {!isCheckTable
              ? (
                <>
                  <ShowPopover
                    content={(
                      <div style={{ display: 'flex' }}>
                        <div className="before_add_element">
                          <Button style={{ width: 100 }} onClick={handleAddBefore} type="primary" icon={<ArrowUpOutlined />}>Before</Button>
                        </div>
                        <div className="after_add_element">
                          <Button style={{ width: 100 }} onClick={handleAddAfter} type="primary" icon={<ArrowDownOutlined />}>After</Button>
                        </div>
                      </div>
              )}
                  >
                    <PlusCircleTwoTone className="adding" />
                  </ShowPopover>
                  <CopyTwoTone onClick={handleDuplicate} className="duplicate" />
                  <DeleteOutlined onClick={handleDelete} className="delete" />
                </>
              )
              : null}
          </div>
          {defineComponent(children as React.FunctionComponent | React.ReactElement)}
        </div>
      </div>
      <ShowModal
        open={isOpenControl}
        onOk={() => {
          setIsOpenControl(false);
        }}
        onCancel={() => {
          setIsOpenControl(false);
        }}
      >
        <div className="container_add_element">
          <BuilderBar
            onAddField={(fieldName: string) => {
              handleAddField(fieldName);
              setIsOpenControl(false);
            }}
          />
        </div>
      </ShowModal>
    </>
  );
}
