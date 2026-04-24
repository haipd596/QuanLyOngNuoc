import { DATE_FORMAT } from '@packages/constants/date';
import {
  Checkbox, DatePicker, Input, InputNumber, Table,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ColumnsType } from 'antd/lib/table';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import {
  COLUMNS_DATA_INDEX_13C,
  DataTypeTable13C, sharedOnCell, TABLE_DATA_DAT_DAI_13C,
} from './constant';
import TransformTable13C from './TransformTableData13C';

export interface Table13CProps {
  value: any;
  onChange: any;
}

const TableDatDai13CViewer:React.FC<Table13CProps> = ({
  value: tableData,
  onChange,
  ...rest
}) => {
  const [
    dataSource,
    setDataSource,
  ] = useState<DataTypeTable13C[]>(tableData?.data || TABLE_DATA_DAT_DAI_13C);

  useEffect(() => {
    onChange({
      data: dataSource,
    });
  }, [dataSource]);

  // const normalizeDataSource = (data: DataTypeTable13C[]) => {
  //   return data.map((item: any) => ({
  //     ...item,
  //     cungCap: item.cungCap ?? false,
  //     caNuoc: item.caNuoc ?? false,
  //     namHoacKy: item.namHoacKy ?? '',
  //     huyenTinh: item.huyenTinh ?? '',
  //     vung: item.vung ?? '',
  //     soLuong: item.soLuong ?? '',
  //   }));
  // };

  // useEffect(() => {
  //   setDataSource((prev) => normalizeDataSource(prev));
  // }, []);

  const handleOnChangeCommonField = (
    index: number,
    value: string | boolean | number,
    fieldName: string,
  ) => {
    setDataSource((prev) => {
      (prev[index] as any)[fieldName] = value;
      const newDataSource = [...prev];

      return newDataSource;
    });
  };

  const handleChangeYear = (index: number, date: Dayjs, fieldName: string) => {
    const year = date ? date.format(DATE_FORMAT.YYYY) : '';
    setDataSource((prev) => {
      (prev[index] as any)[fieldName] = year;
      const newDataSource = [...prev];

      return newDataSource;
    });
  };

  // Cấu hình cột cho bảng
  const columns: ColumnsType<DataTypeTable13C> = [
    {
      title: 'STT',
      dataIndex: COLUMNS_DATA_INDEX_13C.STT,
      key: 'stt',
      align: 'center',
      render: (stt: number | string, record: DataTypeTable13C) => (record.isGroupTitle ? stt : stt),
    },
    {
      title: 'Loại tài liệu',
      dataIndex: COLUMNS_DATA_INDEX_13C.NAME,
      key: 'name',
      render: (
        name: string,
        record: DataTypeTable13C,
        _index,
      ) => {
        const isBold = record.isGroupTitle;
        const showInput = record.isOtherInfo;

        return (
          <>
            <span style={isBold ? { fontWeight: 'bold' } : {}}>{name}</span>
            {
            showInput && (
            <TextArea
              value={record.thongtinkhac}
              onChange={(e) => {
                // setDataSource((prev: any) => {
                //   prev[_index].thongtinkhac = e.target.value;
                //   return [...prev];
                // });
                handleOnChangeCommonField(
                  _index,
                  e.target.value,
                  COLUMNS_DATA_INDEX_13C.THONG_TIN_KHAC,
                );
              }}
              placeholder="Thông tin khác..."
            />
            )
            }
          </>
        );
      },
      onCell: (record: DataTypeTable13C) => {
        if (record.isOtherInfo) {
          return { colSpan: 5 };
        }
        if (record.isGroupTitle) {
          return { colSpan: 7 };
        }
        return { colSpan: 1 };
      },
    },
    {
      title: 'Cung cấp',
      dataIndex: COLUMNS_DATA_INDEX_13C.CUNG_CAP,
      key: 'cungCap',
      align: 'center',
      render: (value, record: DataTypeTable13C, _index) => (record.isGroupTitle
        ? ''
        : (
          <Checkbox
            {...rest}
            checked={value}
            onChange={(e) => {
              // setDataSource((prev: any) => {
              //   const newData = [...prev];
              //   newData[_index].cungCap = e.target.checked;
              //   return newData;
              // });
              handleOnChangeCommonField(_index, e.target.checked, COLUMNS_DATA_INDEX_13C.CUNG_CAP);
            }}
          />
        )
      ),
      onCell: sharedOnCell,
    },
    {
      title: 'Năm hoặc kỳ',
      dataIndex: COLUMNS_DATA_INDEX_13C.NAM_HOAC_KY,
      key: 'namHoacKy',
      align: 'center',
      onCell: sharedOnCell,
      render: (value, record: DataTypeTable13C, _index) => (record.isGroupTitle ? (
        ''
      ) : (
        <DatePicker
          picker="year"
          placeholder="Chọn năm"
          style={{ width: '100%' }}
          format={DATE_FORMAT.YYYY}
          value={value ? dayjs(value, DATE_FORMAT.YYYY) : null}
          onChange={(date) => {
            // setDataSource((prev: any) => {
            //   const newData = [...prev];
            //   newData[_index].namHoacKy = date ? dayjs(date).format(DATE_FORMAT.YYYY) : '';
            //   return newData;
            // });
            handleChangeYear(_index, date, COLUMNS_DATA_INDEX_13C.NAM_HOAC_KY);
          }}
        />
      )),
    },
    {
      title: 'Cấp đơn vị hành chính',
      children: [
        {
          title: 'Huyện/Tỉnh',
          dataIndex: COLUMNS_DATA_INDEX_13C.HUYEN_TINH,
          key: 'huyenTinh',
          align: 'center',
          render: (value, record: DataTypeTable13C, _index) => (record.isGroupTitle
            ? ''
            : (
              <Input
                defaultValue={value}
                value={value}
                onChange={(e) => {
                  // setDataSource((prev: any) => {
                  //   prev[_index].huyenTinh = e.target.value;
                  //   return [...prev];
                  // });
                  handleOnChangeCommonField(
                    _index,
                    e.target.value,
                    COLUMNS_DATA_INDEX_13C.HUYEN_TINH,
                  );
                }}
                placeholder="..."
              />
            )),
          onCell: sharedOnCell,
        },
        {
          title: 'Vùng',
          dataIndex: COLUMNS_DATA_INDEX_13C.VUNG,
          key: 'vung',
          align: 'center',
          render: (value, record: DataTypeTable13C, _index) => (record.isGroupTitle
            ? ''
            : (
              <Input
                defaultValue={value}
                value={value}
                onChange={(e) => {
                  // setDataSource((prev: any) => {
                  //   prev[_index].vung = e.target.value;
                  //   return [...prev];
                  // });
                  handleOnChangeCommonField(_index, e.target.value, COLUMNS_DATA_INDEX_13C.VUNG);
                }}
                placeholder="..."
              />
            )),
          onCell: sharedOnCell,
        },
        {
          title: 'Cả nước',
          dataIndex: COLUMNS_DATA_INDEX_13C.CA_NUOC,
          key: 'caNuoc',
          align: 'center',
          render: (
            value,
            record: DataTypeTable13C,
            _index,
          ) => (record.isGroupTitle && !record.isOtherInfo
            ? ''
            : (
              <Checkbox
                checked={value}
                onChange={(e) => {
                  // setDataSource((prev: any) => {
                  //   const newData = [...prev];
                  //   newData[_index].caNuoc = e.target.checked;
                  //   return newData;
                  // });
                  handleOnChangeCommonField(
                    _index,
                    e.target.checked,
                    COLUMNS_DATA_INDEX_13C.CA_NUOC,
                  );
                }}
              />
            )),
          onCell: (props) => {
            if (props.isOtherInfo) {
              return { colSpan: 1 };
            }

            return sharedOnCell(props);
          },
        },
      ],
    },
    {
      title: 'Số lượng',
      dataIndex: COLUMNS_DATA_INDEX_13C.SO_LUONG,
      key: 'soLuong',
      align: 'center',
      render: (
        value,
        record: DataTypeTable13C,
        _index,
      ) => (record.isGroupTitle && !record.isOtherInfo
        ? ''
        : (
          <InputNumber
            min={0}
            defaultValue={value}
            value={value}
            onChange={(newValue) => {
              // setDataSource((prev: any) => {
              //   const newData = [...prev];
              //   newData[_index].soLuong = newValue;
              //   return newData;
              // });
              handleOnChangeCommonField(
                _index,
                newValue,
                COLUMNS_DATA_INDEX_13C.SO_LUONG,
              );
            }}
            placeholder="..."
            style={{ width: '100%' }}
          />
        )),
      onCell: (props) => {
        if (props.isOtherInfo) {
          return { colSpan: 1 };
        }

        return sharedOnCell(props);
      },
    },
  ];

  return (
    <Table<DataTypeTable13C>
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      rowKey="key"
      bordered
      rowClassName={(record) => (record.isGroupTitle ? 'group-title-row' : '')}
    />
  );
};

export default ({ name, ...props }:any) => (
  <TransformTable13C {...props} id={name}>
    <TableDatDai13CViewer {...props} />
  </TransformTable13C>
);
