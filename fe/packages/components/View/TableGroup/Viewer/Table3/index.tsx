import { PlusOutlined } from '@ant-design/icons';
import IconWrapper from '@packages/components/IconWrapper';
import { randomString } from '@packages/utils/radomString';
import {
  Button,
  Input, InputNumber, Select, Table, TableColumnsType,
} from 'antd';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { OPTIONS_CHAT } from '../constant';
import { Translations, useLanguageForIndividual } from '../LanguageSwitcherForIndividuals';
import { TTableProps } from '../type';
import YearPicker from '../YearPicker';
import { DataTypeColumnTable3, INIT_COLUMNS_TABLE3, YEAR_COLUMNS_3 } from './constant';
import './styles.scss';

const Table3: React.FC<TTableProps> = ({ value: tableData, onChange }) => {
  const [
    dataSource,
    setDataSource,
  ] = useState<DataTypeColumnTable3[]>(tableData?.data || INIT_COLUMNS_TABLE3);
  const [yearColumns, setYearColumns] = useState(tableData?.years || YEAR_COLUMNS_3);
  const { translations } = useLanguageForIndividual();

  useEffect(() => {
    onChange({
      data: dataSource,
      years: yearColumns,
    });
  }, [yearColumns, dataSource]);

  const sharedOnCell = ({ isGroupTitle }: DataTypeColumnTable3) => {
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

  const handleChangeCommonField = (rowIndex: number, value: string, fieldName: string) => {
    setDataSource((prev) => {
      (prev[rowIndex] as any)[fieldName] = value;

      const newDataSource = [...prev];

      return newDataSource;
    });
  };

  const handleYearChange = (year: number) => {
    const updateYears = [...yearColumns];
    updateYears[0] = year.toString();
    setYearColumns(updateYears);
  };

  const columns: TableColumnsType<DataTypeColumnTable3> = [
    {
      title: 'TT',
      dataIndex: 'stt',
      key: 'stt',
      align: 'center',
      render: (value) => (typeof value === 'number' ? value + 1 : undefined),
    },
    {
      title: translations['table_1.3_title_header_1'],
      children: [
        {
          title: translations['table_1.3_equipment'],
          dataIndex: 'name',
          render: (value, _record, _index) => {
            return _record.isGroupTitle ? (
              translations[value as keyof Translations]
            ) : (
              <Input
                defaultValue={value}
                value={value}
                onChange={(e) => {
                  handleChangeCommonField(_index, e.target.value, 'name');
                }}
                className="custom_content_center"
              />
            );
          },
          onCell: ({ isGroupTitle }) => ({
            colSpan: isGroupTitle ? 6 : 1,
          }),
        },
        {
          title: translations['table_1.3_year_of_use'],
          dataIndex: 'yearstart',
          render: (value, _record, _index) => {
            return (
              <Input
                defaultValue={value}
                value={value}
                onChange={(e) => {
                  handleChangeCommonField(_index, e.target.value, 'yearstart');
                }}
                className="custom_content_center"
              />
            );
          },
          onCell: sharedOnCell,
        },
        {
          title: translations['table_1.3_capacity'],
          dataIndex: 'productivity',
          render: (value, _record, _index) => {
            return (
              <Input
                defaultValue={value}
                value={value}
                onChange={(e) => {
                  handleChangeCommonField(_index, e.target.value, 'productivity');
                }}
                className="custom_content_center"
              />
            );
          },
          onCell: sharedOnCell,
        },
        {
          title: translations['table_1.3_equipment_quantity'],
          dataIndex: 'number_of_products',
          render: (value, _record, _index) => {
            return (
              <InputNumber
                defaultValue={value}
                value={value}
                onChange={(_value) => {
                  handleChangeCommonField(_index, _value, 'number_of_products');
                }}
                min={0}
                className="custom_content_center"
              />
            );
          },
          onCell: sharedOnCell,
        },
        {
          title: translations['table_1.3_substance_name'],
          dataIndex: 'substance_name',
          className: 'table3-col-ellipsis',
          render: (value, _record, _index) => {
            return (
              <Select
                options={OPTIONS_CHAT}
                style={{ width: '100%' }}
                value={value}
                onChange={(_value: string) => {
                  handleChangeCommonField(_index, _value, 'substance_name');
                }}
                className="custom_content_center"
              />
            );
          },
          onCell: sharedOnCell,
        },
      ],
    },
    {
      title: (
        <div className="custom_yearpicker">
          <p className="yearpicker_label">{translations['table_1.3_title_header_2']}</p>
          <YearPicker
            year={yearColumns}
            onYearChange={(newYear) => handleYearChange(newYear)}
          />
        </div>
      ),
      children: [
        {
          title: translations['table_1.3_refills_equipment'],
          dataIndex: 'frequency',
          render: (value, _record, _index) => {
            return _record.isGroupTitle ? (
              value
            ) : (
              <InputNumber
                defaultValue={value}
                value={value}
                onChange={(_value) => {
                  handleChangeCommonField(_index, _value, 'frequency');
                }}
                min={0}
                className="custom_content_center"
              />
            );
          },
        },
        {
          title: translations['table_1.3_amount_equipment'],
          dataIndex: 'amount_substance',
          render: (value, _record, _index) => {
            return (
              <Input
                defaultValue={value}
                value={value}
                onChange={(e) => {
                  handleChangeCommonField(_index, e.target.value, 'amount_substance');
                }}
                className="custom_content_center"
              />
            );
          },
          onCell: sharedOnCell,
        },
      ],
    },
    // {
    //   title: translations['table_1.3_other_info'],
    //   dataIndex: 'otherinfo',
    //   render: (value, _record, _index) => {
    //     return (
    //       <Input
    //         defaultValue={value}
    //         onChange={(e) => (
    //           handleChangeCommonField(_index, e.target.value, 'otherinfo')
    //         )}
    //         className="custom_content_center"
    //       />
    //     );
    //   },
    //   onCell: sharedOnCell,
    // },
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
    <Table<DataTypeColumnTable3>
      pagination={false}
      columns={columns}
      dataSource={dataSource}
      bordered
    />

  );
};

export default Table3;
