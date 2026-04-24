import { PlusOutlined } from '@ant-design/icons';
import IconWrapper from '@packages/components/IconWrapper';
import { defineComponent } from '@packages/utils/common';
import { randomString } from '@packages/utils/radomString';
import type { TableColumnsType } from 'antd';
import {
  Button, Input, Select, Table,
} from 'antd';
import { ColumnGroupProps } from 'antd/lib/table/ColumnGroup';
import clsx from 'clsx';
import _ from 'lodash';
import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  CHILD_COLUMNS,
  OPTIONS_CHAT,
  YEAR_COLUMNS,
} from '../constant';
import { Translations, useLanguageForIndividual } from '../LanguageSwitcherForIndividuals';
import { TTableProps } from '../type';
import YearPicker from '../YearPicker';
import {
  convertToCO2,
  DataTypeColumnTable1,
  getColumnTbDataIndex,
  INIT_COLUMNS_TABLE1,
  TB_POSTFIX_COLUMN,
  toFixThree,
} from './constant';
import './styles.scss';

const Table1: React.FC<TTableProps> = ({
  value: tableData, onChange,
}) => {
  const [
    dataSource,
    setDataSource,
  ] = useState<DataTypeColumnTable1[]>(tableData?.data || INIT_COLUMNS_TABLE1);
  const [yearColumns, setYearColumns] = useState(
    tableData?.years || YEAR_COLUMNS.map((column) => column.year),
  );

  const { translations } = useLanguageForIndividual();

  useEffect(() => {
    onChange({
      data: dataSource,
      years: yearColumns,
    });
  }, [yearColumns, dataSource]);

  const sharedOnCell = ({ isGroupTitle }: DataTypeColumnTable1) => {
    if (isGroupTitle) {
      return { colSpan: 0 };
    }

    return {};
  };

  const calcTongTb = (_dataSource: DataTypeColumnTable1[]) => {
    for (let i = 0; i < _dataSource.length; i += 1) {
      CHILD_COLUMNS.forEach(({ baseDataIndex }) => {
        let sumTb = 0;
        let count = 0;
        Object.keys(_dataSource[i])
          .forEach((key) => {
            if (key.includes(baseDataIndex) && !key.includes(TB_POSTFIX_COLUMN)) {
              sumTb += (_dataSource[i][key as keyof DataTypeColumnTable1]) as number || 0;
              count += 1;
            }
          });

        if (count > 0) {
          (_dataSource[i] as any)[getColumnTbDataIndex(baseDataIndex)] = toFixThree(sumTb / count);
        }
      });
    }

    return _dataSource;
  };

  const calcTong = (
    _dataSource: DataTypeColumnTable1[],
    record: any,
    luongKgKey: string,
    luongCo2Key: string,
  ) => {
    const rowTongIndex = _dataSource
      .findIndex((data) => data.refKey === record.refKey && data.isSumRow);

    if (rowTongIndex > -1) {
      const columnInGroup = _dataSource
        .filter((data: any) => data.refKey === record.refKey && !data.isSumRow);

      (_dataSource[rowTongIndex] as any)[luongKgKey] = toFixThree(columnInGroup
        .reduce((_acc: any, _cur: any) => {
          _acc += _cur[luongKgKey] || 0;
          return _acc;
        }, 0));

      (_dataSource[rowTongIndex] as any)[luongCo2Key] = toFixThree(columnInGroup
        .reduce((_acc: any, _cur: any) => {
          _acc += _cur[luongCo2Key] || 0;
          return _acc;
        }, 0));
    }

    return _dataSource;
  };

  const allDataIndex = useMemo(() => {
    const getAllDataIndexs: string[][] = [];

    YEAR_COLUMNS
      .forEach(({ children }) => {
        const dataIndexs = children.map(({ dataIndex }) => dataIndex);
        getAllDataIndexs.push(dataIndexs);
      });

    return getAllDataIndexs;
  }, []);

  const handleChangeSelectChat = (value: string, index: number, record: any) => {
    setDataSource((prev) => {
      prev[index].name = value;

      allDataIndex.forEach((item) => {
        const [luongKgKey, luongCo2Key] = item;

        if (typeof (prev[index] as any)[luongKgKey] === 'undefined') {
          (prev[index] as any)[luongKgKey] = 0;
        }

        (prev[index] as any)[luongCo2Key] = convertToCO2(
          (prev[index] as any).name,
          (prev[index] as any)[luongKgKey],
        );

        prev = calcTong(
          prev,
          record,
          luongKgKey,
          luongCo2Key,
        );
      });

      prev = calcTongTb(prev);

      const newDataSource = [...prev];

      return newDataSource;
    });
  };

  const handleChangeSelectLuongKg = (
    _value: number,
    rowIndex: number,
    dataIndexes: string[],
    record: any,
  ) => {
    const [luongKgKey, luongCo2Key] = dataIndexes;

    setDataSource((prev: any) => {
      prev[rowIndex][luongKgKey] = _value;
      prev[rowIndex][luongCo2Key] = convertToCO2(
        prev[rowIndex].name,
        prev[rowIndex][luongKgKey],
      );

      prev = calcTong(
        prev,
        record,
        luongKgKey,
        luongCo2Key,
      );

      prev = calcTongTb(prev);

      const newDataSource = [...prev];

      return newDataSource;
    });
  };

  const handleAdd = (index: number, refKey: string) => {
    setDataSource((prev) => {
      prev.splice(index + 1, 0, {
        key: randomString(10),
        name: '',
        refKey,
      });

      const newDataSource = [...prev];

      return newDataSource;
    });
  };

  const handleRemove = (index: number, record: any) => {
    setDataSource((prev) => {
      let newDataSource = _.cloneDeep(prev);
      newDataSource.splice(index, 1);

      allDataIndex.forEach((item) => {
        const [luongKgKey, luongCo2Key] = item;

        newDataSource = calcTong(
          newDataSource,
          record,
          luongKgKey,
          luongCo2Key,
        );
      });

      newDataSource = calcTongTb(newDataSource);

      return newDataSource;
    });
  };

  const handleYearChange = (year: number, index: number) => {
    const updatedYears = [...yearColumns];
    updatedYears[index] = year.toString();
    setYearColumns(updatedYears);
  };

  const columns: TableColumnsType<DataTypeColumnTable1> = [
    {
      title: 'TT',
      dataIndex: 'stt',
      key: 'stt',
      align: 'center',
      render: (value) => (typeof value === 'number' ? value + 1 : undefined),
    },
    {
      title: translations['table_1.1_substance_name'],
      dataIndex: 'name',
      key: 'name',
      className: 'name-chat',
      render: (value, _record, index) => {
        return _record.isGroupTitle || _record.isSumRow ? (
          translations[value]
        ) : (
          <Select
            options={OPTIONS_CHAT}
            style={{ width: '100%' }}
            value={value}
            onChange={(_value: string) => {
              handleChangeSelectChat(_value, index, _record);
            }}
            className="custom_content_center"
          />
        );
      },
      onCell: ({ isGroupTitle }) => ({
        colSpan: isGroupTitle ? (_.flatten(allDataIndex).length + 1 + 3) : 1,
      }),
    },
    ...YEAR_COLUMNS.reduce((acc: any, cur: any, index: number) => {
      const columnYear: ColumnGroupProps<DataTypeColumnTable1> = {
        title: (
          <div className="custom_yearpicker">
            <p className="yearpicker_label">{translations['table_1.1_year']}</p>
            <YearPicker
              year={cur.year}
              onYearChange={(newYear) => handleYearChange(newYear, index)}
            />
          </div>
        ),
        children: cur.children.map((item: any) => ({
          ...item,
          title: translations[item.title as keyof Translations],
          align: 'center',
          render: (_value: any, _record: any, _index: number) => {
            if (_record.isSumRow) {
              return _value;
            }

            if (item.component) {
              return defineComponent(item.component, {
                defaultValue: _value,
                disabled: !_record.name,
                value: _value,
                onChange: (newValue: number) => {
                  handleChangeSelectLuongKg(newValue, _index, item.getAllDataIndex(), _record);
                },
              });
            }

            return _value;
          },
          onCell: sharedOnCell,
        })),
      };

      acc.push(columnYear);
      return acc;
    }, [] as ColumnGroupProps<DataTypeColumnTable1>[]),
    {
      title: translations['table_1.1_average_year'],
      children: (
        CHILD_COLUMNS.map((columChild) => ({
          ...columChild,
          dataIndex: getColumnTbDataIndex(columChild.baseDataIndex),
        })).map((item) => ({
          ...item,
          title: translations[item.title as keyof Translations],
          align: 'center',
          key: randomString(10),
          onCell: sharedOnCell,
        }))
      ),
    },
    {
      title: translations['table_1.1_other_info'],
      dataIndex: 'thongtinkhac',
      key: 'thongtinkhac',
      align: 'center',
      render: (value, _record, _index) => {
        return (
          <Input
            defaultValue={value}
            value={value}
            onChange={(e) => {
              setDataSource((prev) => {
                prev[_index].thongtinkhac = e.target.value;
                return [...prev];
              });
            }}
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
              onClick={() => handleRemove(index, _record)}
            />
          </div>
        );
      },
      onCell: () => {
        return { colSpan: 1 };
      },
    },
  ];

  return (
    <Table<DataTypeColumnTable1>
      pagination={false}
      columns={columns}
      dataSource={dataSource}
      bordered
      className="custom_text_table"
    />
  );
};

export default Table1;
