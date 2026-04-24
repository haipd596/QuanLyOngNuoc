import {
  Button, FormInstance, message, Table,
} from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import clsx from 'clsx';
import _ from 'lodash';
import _get from 'lodash/get';
import {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { SPECIFIC_HIDDEN_KEYS_ADDRESS } from '@packages/components/View/ButtonSyncDataToKhai/Viewer/transform.helper';
import FileButtonGroup from '@packages/components/View/FileButtonGroup';
import { COLUMN_REFERENCES, FE_KEY, TABLE_NAME_KHOANG_SAN_REF } from '@packages/constants/commons';
import { MODE_VIEW } from '@packages/constants/modeView';
import { FormViewerStandalone } from '@packages/main/Forms';
import {
  checkDuplicateDataCol,
  COLUMN_TABLE_FILE, configColumns,
  generateFeKey, isShowFile, 
  // transformDataByReference,
} from '@packages/utils';
import { formManagers } from '@packages/utils/formManager';
import { observableTableRefChange } from '@packages/utils/observable';
import { randomString } from '@packages/utils/radomString';
import { isDetailsMode } from '@packages/utils/viewMode';
import { useWatch } from 'antd/es/form/Form';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import { TableRowSelection } from 'antd/es/table/interface';
import { useAppSelector } from '~/redux/hooks';
import { selectActiveGiayToId, selectIsDuThao } from '~/redux/slices';
import { DataType, ITableBuilder, TYPE_ACTION } from '../../../type.table';
import { ColumnActions } from '../../ColumnAction';
import ModalAddFieldTable from '../ModalAddFieldTable';
import Summary from '../Summary';
import { ViewFieldContent } from '../ViewFieldContent';

const TableViewer: React.FC<ITableBuilder> = (props) => {
  const {
    columns,
    value,
    fieldKey,
    onChange,
    onAddField,
    isHiddenAction,
    uploadColumns,
    isShowOrderNumber,
    groupColumns,
    modeView,
    className,
    name,
    subForm,
    titleModal,
    fieldName,
    addDataFromExtraSource,
    subFormInExtraDataSource,
    isShowCheckbox,
    isShowSummary,
    maxRowKey,
    maxRowErrorMessage,
    ...rest
  } = props;
  const formRef = useRef<FormInstance>(null);
  const formAddExtraSourceRef = useRef<FormInstance>(null);
  const [dataSource, setDataSource] = useState<AnyObject[]>(value || []);
  const [dataSourceUpdate, setDataSourceUpdate] = useState<AnyObject>({});
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalExtraDataSource, setOpenModalExtraDataSource] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const isFirstRenderRef = useRef(true);
  const activeGiayToId = useAppSelector(selectActiveGiayToId);
  const isDuThao = useAppSelector(selectIsDuThao);
  const form = useFormInstance();
  const getMaxRowValue = useWatch(maxRowKey, form);
  const [isDisabledSave, setIsDisabledSave] = useState(true);
  const [action, setAction] = useState<TYPE_ACTION>(TYPE_ACTION.ADD);

  useEffect(() => {
    if (name) {
      observableTableRefChange.subscribe(name, (data) => {
        setDataSource(data);
        onChange(data);
      });

      return () => observableTableRefChange.unsubscribe(name);
    }
  }, [name]);

  useEffect(() => {
    // eslint-disable-next-line react/destructuring-assignment
    if (_.isEmpty(value) && isFirstRenderRef.current && !props['aria-required']) {
      onChange([
        columns.reduce((acc, cur) => {
          if (cur.dataIndex !== FE_KEY && cur.dataIndex !== COLUMN_REFERENCES) {
            acc[cur.dataIndex] = '';
            // acc.TinhIdHidden = JSON.stringify({ label: '', value: 0 });
            // acc.HuyenIdHidden = JSON.stringify({ label: '', value: 0 });
            // acc.XaIdHidden = JSON.stringify({ label: '', value: 0 });
            // acc.TenKhoangSanHidden = '';
          }
          return acc;
        }, {} as any),
      ]);
    }
    isFirstRenderRef.current = false;
  // eslint-disable-next-line react/destructuring-assignment
  }, [value, columns, props['aria-required']]);

  // Khi thay đổi số lượng có ràng buộc với số lượng bản ghi trong table
  useEffect(() => {
    if ((getMaxRowValue || getMaxRowValue === 0) && dataSource.length > 0) {
      if (getMaxRowValue < dataSource.length) {
        const _cloneMaxData = _.cloneDeep(dataSource.slice(0, getMaxRowValue));
        setDataSource(_cloneMaxData);
        onChange(_cloneMaxData);
      }
    }
  }, [getMaxRowValue]);

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

  const onSelectChange = (newSelectedRowKeys: any[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    onChange(dataSource.map((item: any) => ({
      ...item,
      isSelected: newSelectedRowKeys.includes(item.key),
    })));
  };

  const rowSelection: TableRowSelection<DataType> | undefined = isShowCheckbox ? {
    selectedRowKeys,
    onChange: onSelectChange,
  } : undefined;

  const handleDeleteField = useCallback((fieldId: string) => {
    setDataSource((prev) => {
      // if a table has reference to other table, need remove the data in other table too
      if (name && TABLE_NAME_KHOANG_SAN_REF.includes(name) && activeGiayToId) {
        const _form = formManagers.getItem(activeGiayToId);
        const itemDeleted = prev.find(({ key }) => key === fieldId);

        if (itemDeleted) {
          const currentData = _form?.getFieldValue('ThongTinKhoangSan');

          const arrayData = _.pick(currentData, TABLE_NAME_KHOANG_SAN_REF);

          const bulkKeysNeedDelete: any = [];

          // recursive to get all feKey deps in each table
          const recursive = (myKey: any) => {
            Object.keys(arrayData).forEach((key) => {
              const indexFeKeyFound = _.findIndex(
                arrayData[key],
                ({ Reference }) => Reference?.includes(myKey),
              );

              if (indexFeKeyFound > -1) {
                const finalData = _.find(
                  arrayData[key],
                  ({ Reference }) => Reference?.includes(myKey),
                );

                bulkKeysNeedDelete.push({ key, keyDeps: myKey });

                if (finalData) {
                  recursive(finalData.feKey);
                }
              }
            });
          };
          recursive(itemDeleted.feKey);

          // remove all data
          bulkKeysNeedDelete.forEach(({ key: tableKey, keyDeps }: any) => {
            const finalData = _.filter(
              arrayData[tableKey],
              ({ Reference }) => !Reference?.includes(keyDeps),
            );

            observableTableRefChange.notifyByKey(tableKey, finalData);
          });
        }
      }

      const updateDataSource = prev.filter((item) => item.key !== fieldId);
      onChange?.(updateDataSource);
      return updateDataSource;
    });
    setDataSourceUpdate({});
  }, [name, activeGiayToId]);

  const handleSetDataSourceUpdate = useCallback((record: AnyObject) => {
    setOpenModal(true);
    setDataSourceUpdate(record);
    if (isDuThao) {
      const cleaned = filterEmptyObjects([record]);
      setDataSourceUpdate(cleaned[0]);
    }
    setAction(TYPE_ACTION.EDIT);
  }, []);

  const handleAddDataSource = useCallback(async () => {
    try {
      const data = await formRef.current?.validateFields();
      if (_.isPlainObject(data)) {
        const _isCheckDuplicateDataCol = checkDuplicateDataCol(columns, dataSource, data);
        if (_get(_isCheckDuplicateDataCol, 'status')) {
          message.error(`${_get(_isCheckDuplicateDataCol, 'title')} đã tồn tại trong bảng`);
          return;
        }

        // if ((!_get(data, 'TinhId'))) {
        //   data.TinhId = null;
        //   data.TinhIdHidden = JSON.stringify({ label: '', value: 0 });
        // }
        // if ((!_get(data, 'XaId'))) {
        //   data.XaId = null;
        //   data.XaIdHidden = JSON.stringify({ label: '', value: 0 });
        // }
        const clonedData = { ...data, key: randomString(10) };
        // const payloadByReferences: any = transformDataByReference(clonedData);

        setDataSource((state) => {
          const newData = {
            ...clonedData,
            // [COLUMN_REFERENCES]: payloadByReferences,
            [FE_KEY]: generateFeKey(name || '', state.length),
            // isSelected: false,
          };

          const newDataSource: AnyObject[] = [...state, newData];
          const cloneDeepState = _.cloneDeep(state);
          onChange?.([...cloneDeepState, newData]);
          return newDataSource;
        });
      }
      formRef.current?.resetFields();
      setOpenModal(false);
    } catch (error) {
      console.error('add field error', error);
      return error;
    }
  }, [columns, dataSource]);

  const handleAddDataSourceFromOtherSource = useCallback(async () => {
    try {
      const dataIndexes = columns.map(({ dataIndex }) => dataIndex);
      const tableData = await formAddExtraSourceRef.current?.validateFields();
      if (_.isPlainObject(tableData)) {
        const rawValues = Object.values(tableData);
        const values = rawValues.filter((vls) => vls !== undefined);
        if (values?.length > 0) {
          const data = (values as any)[0].filter(({ isSelected }: any) => isSelected);
          const payload = data.map((item: any) => {
            // const payloadByReferences: any = transformDataByReference(item);
            const itemPicked = _.pick(item, dataIndexes);

            return {
              ...itemPicked,
              // [COLUMN_REFERENCES]: payloadByReferences,
              key: randomString(10),
              // isSelected: false,
            };
          });

          setDataSource((state) => {
            const newDataSource: AnyObject[] = [...state, ...payload];
            const cloneDeepState = _.cloneDeep(state);
            onChange?.([...cloneDeepState, ...payload]);
            return newDataSource;
          });
        }
      }
      formAddExtraSourceRef.current?.resetFields();
      setOpenModalExtraDataSource(false);
    } catch (error) {
      console.error('add field error', error);
      return error;
    }
  }, []);

  const handleUpdateDataSource = useCallback(async () => {
    try {
      const dataForm = await formRef.current?.validateFields();
      const _isCheckDuplicateDataCol = checkDuplicateDataCol(columns, dataSource, dataForm);
      if (_get(_isCheckDuplicateDataCol, 'status')) {
        message.error(`${_get(_isCheckDuplicateDataCol, 'title')} đã tồn tại trong bảng`);
        return;
      }

      if (_.isObject(dataForm) && _.isObject(dataSourceUpdate)) {
        const findDataSourceOldIndex = dataSource.findIndex(
          (val) => val?.key === dataSourceUpdate?.key,
        );

        if (findDataSourceOldIndex !== -1) {
          dataSource[findDataSourceOldIndex] = {
            ...dataSource[findDataSourceOldIndex],
            ...dataForm,
            key: dataSourceUpdate?.key,
          };

          const clonedDataSource = _.cloneDeep(dataSource);
          onChange?.(clonedDataSource);
          setDataSource(dataSource);
        }
      }
      formRef.current?.resetFields();
      setOpenModal(false);
    } catch (error) {
      return error;
    }
  }, [dataSourceUpdate]);

  const handleUploadFile = (file: any, index: number) => {
    setDataSource((prev) => {
      const clonedDataSource = [...prev];
      clonedDataSource[index] = {
        ...clonedDataSource[index],
        file,
      };
      onChange(clonedDataSource);
      return clonedDataSource;
    });
  };

  const columnActions = ColumnActions({
    modeView,
    handleSetDataSourceUpdate,
    handleDeleteField,
    setAction,
    setOpenModal,
    dataSource,
    getMaxRowValue,
    maxRowErrorMessage,
  });

  const renderColumns = useMemo(() => {
    let initColumns = configColumns(fieldName, columns, groupColumns, isShowOrderNumber);

    if (isShowFile(uploadColumns)) {
      initColumns.push({
        ...COLUMN_TABLE_FILE,
        render: (_value, _record, index) => (
          <FileButtonGroup
            value={_value}
            uploadColumns={uploadColumns}
            onChange={(_values) => handleUploadFile(_values, index)}
          />
        ),
      });
    }

    if (!isHiddenAction && !isDetailsMode(modeView)) {
      initColumns = initColumns.concat(columnActions);
    }

    return initColumns;
  }, [
    columns,
    groupColumns,
    uploadColumns,
    isShowOrderNumber,
    isHiddenAction,
    handleUploadFile,
    modeView,
  ]);

  const filteredDataSource = filterEmptyObjects([...dataSource]);

  // const tableRenderData = dataSource.filter((item) => !item.__isHidden);
  const handleWatchValues = useCallback((values: any) => {
    const shouldEnableSave = Object.entries(values || {}).some(([key, val]) => {
      if (key === 'Reference') return false;
      if (typeof val === 'string') return val.trim() !== '';
      if (typeof val === 'object' && val !== null) return Object.keys(val).length > 0;
      return val !== undefined && val !== null;
    });

    setIsDisabledSave(!shouldEnableSave);
  }, []);

  return (
    <div>
      <Table
        {...rest}
        tableLayout="fixed"
        columns={renderColumns}
        dataSource={isDuThao ? filteredDataSource : [...dataSource]}
        locale={{ emptyText: 'Chưa có dữ liệu!' }}
        className={clsx(className, 'digital-paper')}
        rowSelection={rowSelection}
        rowKey={(record) => record.key}
        summary={(pageData) => (
          isShowSummary && dataSource.length > 0
            ? <Summary
                pageData={pageData as any}
                columns={renderColumns}
                dataSource={dataSource as any}
            /> as any
            : undefined)}
      />
      {addDataFromExtraSource?.isShow && !isDetailsMode(modeView) ? (
        <Button
          type="primary"
          className={clsx('btn-add-column')}
          icon={<PlusOutlined style={{ color: 'white' }} />}
          onClick={() => setOpenModalExtraDataSource(true)}
        >
          {addDataFromExtraSource.text}
        </Button>
      ) : null}
      <ModalAddFieldTable
        width="60%"
        formRef={formRef as any}
        openModal={openModal}
        typeAction={action}
        titleModal={titleModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        onAddData={handleAddDataSource}
        onUpdateData={handleUpdateDataSource}
        onFormWatchChange={handleWatchValues}
        isDisabledSave={isDisabledSave}
      >
        <div className="view-actions">
          <ViewFieldContent
            dataUpdate={dataSourceUpdate}
            action={action}
            formRef={formRef}
            fieldKeyId={fieldKey}
            subSchemaForm={subForm}
            onFormWatchChange={handleWatchValues}
          />
        </div>
      </ModalAddFieldTable>
      <ModalAddFieldTable
        width="60%"
        formRef={formRef as any}
        openModal={openModalExtraDataSource}
        typeAction={action}
        titleModal={titleModal}
        onOk={() => setOpenModalExtraDataSource(false)}
        onCancel={() => setOpenModalExtraDataSource(false)}
        onAddData={handleAddDataSourceFromOtherSource}
      >
        <div className="view-actions">
          <FormViewerStandalone
            modeView={MODE_VIEW.VIEW}
            schema={subFormInExtraDataSource as any}
            ref={formAddExtraSourceRef}
          />
        </div>
      </ModalAddFieldTable>
    </div>
  );
};

export default TableViewer;
