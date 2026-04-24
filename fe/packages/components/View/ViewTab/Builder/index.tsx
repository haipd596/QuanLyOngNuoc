import {
  Button,
  Modal, Row, Tabs,
} from 'antd';
import { useMemo, useState } from 'react';

import { BuilderBar } from '@packages/components/BuilderBar';
import Loading from '@packages/components/Loading';
import { MODE_VIEW } from '@packages/constants/modeView';
import FieldItem from '@packages/main/Forms/FormBase/FieldItem';
import { Field } from '@packages/schema/fields/fieldModel';
import { getFieldsByColumnIndex } from '@packages/utils/fields';
import { insertJsonToSchema } from '@packages/utils/insertJsonToSchema';
import { useAppDispatch } from '~/redux/hooks';
import {
  addFieldColumn, replaceFields,
} from '~/redux/slices';
import ChildrenEmpty from '../../FormStep/ChildrenEmpty';
import TabTitle from '../TabTitle';
import '../index.scss';
import { TFormTabProps } from '../type.tab';
import { synchronizeFields } from './synchronizeFields';

const FormTabBuilder = (props: TFormTabProps) => {
  const {
    items, fieldKey: viewContainerKey, fieldsInColumnIndex,
    fields, subForm, value, onChange, onClickActionField, isDuplicate, ...rest
  } = props;
  const [isOpenControl, setIsOpenControl] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useAppDispatch();
  const synchronizeFnc = useMemo(synchronizeFields, []);
  const [isDuplicating, setIsDuplicating] = useState(false);

  const asyncDuplicateFields = () => {
    setIsDuplicating(true);
    synchronizeFnc(
      fields,
      items,
      viewContainerKey,
    ).then((newFields) => {
      dispatch(replaceFields(newFields));
      setIsDuplicating(false);
    });
  };

  const handleAddField = (fieldKey: string) => {
    const fieldJson = insertJsonToSchema(fieldKey);

    dispatch(
      addFieldColumn({
        columnIndex: activeTab,
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
      <TabTitle
        index={index}
        label={item.label}
      />
    ),
    children: (
      <div>
        <Row justify="start" gutter={[20, 0]}>
          {fieldContainer.map((field, fieldIndex) => {
            if (field && field?.columnIndex === activeTab) {
              // eslint-disable-next-line @typescript-eslint/no-shadow
              const { columnIndex, ...item } = field;

              return (
                <FieldItem
                  field={item as Field<any>}
                  fieldIndex={fieldIndex}
                  modeView={MODE_VIEW.EDIT}
                  key={field?.key}
                  listKeyValueInViewInfo={field.listKeyValueInViewInfo ?? []}
                  parentColumnIndex={activeTab}
                  viewContainerKey={viewContainerKey}
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
      <Loading isLoading={isDuplicating}>
        <Tabs
          {...rest}
          moreIcon={<span />}
          className="wrapper-tab"
          activeKey={String(activeTab)}
          onChange={(activeKey: string) => setActiveTab(Number(activeKey))}
          items={itemFields}
        />
        {isDuplicate && (
          <Button onClick={asyncDuplicateFields}>
            Đồng bộ
          </Button>
        )}
      </Loading>
      <Modal
        title="Click to add a field"
        className="modal-field-control"
        open={isOpenControl}
        onOk={() => setIsOpenControl(false)}
        onCancel={() => setIsOpenControl(false)}
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

export default FormTabBuilder;
