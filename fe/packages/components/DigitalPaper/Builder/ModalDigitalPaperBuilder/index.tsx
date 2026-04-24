import { TOnClickActionField } from '@packages/@types';
import { BuilderBar } from '@packages/components/BuilderBar';
import SideBarRight from '@packages/components/ConfigFieldSideBar/SideBarRight';
import ViewSchema from '@packages/components/ViewSchema';
import { ACTION_ON_FIELD } from '@packages/constants/fields';
import { FORM_LEVELS } from '@packages/constants/form';
import { MODE_VIEW } from '@packages/constants/modeView';
import {
  FormBuilder, IField, JsonSchema, Schema,
} from '@packages/main/Forms';
import { insertJsonToSchema } from '@packages/utils/insertJsonToSchema';
import {
  Col, Modal, Row, Select,
} from 'antd';
import update from 'immutability-helper';
import _ from 'lodash';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DEMO_VIEWER } from '~/pages/ViewPage/demo';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import {
  addNewField, replaceFields, selectActiveFields,
  selectIsOpenModalDigitalBuilder,
  selectModalDigitalBuilderProps,
  setActiveFieldKey,
  toggleOpenModalDigitalBuilder,
} from '~/redux/slices';
import { EnumDragDrop } from '~/types';
import { getMatchedFieldsRecursively } from '../../constant';
import './styles.scss';

export type TModalDigitalPaperBuilderProps = {
  subForm: JsonSchema,
  onSave: (values: any) => void,
  allSubForm: any
};

const ModalDigitalPaperBuilder = () => {
  const isOpen = useAppSelector(selectIsOpenModalDigitalBuilder);
  const {
    subForm: subFormProps,
    onSave,
    allSubForm,
  } = useAppSelector(selectModalDigitalBuilderProps);
  const [activeKeyForm, setActiveKeyForm] = useState('');
  const [subForm, setSubForm] = useState<JsonSchema>(DEMO_VIEWER);
  const dispatch = useAppDispatch();
  const activeFields = useAppSelector(selectActiveFields);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isOpen && isFirstRender.current) {
      setSubForm(
        Schema.reconcile({
          ...subFormProps,
          schemaKey: FORM_LEVELS.DIGITAL_PAPER,
        }),
      );

      isFirstRender.current = false;
    }
  }, [isOpen, subFormProps]);

  const fieldsInColumnIndex = _get(subForm, 'fieldsInColumnIndex', []);

  const fields = useMemo(() => {
    return fieldsInColumnIndex.map((item) => {
      if (item) {
        const { fieldKeyCol, columnIndex } = item;
        const _result = activeFields.find(({ key }) => key === fieldKeyCol);
        if (_result) {
          return ({
            ..._result,
            columnIndex,
            isShowField: true,
          });
        }
      }
      return null;
    }).filter((item) => !_isEmpty(item)) as any;
  }, [fieldsInColumnIndex, activeFields]);

  const addJsonElement = ({ id }: { id: string }) => {
    const newJson = insertJsonToSchema(id, { isShowField: false });

    dispatch(addNewField(newJson));

    setSubForm((preSubForm) => {
      let _fieldsInColumnIndex = _get(preSubForm, 'fieldsInColumnIndex', []) as IField['fieldsInColumnIndex'];

      if (_fieldsInColumnIndex) {
        _fieldsInColumnIndex = _fieldsInColumnIndex.concat({
          columnIndex: 0,
          fieldKeyCol: newJson.key,
        });

        return {
          ...preSubForm,
          fieldsInColumnIndex: _fieldsInColumnIndex,
        };
      }

      return preSubForm;
    });
  };

  const handleCancel = useCallback(() => {
    dispatch(toggleOpenModalDigitalBuilder());
    dispatch(setActiveFieldKey(null));
    isFirstRender.current = true;
  }, []);

  const handleSave = () => {
    onSave(subForm);
    dispatch(toggleOpenModalDigitalBuilder());
    dispatch(setActiveFieldKey(null));
    isFirstRender.current = true;
  };

  const handleClickActionField: TOnClickActionField = (action, {
    parentField,
    addedField,
    fieldKey,
    viewContainerKey,
    dragIndex,
    hoverIndex,
  }) => {
    if (action === ACTION_ON_FIELD.ON_MOVE_FIELD) {
      setSubForm((prev: any) => {
        const _fieldsInColumnIndex = _get(prev, 'fieldsInColumnIndex', []) as any;
        if (_fieldsInColumnIndex) {
          const result = update(_fieldsInColumnIndex, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, _fieldsInColumnIndex[dragIndex]],
            ],
          });

          return {
            ...prev,
            fieldsInColumnIndex: result,
          };
        }
      });

      return false;
    }

    const handleUpdateFieldColumnIndex = (
      preSubForm: any,
      newFieldKeyCol: any,
      position: string,
    ) => {
      const _fieldsInColumnIndex = _.cloneDeep(_get(preSubForm, 'fieldsInColumnIndex', []) as IField['fieldsInColumnIndex']);

      if (_fieldsInColumnIndex) {
        const currentIndex = _fieldsInColumnIndex.findIndex(({ fieldKeyCol }) => (
          fieldKeyCol === fieldKey
        ));
        const newIndex = position === ACTION_ON_FIELD.INSERT_BEFORE
          ? currentIndex
          : currentIndex + 1;

        _fieldsInColumnIndex.splice(newIndex, 0, {
          columnIndex: 0,
          fieldKeyCol: newFieldKeyCol,
        });

        return {
          ...preSubForm,
          fieldsInColumnIndex: _fieldsInColumnIndex,
        };
      }

      return preSubForm;
    };

    if (action === ACTION_ON_FIELD.CONFIG) {
      return true;
    }

    if (action === ACTION_ON_FIELD.DUPLICATE) {
      setSubForm((preSubForm) => {
        return handleUpdateFieldColumnIndex(
          preSubForm,
          parentField.key,
          ACTION_ON_FIELD.INSERT_AFTER,
        );
      });

      return true;
    }

    if (action === ACTION_ON_FIELD.INSERT_AFTER || action === ACTION_ON_FIELD.INSERT_BEFORE) {
      if (viewContainerKey) return true;

      addedField.isShowField = false;
      setSubForm((preSubForm) => {
        return handleUpdateFieldColumnIndex(preSubForm, addedField.key, action);
      });

      dispatch(addNewField(addedField));

      return false;
    }

    return false;
  };

  const handleImport = (schema: any) => {
    const newSchema = Schema.reconcile(schema);

    const fieldInImport = _get(newSchema, 'fields', []);

    const newFields = fieldInImport.map((item, index) => ({
      ...item,
      isShowField: false,
      index,
    })) as any[];

    const allNewFields = activeFields.concat(newFields);

    dispatch(replaceFields(allNewFields));

    setSubForm((preSubForm) => {
      let _fieldsInColumnIndex = _get(preSubForm, 'fieldsInColumnIndex', []) as IField['fieldsInColumnIndex'];

      if (_fieldsInColumnIndex) {
        const allFieldColumnIndex = _.flatten(
          newFields.map(({
            fieldsInColumnIndex: __fieldsInColumnIndex,
          }: any) => __fieldsInColumnIndex),
        );

        const test = (newFields as any).filter(({ key, uniqId: _uniqId }: any) => {
          return (
            !allFieldColumnIndex
              .find(({ fieldKeyCol }) => fieldKeyCol === key || fieldKeyCol === _uniqId)
          );
        }).toSorted((a: any, b: any) => a.index - b.index);

        _fieldsInColumnIndex = _fieldsInColumnIndex.concat(
          test.map(({ key }: any) => ({
            columnIndex: 0,
            fieldKeyCol: key,
          })),
        );

        return {
          ...preSubForm,
          fieldsInColumnIndex: _fieldsInColumnIndex,
        };
      }

      return preSubForm;
    });
  };

  const [, drop] = useDrop(() => ({
    accept: EnumDragDrop.SIDE_MENU,
    drop: (item: { id: string }) => addJsonElement(item),
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  }));

  const matchedFields = useMemo(() => {
    return getMatchedFieldsRecursively(fields, activeFields);
  }, [fields, activeFields]);

  const targetFieldInMatchedFields = fields.concat(matchedFields).filter((_item: any) => _item);

  const finalSchemaInModal = {
    ...DEMO_VIEWER,
    fields: targetFieldInMatchedFields,
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Modal
        open={isOpen}
        onCancel={handleCancel}
        
        style={{ top: 20, maxHeight: 400 }}
        width="95%"
        rootClassName="page-sign-builder"
        onOk={handleSave}
        maskClosable={false}
      >
        <DndProvider backend={HTML5Backend}>
          <Row gutter={[24, 24]}>
            <Col span={4}>

              <h3>Config sub form</h3>
              {allSubForm
            && (
            <Select
              options={Object.keys(allSubForm).map((key) => ({
                label: key,
                value: key,
              }))}
              style={{ pointerEvents: 'all', width: 200, marginRight: 5 }}
              value={activeKeyForm}
              onChange={(value) => {
                setActiveKeyForm(value);
                setSubForm(Schema.reconcile({
                  ...allSubForm[value],
                  schemaKey: FORM_LEVELS.DIGITAL_PAPER,
                }));
              }}
            />
            )}
              <ViewSchema schema={DEMO_VIEWER} onSave={handleImport} />
            </Col>
            <Col span={20}>
              <h3>Schema in modal</h3>
              <ViewSchema schema={finalSchemaInModal} />
            </Col>
          </Row>
          <br />
          <Row justify="space-between">
            <Col span={4}>
              <BuilderBar />
            </Col>
            <Col span={16} ref={drop as any} className="content-form-view">
              <FormBuilder
                schema={{ fields }}
                modeView={MODE_VIEW.EDIT}
                onClickActionField={handleClickActionField}
              />
            </Col>
            <Col span={4} className="config-editor">
              <SideBarRight />
            </Col>
          </Row>
        </DndProvider>
      </Modal>
    </div>
  );
};

export default ModalDigitalPaperBuilder;
