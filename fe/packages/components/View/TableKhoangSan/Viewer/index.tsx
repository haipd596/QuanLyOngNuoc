import { PlusOutlined } from '@ant-design/icons';
import IconWrapper from '@packages/components/IconWrapper';
import { randomString } from '@packages/utils/radomString';
import {
  Button,
  Input, InputNumber, Table, TableColumnsType,
} from 'antd';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { toFixThree } from '../../TableGroup/Viewer/Table1/constant';
import { TTableProps } from '../../TableGroup/Viewer/type';
import { DataTypeColumnTableKhoangSan, INIT_COLUMNS_TABLE_KHOANG_SAN } from './constant';
import './styles.scss';
import TransformTableDataKhoangSan from './TransformTableDataKhoangSan';

const TableKhoangSanViewer: React.FC<TTableProps> = ({ value: tableData, onChange }) => {
  const [
    dataSource,
    setDataSource,
  ] = useState<DataTypeColumnTableKhoangSan[]>(tableData?.data || INIT_COLUMNS_TABLE_KHOANG_SAN);

  const sharedOnCell = ({ isGroupTitle }: DataTypeColumnTableKhoangSan) => {
    if (isGroupTitle) {
      return { colSpan: 0 };
    }

    return {};
  };

  const calculateSumForEachRow = (
    _dataSource: DataTypeColumnTableKhoangSan[],
    record: DataTypeColumnTableKhoangSan,
    reserves: string,
  ) => {
    const rowTongIndex = _dataSource.findIndex(
      (data) => data.refKey === record.refKey && data.isSumRow,
    );

    if (rowTongIndex > -1) {
      const columnInGroup = _dataSource.filter(
        (data) => data.refKey === record.refKey && !data.isSumRow && !data.isGroupTitle,
      );

      const sum = (columnInGroup as any[]).reduce((acc, cur) => {
        const value = parseFloat(cur[reserves]) || 0;

        return acc + value;
      }, 0);

      _dataSource[rowTongIndex] = {
        ..._dataSource[rowTongIndex],
        [reserves]: toFixThree(sum),
      };
    }

    return [..._dataSource];
  };

  const calculateAllRowHasTotaled = (_dataSource: DataTypeColumnTableKhoangSan[]) => {
    const findRow121 = _dataSource.find((row) => row.refKey === 'group_0' && row.isSumRow);
    const findRow122 = _dataSource.find((row) => row.refKey === 'group_1' && row.isSumRow);

    const totalRow121 = parseFloat(findRow121?.reserves || 0);
    const totalRow122 = parseFloat(findRow122?.reserves || 0);

    return toFixThree(totalRow121 + totalRow122);
  };

  const handleAdd = (index: number, refKey: string) => {
    setDataSource((prev) => {
      const newDataSource = [...prev];
      newDataSource.splice(index + 1, 0, {
        key: randomString(10),
        name: '',
        refKey,
      });

      const totalRowIndex = newDataSource.findIndex((row) => row.refKey === 'group_2' && row.isSumRow);
      if (totalRowIndex > -1) {
        newDataSource[totalRowIndex] = {
          ...newDataSource[totalRowIndex],
          reserves: calculateAllRowHasTotaled(newDataSource),
        };
      }

      return newDataSource;
    });
  };

  const handleRemove = (index: number) => {
    setDataSource((prev) => {
      const newDataSource = [...prev];
      const removedRow = newDataSource[index];

      newDataSource.splice(index, 1);

      if (removedRow && removedRow?.refKey) {
        calculateSumForEachRow(newDataSource, removedRow, 'reserves');
      }

      const totalRowIndex = newDataSource.findIndex((row) => row.refKey === 'group_2' && row.isSumRow);
      if (totalRowIndex > -1) {
        newDataSource[totalRowIndex] = {
          ...newDataSource[totalRowIndex],
          reserves: calculateAllRowHasTotaled(newDataSource),
        };
      }

      return newDataSource;
    });
  };

  const handleChangeCommonField = (rowIndex: number, value: string | number, fieldName: string) => {
    setDataSource((prev) => {
      const newDataSource = [...prev];

      newDataSource[rowIndex] = {
        ...newDataSource[rowIndex],
        [fieldName]: value,
      };

      if (fieldName === 'reserves') {
        calculateSumForEachRow(newDataSource, newDataSource[rowIndex], 'reserves');
      }

      const totalRowIndex = newDataSource.findIndex((row) => row.refKey === 'group_2' && row.isSumRow);
      if (totalRowIndex > -1) {
        newDataSource[totalRowIndex] = {
          ...newDataSource[totalRowIndex],
          reserves: calculateAllRowHasTotaled(newDataSource),
        };
      }

      return newDataSource;
    });
  };

  const columns: TableColumnsType<DataTypeColumnTableKhoangSan> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      align: 'center',
      render: (value) => (typeof value === 'number' ? value + 1 : undefined),
    },
    {
      title: 'Khối trữ lượng',
      dataIndex: 'name',
      render: (value, _record, _index) => {
        return _record.isGroupTitle || _record.isSumRow ? (
          value
        ) : (
          <Input
            defaultValue={value}
            onChange={(e) => (
              handleChangeCommonField(_index, e.target.value, 'name')
            )}
            className="custom_content_center"
          />
        );
      },
      onCell: (_record) => {
        if (_record.isGroupTitle) {
          return { colSpan: 4 };
        }
        return { colSpan: 1 };
      },
    },
    {
      title: 'Mức sâu thấp nhất khối trữ lượng (m)',
      dataIndex: 'lowestDepth',
      render: (value, _record, _index) => {
        return _record.isGroupTitle || _record.isSumRow ? (
          value
        ) : (
          <InputNumber
            defaultValue={value}
            value={value}
            onChange={(_value) => (
              handleChangeCommonField(_index, _value, 'lowestDepth')
            )}
            min={0}
            className="custom_content_center"
          />
        );
      },
      onCell: sharedOnCell,
    },
    {
      title: 'Trữ lượng (tấn/m3)',
      dataIndex: 'reserves',
      className: 'custom_content_center',
      render: (value, _record, _index) => {
        if (_record.isGroupTitle || _record.isSumRow) {
          return value;
        }
        return (
          <InputNumber
            defaultValue={value}
            value={value}
            onChange={(_value) => (
              handleChangeCommonField(_index, _value, 'reserves')
            )}
            min={0}
            className="custom_content_center"
          />
        );
      },
      onCell: sharedOnCell,
    },
    {
      title: 'Ghi chú (nếu có)',
      dataIndex: 'otherinfo',
      render: (value, _record, _index) => {
        return _record.isGroupTitle || _record.isSumRow ? (
          value
        ) : (
          <Input
            defaultValue={value}
            onChange={(e) => (
              handleChangeCommonField(_index, e.target.value, 'otherinfo')
            )}
            className="custom_content_center"
          />
        );
      },
      onCell: sharedOnCell,
    },
    {
      title: '',
      key: 'action',
      render: (_value, _record, index) => {
        if (_record.isGroupTitle) {
          return (
            <div className="plus_action" onClick={() => handleAdd(index, _record.refKey)}><PlusOutlined /></div>
          );
        }

        const isInvalidValue = _record.name === '';

        return !_record.isSumRow && (
          <div className="delete_action" style={{ display: isInvalidValue ? 'none' : 'flex' }}>
            <Button
              icon={(
                <IconWrapper
                  icon={<i className={clsx('fa-solid fa-trash fa-lg', 'icon_global_dvc')} />}
                />
        )}
              onClick={() => handleRemove(index)}
            />
          </div>
        );
      },
      onCell: () => {
        return { colSpan: 1 };
      },
    },
  ];

  useEffect(() => {
    onChange({
      data: dataSource,
    });
  }, [dataSource]);

  return (
    <Table<DataTypeColumnTableKhoangSan>
      pagination={false}
      columns={columns}
      dataSource={dataSource}
      bordered
    />

  );
};

export default ({ name, languages, ...props }: any) => (
  <TransformTableDataKhoangSan {...props} id={name}>
    <TableKhoangSanViewer {...props} />
  </TransformTableDataKhoangSan>
);
