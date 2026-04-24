import { PlusOutlined } from '@ant-design/icons';
import IconWrapper from '@packages/components/IconWrapper';
import { randomString } from '@packages/utils/radomString';
import {
  Button,
  Input, InputNumber, Select, Table, TableColumnsType, TreeSelect,
} from 'antd';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { OPTIONS_CHAT } from '../constant';
import { Translations, useLanguageForIndividual } from '../LanguageSwitcherForIndividuals';
import { TTableProps } from '../type';
import YearPicker from '../YearPicker';
import {
  COLUMNS_DATA_INDEX,
  DataTypeColumnTable2,
  INIT_COLUMNS_TABLE2,
  OPTIONS_SAN_PHAM,
  YEAR_COLUMNS_2,
  findByValue,
} from './constant';
import './styles.scss';

const Table2: React.FC<TTableProps> = ({ value: tableData, onChange }) => {
  const [
    dataSource,
    setDataSource,
  ] = useState<DataTypeColumnTable2[]>(tableData?.data || INIT_COLUMNS_TABLE2);
  const [yearColumns, setYearColumns] = useState(tableData?.years || YEAR_COLUMNS_2);
  const { translations } = useLanguageForIndividual();

  useEffect(() => {
    onChange({
      data: dataSource,
      years: yearColumns,
    });
  }, [yearColumns, dataSource]);

  const sharedOnCell = ({ isGroupTitle }: DataTypeColumnTable2) => {
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

  const handleSelectSanPham = (rowIndex: number, value: string) => {
    setDataSource((prev) => {
      (prev[rowIndex] as any)[COLUMNS_DATA_INDEX.name] = value;
      const itemFound = findByValue(value);
      (prev[rowIndex] as any)[COLUMNS_DATA_INDEX.maHs] = itemFound.MA_HS;
      // TODO: recursive to find data
      prev[rowIndex].key = randomString(10);
      const newDataSource = [...prev];

      return newDataSource;
    });
  };

  const handleChangeCommonField = (rowIndex: number, value: string, fieldName: string) => {
    setDataSource((prev) => {
      (prev[rowIndex] as any)[fieldName] = value;
      const newDataSource = [...prev];

      return newDataSource;
    });
  };

  const handleYearChange = (year: number) => {
    const updatedYears = [...yearColumns];
    updatedYears[0] = year.toString();
    setYearColumns(updatedYears);
  };

  const columns: TableColumnsType<DataTypeColumnTable2> = [
    {
      title: 'TT',
      dataIndex: COLUMNS_DATA_INDEX.stt,
      key: 'stt',
      align: 'center',
      render: (value) => (typeof value === 'number' ? value + 1 : undefined),
    },
    {
      title: (
        <div className="custom_yearpicker">
          <p className="yearpicker_label">{translations['table_1.2_year']}</p>
          <YearPicker
            year={yearColumns}
            onYearChange={(newYear) => handleYearChange(newYear)}
          />
        </div>
      ),
      children: [
        {
          title: translations['table_1.2_product'],
          dataIndex: COLUMNS_DATA_INDEX.name,
          className: 'table-col-ellipsis',
          render: (value, _record, index) => {
            return _record.isGroupTitle ? (
              translations[value as keyof Translations]
            ) : (
              <TreeSelect
                showSearch
                treeData={OPTIONS_SAN_PHAM}
                style={{ width: '100%' }}
                value={value}
                onChange={(_value: string) => {
                  handleSelectSanPham(index, _value);
                }}
                allowClear
                className="custom_content_center"
              />
            );
          },
          onCell: ({ isGroupTitle }) => ({
            colSpan: isGroupTitle ? 7 : 1,
          }),
        },
        {
          title: translations['table_1.2_hs_code'],
          dataIndex: COLUMNS_DATA_INDEX.maHs,
          onCell: sharedOnCell,
        },
        {
          title: translations['table_1.2_capacity'],
          dataIndex: COLUMNS_DATA_INDEX.productivity,
          render: (value, _record, _index) => {
            return (
              <Input
                defaultValue={value}
                value={value}
                onChange={(e) => {
                  handleChangeCommonField(_index, e.target.value, COLUMNS_DATA_INDEX.productivity);
                }}
                className="custom_content_center"
              />
            );
          },
          onCell: sharedOnCell,
        },
        {
          title: translations['table_1.2_quantity_1'],
          dataIndex: COLUMNS_DATA_INDEX.import_export,
          render: (value, _record, _index) => {
            return (
              <Input
                defaultValue={value}
                value={value}
                onChange={(e) => {
                  handleChangeCommonField(_index, e.target.value, 'import_export');
                }}
                className="custom_content_center"
              />
            );
          },
          onCell: sharedOnCell,
        },
        {
          title: translations['table_1.2_substance_name'],
          // className: 'table-col-ellipsis',
          dataIndex: COLUMNS_DATA_INDEX.chat_name,
          render: (value, _record, _index) => {
            return (
              <Select
                options={OPTIONS_CHAT}
                style={{ width: '100%' }}
                value={value}
                onChange={(_value: string) => {
                  handleChangeCommonField(_index, _value, COLUMNS_DATA_INDEX.chat_name);
                }}
                className="custom_content_center"
              />
            );
          },
          onCell: sharedOnCell,
        },
        {
          title: translations['table_1.2_quantity_2'],
          dataIndex: COLUMNS_DATA_INDEX.number_of_chat,
          render: (value, _record, _index) => {
            return (
              <InputNumber
                defaultValue={value}
                value={value}
                onChange={(_value) => {
                  handleChangeCommonField(_index, _value, COLUMNS_DATA_INDEX.number_of_chat);
                }}
                min={0}
                className="custom_content_center"
              />
            );
          },
          onCell: sharedOnCell,
        },
      ],
    },
    {
      title: translations['table_1.2_notice'],
      dataIndex: COLUMNS_DATA_INDEX.note,
      render: (value, _record, _index) => {
        return (
          <Input
            defaultValue={value}
            onChange={(e) => (
              handleChangeCommonField(_index, e.target.value, COLUMNS_DATA_INDEX.note)
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
    <Table<DataTypeColumnTable2>
      pagination={false}
      columns={columns}
      dataSource={dataSource}
      bordered
    />

  );
};

export default Table2;
