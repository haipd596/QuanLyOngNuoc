import { PlusOutlined } from '@ant-design/icons';
import FActionTable from '@packages/components/CommonTable/FActionTable';
import FActionTableSingle from '@packages/components/CommonTable/FActionTableSingle';
import FColumnFile from '@packages/components/CommonTable/FColumnFile';
import { FIELD_NAME } from '@packages/constants/fields';
import { MODE_VIEW } from '@packages/constants/modeView';
import { Field } from '@packages/main/Forms';
import FieldItem from '@packages/main/Forms/FormBase/FieldItem';
import {
  COLUMN_TABLE_ACTION, COLUMN_TABLE_FILE, COLUMN_TABLE_STT, isShowFile,
} from '@packages/utils';
import { randomString } from '@packages/utils/radomString';
import { isDetailsMode } from '@packages/utils/viewMode';
import {
  Button, Flex, Form, message, Modal, Table,
} from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import clsx from 'clsx';
import _ from 'lodash';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useAppSelector } from '~/redux/hooks';
import { selectSystemParameter } from '~/redux/slices';
import { uploadToDellEcs } from '../AsyncTable/common';
import { ITableViewProps } from '../ViewTable/type.table';
import { groupTableHead } from '../ViewTable/utils';
import EditableCell from './components/Viewer/EditableCell';
import EditableRow from './components/Viewer/EditableRow';
import './styles.scss';

const ViewerFieldTableSingle: React.FC<ITableViewProps> = (props) => {
  const {
    columns,
    onChange,
    uploadColumns,
    isHiddenAction,
    isShowOrderNumber,
    groupColumns,
    addDataFromExtraSource,
    modeView,
    className,
    value,
    fieldName,
    name,
    ...rest
  } = props;
  const { config: extraSourceFieldConfig, isShow, text } = addDataFromExtraSource;

  const [dataSource, setDataSource] = useState<AnyObject[]>(value || []);
  const [tempSelectedDataSource, setTempSelectedDataSource] = useState<AnyObject[]>([]);
  const [isOpenModalFromOtherSource, setIsModalOpenFromOtherSource] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState(_.map(dataSource, 'key'));
  const systemParameters = useAppSelector(selectSystemParameter);

  const formRoot = Form.useFormInstance();

  const handleSaveDataField = useCallback((rowData: any) => {
    const { key } = rowData;
    setDataSource((prevDataSource) => {
      const newData = [...prevDataSource];
      const index = newData.findIndex(({ key: _itemKey }) => _itemKey === key);
      if (index > -1) {
        newData[index] = { ...newData[index], ...rowData };
      }
      onChange?.(newData);
      return newData;
    });
  }, [onChange]);

  const handleDeleteField = useCallback((_key: string, _index: number, key: string) => {
    setDataSource((prevDataSource) => {
      const newData = prevDataSource.filter(({ key: _fieldKey }) => _fieldKey !== key);
      onChange?.(newData);
      return newData;
    });
  }, [onChange]);

  const handleRemove = (fileId: string, index: any) => {
    setDataSource((prev) => {
      const clonedDataSource = [...prev] as any;
      if (clonedDataSource[index].isSubForm) {
        clonedDataSource[index].file.fileNodeObject = clonedDataSource[index].file
          .fileNodeObject.filter(({ NodeId }: any) => NodeId !== fileId);
      } else {
        clonedDataSource[index].file = clonedDataSource[index]
          .file.filter(({ NodeId }: any) => NodeId !== fileId);
      }
      onChange?.(clonedDataSource);
      return clonedDataSource;
    });
  };

  const handleUploadFile = useCallback((file: any, index: number) => {
    const clonedDataSource = [...dataSource];
    clonedDataSource[index] = {
      ...clonedDataSource[index],
      file,
    };
    setDataSource(clonedDataSource);
    onChange?.(clonedDataSource);
  }, [onChange]);

  const initialDataSource = useMemo(() => {
    if (_.isArray(columns)) {
      const initialData: AnyObject = {};

      columns.forEach((column: any) => {
        const fieldKeyName = _.get(column, 'columnDataType.props.defaultValue');
        // const targetTitle = _.get(column, 'title');
        initialData[column.dataIndex] = fieldKeyName === FIELD_NAME.INPUT ? '' : 10;
      });
      initialData.key = randomString(10);

      return initialData;
    }

    return {};
  }, [columns]);

  const handleAddRow = useCallback(() => {
    if (_.isObject(initialDataSource)) {
      setDataSource((prevDataSource) => {
        const newData = [...prevDataSource, { ...initialDataSource, key: randomString(10) }];
        onChange?.(newData);
        return newData;
      });
    }
  }, [initialDataSource]);

  const renderColumns = useMemo(() => {
    if ((!_.isArray(columns))) return [];
    let _columns = columns.map((col: any) => {
      const fieldKeyName = _.get(col, 'columnDataType.props.defaultValue');
      const {
        dataIndex, title, message, required,
      } = col;

      return {
        ...col,
        onCell: (record: any) => ({
          record,
          dataIndex,
          title,
          editable: !isDetailsMode(modeView),
          fieldKeyName,
          rules: [{ message, required }],
          handleSaveDataField,
          listDataSource: dataSource,
        }),
      };
    });
    _columns = groupTableHead(_columns, groupColumns);

    if (isShowFile(uploadColumns)) {
      _columns.push({
        ...COLUMN_TABLE_FILE,
        render: (_value: any, _record: any, _index: any) => (
          <FColumnFile
            modeView={modeView}
            fieldName={fieldName}
            record={_record}
            index={_index}
            onDeleteFile={(fileId, index) => handleRemove(fileId, index)}
          />
        ),
      });
    }

    if (!isHiddenAction) {
      _columns = _columns.concat({
        ...COLUMN_TABLE_ACTION,
        title: <FActionTable modeView={modeView} onAdd={handleAddRow} />,
        render: (_value: any, _record: any, index: any) => (
          <FActionTableSingle
            modeView={modeView}
            record={_record}
            value={_value}
            index={index}
            uploadColumns={uploadColumns}
            onUploadFile={handleUploadFile}
            onDeleteFile={handleDeleteField}
            targetFieldKey={name}
          />
        ),
      });
    }

    if (isShowOrderNumber) _columns = COLUMN_TABLE_STT.concat(_columns);

    return _columns;
  }, [
    columns,
    uploadColumns,
    handleUploadFile,
    isHiddenAction,
    handleDeleteField,
    isShowOrderNumber,
    groupColumns,
    dataSource,
  ]);

  const handleOpenExtraSource = useCallback(async () => {
    setIsModalOpenFromOtherSource(true);
  }, []);

  const handleAddRowFormExtraSource = async () => {
    setDataSource((prev) => _.uniqBy(prev.concat(tempSelectedDataSource), 'key'));
    setTempSelectedDataSource([]);
    setIsModalOpenFromOtherSource(false);
  };

  const handleChangeSelectedRows = useCallback((...args: any) => {
    const [_selectedRowKeys, selectedDataSource] = args;
    setSelectedRowKeys(_selectedRowKeys);
    setTempSelectedDataSource(selectedDataSource);
  }, []);

  const schema = useMemo(() => (
    {
      ...extraSourceFieldConfig,
      componentPropsReadOnly: {
        rowSelection: {
          selectedRowKeys,
          onChange: handleChangeSelectedRows,
          hideSelectAll: true,
        },
      },
    } as Field
  ), [selectedRowKeys, handleChangeSelectedRows]);

  useEffect(() => {
  const globalAny = window as any;

  // Khởi tạo map callback nếu chưa có
  if (!globalAny._callbackSignUsbTokenMap) {
    globalAny._callbackSignUsbTokenMap = {};
  }

  // Giữ key định danh cho component hiện tại
  const keyOfComponent = name; // Ví dụ: "ThanhPhanHoSoKhac"

  // Gán callback toàn cục (chỉ gán 1 lần duy nhất)
    globalAny.callbackSignUsbTokenOther = async (
      signedFile: any,
      signedIndex: number,
      targetFieldKey: string
    ) => {
      try {
        // ✅ Nếu không phải callback dành cho component này → bỏ qua
        if (targetFieldKey !== keyOfComponent) {
          console.info(
            `[callbackSignUsbToken] ViewerFieldTableSingle bỏ qua vì targetFieldKey=${targetFieldKey} !== ${keyOfComponent}`
          );
          return;
        }

        // Upload file ký lên ECS
        const metadata = await uploadToDellEcs(signedFile, systemParameters);

        // Cập nhật lại file trong bảng
        setDataSource((prev: any[]) => {
          const newData = [...prev];
          if (newData[signedIndex]) {
              // Trường hợp thường → dạng mảng đơn giản
              newData[signedIndex].file = [metadata];
          }
          formRoot.setFieldValue(name, newData);
          return newData;
        });

        message.success(`${metadata.FileName} đã được cập nhật sau khi ký!`);
      } catch (error: any) {
        console.error('Upload file ký thất bại:', error);
        message.error('Upload file ký thất bại!');
      }
    };

  // Cleanup khi component unmount
  return () => {
    // ❗ Không xóa callbackSignUsbToken nếu còn component khác dùng
    delete globalAny.callbackSignUsbTokenOther;
    // ❗ Không xóa map dùng chung
    // delete globalAny._callbackSignUsbTokenMap;
  };
}, [setDataSource, name]);


  return (
    <div>
      <Table
        {...rest}
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
        rowClassName={() => 'editable-row'}
        dataSource={[...dataSource]}
        columns={renderColumns}
        className={clsx(className, 'digital-paper')}
        bordered
        locale={{ emptyText: 'Chưa có dữ liệu!' }}
      />
      <Flex justify="flex-end" gap={4} style={{ marginTop: 16 }}>
        {isShow && (
          <>
            <Button
              icon={<PlusOutlined />}
              type="primary"
              style={{ marginBottom: 10 }}
              onClick={handleOpenExtraSource}
            >
              {text}
            </Button>
            <Modal
              open={isOpenModalFromOtherSource}
              // onClose={() => setIsModalOpenFromOtherSource(false)}
              onCancel={() => setIsModalOpenFromOtherSource(false)}
              onOk={handleAddRowFormExtraSource}
            >
              <FieldItem field={schema} fieldIndex={0} modeView={MODE_VIEW.VIEW} />
            </Modal>
          </>
        )}
      </Flex>
    </div>
  );
};

export default ViewerFieldTableSingle;
