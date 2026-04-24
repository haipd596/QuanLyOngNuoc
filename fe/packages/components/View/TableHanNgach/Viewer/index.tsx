import { PlusOutlined } from '@ant-design/icons';
import IconWrapper from '@packages/components/IconWrapper';
import { defineComponent } from '@packages/utils/common';
import { randomString } from '@packages/utils/radomString';
import {
  Button,
  Input,
  Select,
  Table,
  TableColumnsType,
} from 'antd';
import clsx from 'clsx';
import _ from 'lodash';
import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { OPTIONS_CHAT } from '../../TableGroup/Viewer/constant';
import { LanguageProviderForIndividual, useLanguageForIndividual } from '../../TableGroup/Viewer/LanguageSwitcherForIndividuals';
import { convertToCO2, toFixThree } from '../../TableGroup/Viewer/Table1/constant';
import YearPicker from '../../TableGroup/Viewer/YearPicker';
import {
  CHILD_COLUMNS_ADJUSTMENT,
  CHILD_COLUMNS_IN_YEAR,
  DataTypeColumnTableHanNgach, getAllDataIndexes, INIT_COLUMNS_TABLE_HAN_NGACH,
  YEAR_COLUMNS,
} from './constant';
import en from './locales/en/table-en.json';
import vi from './locales/vi/table-vi.json';
import './styles.scss';
import TransformTableDataHanNgach from './TransformTableDataHanNgach';

export interface TableHanNgachProps {
  value: any;
  onChange: any;
  languages?: string;
}

const TableHanNgachViewer:React.FC<TableHanNgachProps> = ({
  value: tableData,
  onChange,
}) => {
  const [
    dataSource,
    setDataSource,
  ] = useState<DataTypeColumnTableHanNgach[]>(tableData?.data || INIT_COLUMNS_TABLE_HAN_NGACH);
  const [yearColumns, setYearColumns] = useState(tableData?.years || YEAR_COLUMNS);

  const { translations } = useLanguageForIndividual();

  useEffect(() => {
    onChange({
      data: dataSource,
      years: yearColumns,
    });
  }, [yearColumns, dataSource]);

  const sharedOnCell = ({ isGroupTitle }: DataTypeColumnTableHanNgach) => {
    if (isGroupTitle) {
      return { colSpan: 0 };
    }

    return {};
  };

  const calcAdjustment = (
    prev: any,
    index: number,
    luongCo2AdjustmentKey: string,
    luongCo2YearKey: string,
  ) => {
    const test = toFixThree(
      ((prev[index] as any)[luongCo2AdjustmentKey]) - (prev[index] as any)[luongCo2YearKey],
    );
    let prefix = '';
    if (test > 0) prefix = '+';
    if (test < 0) prefix = '-';

    return `${prefix}${Math.abs(test)}`;
  };

  const calcTong = (
    _dataSource: DataTypeColumnTableHanNgach[],
    record: any,
    tongHanNgachKey: string,
    luongCo2Key: string,
  ) => {
    const rowTongIndex = _dataSource
      .findIndex((data) => data.refKey === record.refKey && data.isSumRow);

    if (rowTongIndex > -1) {
      const columnInGroup = _dataSource
        .filter((data: any) => data.refKey === record.refKey && !data.isSumRow);

      (_dataSource[rowTongIndex] as any)[tongHanNgachKey] = toFixThree(columnInGroup
        .reduce((_acc: any, _cur: any) => {
          _acc += _cur[luongCo2Key] || 0;
          return _acc;
        }, 0));
    }

    return _dataSource;
  };

  const getDataIndex = useCallback((hanNgachType: string) => {
    const allIndexes = hanNgachType === 'year' ? CHILD_COLUMNS_IN_YEAR : CHILD_COLUMNS_ADJUSTMENT;

    return allIndexes.map(({ dataIndex }) => dataIndex);
  }, []);

  const handleChangeSelectChat = (value: string, index: number, record: any) => {
    setDataSource((prev) => {
      prev[index].name = value;

      const allDataIndexYear = getDataIndex('year');
      const allDataIndexAdjustment = getDataIndex('adjustment');

      const [luongYearKgKey, luongCo2YearKey, tongHanNgachYearKey] = allDataIndexYear;
      (prev[index] as any)[luongCo2YearKey] = convertToCO2(
        (prev[index] as any).name,
        (prev[index] as any)[luongYearKgKey],
      );
      prev = calcTong(prev, record, tongHanNgachYearKey, luongCo2YearKey);

      const [
        luongAdjustmentKgKey,
        luongCo2AdjustmentKey,
        tongHanNgachAdjustmentKey,
      ] = allDataIndexAdjustment;
      (prev[index] as any)[luongCo2AdjustmentKey] = convertToCO2(
        (prev[index] as any).name,
        (prev[index] as any)[luongAdjustmentKgKey],
      );
      prev = calcTong(prev, record, tongHanNgachAdjustmentKey, luongCo2AdjustmentKey);

      prev[index].adjustment = calcAdjustment(prev, index, luongCo2AdjustmentKey, luongCo2YearKey);

      prev[index].key = randomString(10);

      const newDataSource = [...prev];

      return newDataSource;
    });
  };

  const handleChangeSelectLuongKg = (
    _value: number,
    rowIndex: number,
    dataIndexes: string[],
    record: DataTypeColumnTableHanNgach,
    // isInYear: boolean,
  ) => {
    const [luongKgKey, luongCo2Key, tongHanNgachKey] = dataIndexes;

    setDataSource((prev: any) => {
      let newDataSource = _.cloneDeep(prev);

      newDataSource[rowIndex][luongKgKey] = _value;
      newDataSource[rowIndex][luongCo2Key] = convertToCO2(
        newDataSource[rowIndex].name,
        newDataSource[rowIndex][luongKgKey],
      );

      newDataSource = calcTong(newDataSource, record, tongHanNgachKey, luongCo2Key);

      const [,{ dataIndex: luongCo2KeyYear }] = CHILD_COLUMNS_IN_YEAR;
      const [,{ dataIndex: luongCo2KeyAdjustment }] = CHILD_COLUMNS_ADJUSTMENT;

      newDataSource[rowIndex].adjustment = calcAdjustment(
        newDataSource,
        rowIndex,
        luongCo2KeyAdjustment,
        luongCo2KeyYear,
      );

      // newDataSource[rowIndex].key = randomString(10);

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
      prev = _.cloneDeep(prev);
      prev.splice(index, 1);

      const allDataIndexYear = getDataIndex('year');
      const allDataIndexAdjustment = getDataIndex('adjustment');

      const [luongYearKgKey, luongCo2YearKey, tongHanNgachYearKey] = allDataIndexYear;
      (prev[index] as any)[luongCo2YearKey] = convertToCO2(
        (prev[index] as any).name,
        (prev[index] as any)[luongYearKgKey],
      );
      prev = calcTong(prev, record, tongHanNgachYearKey, luongCo2YearKey);

      const [
        luongAdjustmentKgKey,
        luongCo2AdjustmentKey,
        tongHanNgachAdjustmentKey,
      ] = allDataIndexAdjustment;
      (prev[index] as any)[luongCo2AdjustmentKey] = convertToCO2(
        (prev[index] as any).name,
        (prev[index] as any)[luongAdjustmentKgKey],
      );
      prev = calcTong(prev, record, tongHanNgachAdjustmentKey, luongCo2AdjustmentKey);

      return prev;
    });
  };

  const handleYearChange = (year: number) => {
    const updatedYears = [...yearColumns];
    updatedYears[0] = year.toString();
    setYearColumns(updatedYears);
  };

  const columns: TableColumnsType<DataTypeColumnTableHanNgach> = [
    {
      title: 'TT',
      dataIndex: 'stt',
      key: 'stt',
      align: 'center',
      render: (value) => (typeof value === 'number' ? value + 1 : undefined),
    },
    {
      title: translations.table_529_substance_name,
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
        colSpan: isGroupTitle ? 7 : 1,
      }),
    },
    {
      title: (
        <div className="custom_yearpicker">
          <p className="yearpicker_label">{translations.table_529_header_content_1}</p>
          <YearPicker
            year={yearColumns}
            onYearChange={(newYear) => handleYearChange(newYear)}
          />
        </div>
      ),
      children: CHILD_COLUMNS_IN_YEAR.map((item) => ({
        ...item,
        title: translations[item.title],
        align: 'center',
        render: (_value: any, _record: any, _index: number) => {
          if (_record.isSumRow) {
            return _value;
          }

          if (item.component) {
            return defineComponent(item.component, {
              value: _value,
              defaultValue: _value,
              disabled: !_record.name,
              onChange: (newValue: number) => {
                handleChangeSelectLuongKg(
                  newValue,
                  _index,
                  getAllDataIndexes(CHILD_COLUMNS_IN_YEAR),
                  _record,
                );
              },
            });
          }

          return _value;
        },
        onCell: sharedOnCell,
      })),
    },
    {
      title: translations.table_529_header_content_2,
      children: CHILD_COLUMNS_ADJUSTMENT.map((item) => ({
        ...item,
        align: 'center',
        title: translations[item.title],
        render: (_value: any, _record: any, _index: number) => {
          if (_record.isSumRow) {
            return _value;
          }

          if (item.component) {
            return defineComponent(item.component, {
              value: _value,
              defaultValue: _value,
              disabled: !_record.name,
              onChange: (newValue: number) => {
                handleChangeSelectLuongKg(
                  newValue,
                  _index,
                  getAllDataIndexes(CHILD_COLUMNS_ADJUSTMENT),
                  _record,
                );
              },
            });
          }

          return _value;
        },
        onCell: sharedOnCell,
      })),
    },
    {
      title: translations.table_529_DeIncrease,
      dataIndex: 'adjustment',
      key: 'adjustment',
      align: 'center',
      onCell: sharedOnCell,
    },
    {
      title: translations.table_529_reason,
      dataIndex: 'dieuChinhBoSung',
      key: 'dieuChinhBoSung',
      align: 'center',
      render: (value, _record, _index) => {
        if (_record.isSumRow) return undefined;

        return (
          <Input
            defaultValue={value}
            value={value}
            onChange={(e) => {
              setDataSource((prev: any) => {
                prev[_index].dieuChinhBoSung = e.target.value;
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
      align: 'center',
      render: (_value, _record, index) => {
        if (_record.isGroupTitle) {
          return (
            <div className="plus_action" onClick={() => handleAdd(index, _record.refKey)}><PlusOutlined /></div>
          );
        }

        const isInvalidValue = _record.name === '';

        if (!_record.isSumRow) {
          return (
            <div className="delete_action" style={{ display: isInvalidValue ? 'none' : 'block' }}>
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
        }
      },
      onCell: () => {
        return { colSpan: 1 };
      },
    },
  ];

  return (
    <Table<DataTypeColumnTableHanNgach>
      pagination={false}
      columns={columns}
      dataSource={dataSource}
      bordered
      className="custom_text_table"
    />
  );
};

export default ({ name, languages, ...props }: any) => (
  <LanguageProviderForIndividual lng={languages} translationsVi={vi} translationsEn={en}>
    <TransformTableDataHanNgach {...props} id={name}>
      <TableHanNgachViewer {...props} />
    </TransformTableDataHanNgach>
  </LanguageProviderForIndividual>
);
