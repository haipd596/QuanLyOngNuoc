import { PlusOutlined } from '@ant-design/icons';
import IconWrapper from '@packages/components/IconWrapper';
import { defineComponent } from '@packages/utils/common';
import { randomString } from '@packages/utils/radomString';
import {
  Button,
  Input, Select, Table, TableColumnsType,
} from 'antd';
import { ColumnGroupProps } from 'antd/es/table/ColumnGroup';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { OPTIONS_CHAT } from '../constant';
import { Translations, useLanguageForIndividual } from '../LanguageSwitcherForIndividuals';
import { convertToCO2 } from '../Table1/constant';
import { TTableProps } from '../type';
import YearPicker from '../YearPicker';
import {
  DataTypeColumnTable4, INIT_COLUMNS_TABLE4, RECENT_YEARS, YEAR_COLUMNS_4,
} from './constant';
import './styles.scss';

const Table4: React.FC<TTableProps> = ({ value: tableData, onChange }) => {
  const [
    dataSource,
    setDataSource,
  ] = useState<DataTypeColumnTable4[]>(tableData?.data || INIT_COLUMNS_TABLE4);
  const [yearColumns, setYearColumns] = useState(tableData?.years || RECENT_YEARS);
  const { translations } = useLanguageForIndividual();

  useEffect(() => {
    onChange({
      data: dataSource,
      years: yearColumns,
    });
  }, [yearColumns, dataSource]);

  const sharedOnCell = ({ isGroupTitle }: DataTypeColumnTable4) => {
    if (isGroupTitle) {
      return { colSpan: 0 };
    }

    return {};
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

  const handleRemove = (index: number) => {
    setDataSource((prev) => {
      const newDataSource = [...prev];
      newDataSource.splice(index, 1);

      return newDataSource;
    });
  };

  const handleChangeSelectLuongKg = (
    _value: number,
    rowIndex: number,
    dataIndexes: string[],
  ) => {
    const [luongKgKey, luongCo2Key] = dataIndexes;

    setDataSource((prev: any) => {
      prev[rowIndex][luongKgKey] = _value;
      prev[rowIndex][luongCo2Key] = convertToCO2(
        prev[rowIndex].name,
        prev[rowIndex][luongKgKey],
      );

      const newDataSource = [...prev];

      return newDataSource;
    });
  };

  const handleYearChange = (year: number, index: number) => {
    const updatedYears = [...yearColumns];
    updatedYears[index] = year.toString();
    setYearColumns(updatedYears);
  };

  const handleChangeCommonField = (rowIndex: number, value: string, fieldName: string) => {
    setDataSource((prev) => {
      (prev[rowIndex] as any)[fieldName] = value;

      const newDataSource = [...prev];

      return newDataSource;
    });
  };

  const handleChangeSelectChat = (value: string, index: number, dataIndexes: any) => {
    setDataSource((prev) => {
      prev[index].name = value;

      const [luongKgKey, luongCo2Key] = dataIndexes;
      (prev[index] as any)[luongCo2Key] = convertToCO2(
        (prev[index] as any).name,
        (prev[index] as any)[luongKgKey],
      );

      const newDataSource = [...prev];

      onChange({
        data: newDataSource,
        years: yearColumns,
      });

      return newDataSource;
    });
  };

  const columns: TableColumnsType<DataTypeColumnTable4> = [
    {
      title: 'TT',
      dataIndex: 'stt',
      key: 'stt',
      align: 'center',
      render: (value) => (typeof value === 'number' ? value + 1 : undefined),
    },
    ...YEAR_COLUMNS_4.reduce((acc: any, cur: any, index: number) => {
      const nameColumn = {
        title: translations['table_1.4_substance_name'],
        dataIndex: 'name',
        className: 'table4-col-ellipsis',
        render: (value: string, _record: any, _index: number) => {
          return _record.isGroupTitle ? (
            translations[value as keyof Translations]
          ) : (
            <Select
              options={OPTIONS_CHAT}
              style={{ width: '100%' }}
              value={value}
              onChange={(selectedValue: string) => {
                handleChangeSelectChat(selectedValue, _index, cur.children[0].getAllDataIndex());
              }}
              className="custom_content_center"
            />
          );
        },
        onCell: ({ isGroupTitle }: any) => ({
          colSpan: isGroupTitle ? 4 : 1,
        }),
      };

      const columnYear: ColumnGroupProps<DataTypeColumnTable4> = {
        title: (
          <div className="custom_yearpicker">
            <p className="yearpicker_label">{translations['table_1.4_year']}</p>
            <YearPicker
              year={cur.year}
              onYearChange={(newYear) => handleYearChange(newYear, index)}
            />
          </div>
        ),
        children: [
          nameColumn,
          ...cur.children.map((item: any) => ({
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
                  value: _value,
                  disabled: !_record.name,
                  onChange: (newValue: number) => {
                    handleChangeSelectLuongKg(newValue, _index, item.getAllDataIndex());
                  },
                });
              }

              return _value;
            },
            onCell: sharedOnCell,
          })),
        ],
      };

      acc.push(columnYear);
      return acc;
    }, [] as ColumnGroupProps<DataTypeColumnTable4>[]),
    {
      title: translations['table_1.4_other_info'],
      dataIndex: 'otherinfo',
      render: (value, _record, _index) => {
        return (
          <Input
            defaultValue={value}
            value={value}
            onChange={(e) => handleChangeCommonField(_index, e.target.value, 'otherinfo')}
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

        return (
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

  return (
    <Table<DataTypeColumnTable4>
      pagination={false}
      columns={columns}
      dataSource={dataSource}
      bordered
      className="custom_text_table"
    />

  );
};

export default Table4;
