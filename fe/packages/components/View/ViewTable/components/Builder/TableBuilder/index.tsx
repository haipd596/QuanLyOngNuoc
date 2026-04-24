import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Flex,
  FormInstance, Row,
  Space,
  Table,
} from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { ColumnType } from 'antd/es/table';
import {
  useEffect, useMemo, useRef, useState,
} from 'react';

import { SPECIFIC_HIDDEN_KEYS_ADDRESS } from '@packages/components/View/ButtonSyncDataToKhai/Viewer/transform.helper';
import { FIELD_NAME } from '@packages/constants/fields';
import { configColumns } from '@packages/utils';
import clsx from 'clsx';
import { useAppSelector } from '~/redux/hooks';
import { selectIsDuThao } from '~/redux/slices';
import { ITableBuilder, TYPE_ACTION } from '../../../type.table';
import { formatFieldConfigToColumnTable } from '../../../utils';
import ModalAddFieldTable from '../../Viewer/ModalAddFieldTable';
import { BuilderFieldContent } from '../BuilderFieldContent';
import { BuilderFieldSide } from '../BuilderFieldSide';
import { ConfigFieldTable } from '../ConfigFieldTable';

const TableBuilder: React.FC<ITableBuilder> = (props) => {
  const {
    columns,
    onChange,
    fieldKey,
    value,
    isHiddenAction,
    subForm,
    groupColumns,
    fieldName,
    isShowOrderNumber,
    subFormInExtraDataSource,
    addDataFromExtraSource,
    ...rest
  } = props;
  const formRef = useRef<FormInstance>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalExtraDataSource, setOpenModalExtraDataSource] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<AnyObject[]>([]);
  const [columnFields, setColumnFields] = useState<ColumnType<any>[]>([]);
  const isDuThao = useAppSelector(selectIsDuThao);

  const columnActions: any = useMemo(() => ({
    title: 'Thao Tác',
    dataIndex: 'action',
    width: 100,
    className: 'btn-action-column',
    render: () => (
      <Space size={[5, 0]} align="baseline">
        <Button
          icon={(<i className={clsx('fa-solid fa-pen-to-square fa-xl', 'icon_global_dvc')} />)}
          disabled
        />
        <Button icon={(<i className={clsx('fa-solid fa-trash fa-lg', 'icon_global_dvc')} />)} disabled />
      </Space>
    ),
  }), []);

  useEffect(() => {
    if (columns && columns.length > 0) {
      const _columns: ITableBuilder['columns'] = [];
      columns.forEach((item) => {
        if (item.columnDataType.props.defaultValue === FIELD_NAME.F_ADDRESS) {
          const tableConfig: any = subForm?.fields.find(({ uniqId }) => uniqId === item.uniqId);
          if (tableConfig) {
            const options = formatFieldConfigToColumnTable(tableConfig, item.columnDataType);
            if (options?.length) return _columns.push(...options);
          }
        }

        _columns.push(item);
      });

      const initColumns = configColumns(fieldName, _columns, groupColumns, isShowOrderNumber);

      const filterIsShowColumns = _columns.filter(({ isShowColumn }: any) => isShowColumn);
      const builderDataSource = filterIsShowColumns.map((col: ColumnType<any>) => (
        { [col.dataIndex]: 'Nội dung' }
      )).reduce((acc, cur) => ({ ...acc, ...cur }), {});

      // setColumnFields(
      //   isHiddenAction
      //     ? filterIsShowColumns
      //     : [...filterIsShowColumns, columnActions],
      // );

      // Fix UI groupColumns in tableBuilder 9/6/2025
      setColumnFields(
        isHiddenAction
          ? initColumns
          : [...initColumns, columnActions],
      );
      setDataSource([builderDataSource]);
    } else {
      setColumnFields([]);
    }
  }, [columns, isHiddenAction, isShowOrderNumber, groupColumns]);

  const filterEmptyObjects = (data: AnyObject[]) => {
    return data.filter((item) => {
      if (!item.key || (item.feKey !== undefined && !item.feKey)) {
        return false;
      }
      const relevantKeys = Object.keys(item).filter(
        (key) => !SPECIFIC_HIDDEN_KEYS_ADDRESS.includes(key),
      );

      return !relevantKeys.every((key) => item[key] === '');
    });
  };

  const filteredDataSource = filterEmptyObjects([...dataSource]);

  return (
    <div>
      <Table
        {...rest}
        columns={columnFields}
        locale={{ emptyText: 'Chưa có dữ liệu!' }}
        dataSource={isDuThao ? filteredDataSource : [...dataSource]}
        className="table-form-control"
      />
      <Flex justify="end" gap={8}>
        <Button
          type="primary"
          className={clsx('btn-add-column')}
          icon={<PlusOutlined style={{ color: 'white' }} />}
          onClick={() => setOpenModal(true)}
        >
          Thêm
        </Button>
        {addDataFromExtraSource?.isShow ? (
          <Button
            type="primary"
            className={clsx('btn-add-column')}
            icon={<PlusOutlined style={{ color: 'white' }} />}
            onClick={() => setOpenModalExtraDataSource(true)}
          >
            {addDataFromExtraSource.text}
          </Button>
        ) : null}
      </Flex>
      <ModalAddFieldTable
        width="95%"
        openModal={openModalExtraDataSource}
        formRef={formRef as any}
        typeAction={TYPE_ACTION.BUILDER}
        onOk={() => setOpenModalExtraDataSource(false)}
        onCancel={() => setOpenModalExtraDataSource(false)}
      >
        <Row justify="space-between" align="top" gutter={[3, 0]}>
          <Col xl={20} className="side-field">
            <Row justify="space-between" align="top" gutter={[3, 0]}>
              <Col xl={12}>
                <BuilderFieldSide
                  subForm={subFormInExtraDataSource}
                />
              </Col>
              <Col xl={12}>
                <BuilderFieldContent
                  subForm={subFormInExtraDataSource}
                />
              </Col>
            </Row>
          </Col>
          <Col xl={4}>
            <ConfigFieldTable
              subForm={subFormInExtraDataSource}
              fieldKey={fieldKey}
            />
          </Col>
        </Row>
      </ModalAddFieldTable>
      <ModalAddFieldTable
        width="95%"
        openModal={openModal}
        formRef={formRef as any}
        typeAction={TYPE_ACTION.BUILDER}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
      >
        <Row justify="space-between" align="top" gutter={[3, 0]}>
          <Col xl={20} className="side-field">
            <Row justify="space-between" align="top" gutter={[3, 0]}>
              <Col xl={12}>
                <BuilderFieldSide
                  subForm={subForm}
                  isModeEditModal
                />
              </Col>
              <Col xl={12}>
                <BuilderFieldContent
                  subForm={subForm}
                />
              </Col>
            </Row>
          </Col>
          <Col xl={4}>
            <ConfigFieldTable
              subForm={subForm}
              fieldKey={fieldKey}
            />
          </Col>
        </Row>
      </ModalAddFieldTable>
    </div>
  );
};

export default TableBuilder;
