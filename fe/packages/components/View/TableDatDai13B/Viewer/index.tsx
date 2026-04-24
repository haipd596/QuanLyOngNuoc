import { DATE_FORMAT } from '@packages/constants/date';
import {
  Checkbox, DatePicker, Input, InputNumber, Table,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ColumnsType } from 'antd/lib/table';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { LanguageProviderForIndividual, useLanguageForIndividual } from '../../TableGroup/Viewer/LanguageSwitcherForIndividuals';
import {
  COLUMNS_DATA_INDEX_13B,
  DataTypeTable13B,
  sharedOnCell,
  shareOnCellSpecial,
  SPEC_ROW_HUYEN_TABLE_13B_INDEX,
  TABLE_DATA_DAT_DAI_13B,
} from './constant';
import en from './locales/en/table13b_en.json';
import vi from './locales/vi/table13b_vi.json';
import TransformTable13B from './TransformTableData13B';

export interface Table13BProps {
  value: any;
  onChange: any;
  languages?: string;
}

const TableDatDai13BViewer:React.FC<Table13BProps> = ({
  value: tableData,
  onChange,
}) => {
  const [
    dataSource,
    setDataSource,
  ] = useState<DataTypeTable13B[]>(tableData?.data || TABLE_DATA_DAT_DAI_13B);

  const { translations } = useLanguageForIndividual();

  useEffect(() => {
    onChange({
      data: dataSource,
    });
  }, [dataSource]);

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
  const columns: ColumnsType<DataTypeTable13B> = [
    {
      title: 'STT',
      dataIndex: COLUMNS_DATA_INDEX_13B.STT,
      key: 'stt',
      align: 'center',
      render: (
        stt: any,
        record: DataTypeTable13B,
      ) => {
        if (record.isOtherInfo) {
          return stt + 1;
        }
        if (record.isGroupTitle) {
          return stt;
        }
        return stt + 1;
      },
    },
    {
      title: translations.loai_tai_lieu,
      dataIndex: COLUMNS_DATA_INDEX_13B.NAME,
      key: 'name',
      render: (
        name: string,
        record: DataTypeTable13B,
        _index,
      ) => {
        const isBold = record.isGroupTitle;
        const showTextArea = record.isOtherInfo;

        return (
          <>
            <span style={isBold ? { fontWeight: 'bold' } : {}}>{translations[name]}</span>
            {
            showTextArea && (
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
                  COLUMNS_DATA_INDEX_13B.THONG_TIN_KHAC,
                );
              }}
              placeholder={translations.Other_info}
            />
            )
            }
          </>
        );
      },
      // onCell: ({ isGroupTitle }) => ({
      //   colSpan: isGroupTitle ? 7 : 1,
      // }),
      onCell: (record: DataTypeTable13B) => {
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
      title: translations.cung_cap,
      dataIndex: COLUMNS_DATA_INDEX_13B.CUNG_CAP,
      key: 'cungCap',
      align: 'center',
      render: (value, record: DataTypeTable13B, _index) => (record.isGroupTitle
        ? ''
        : (
          <Checkbox
            checked={value}
            onChange={(e) => {
              // setDataSource((prev: any) => {
              //   const newData = [...prev];
              //   newData[_index].cungCap = e.target.checked;
              //   return newData;
              // });
              handleOnChangeCommonField(_index, e.target.checked, COLUMNS_DATA_INDEX_13B.CUNG_CAP);
            }}
          />
        )),
      onCell: sharedOnCell,
    },
    {
      title: translations.nam_hoac_ky,
      dataIndex: COLUMNS_DATA_INDEX_13B.NAM_HOAC_KY,
      key: 'namHoacKy',
      align: 'center',
      onCell: sharedOnCell,
      render: (value, record: DataTypeTable13B, _index) => (record.isGroupTitle
        ? ''
        : (
          <DatePicker
            picker="year"
            placeholder={translations.Select_year}
            style={{ width: '100%' }}
            format={DATE_FORMAT.YYYY}
            value={value ? dayjs(value, DATE_FORMAT.YYYY) : null}
            onChange={(date) => {
              // setDataSource((prev: any) => {
              //   const newData = [...prev];
              //   newData[_index].namHoacKy = date ? dayjs(date).format(DATE_FORMAT.YYYY) : '';
              //   return newData;
              // });
              handleChangeYear(_index, date, COLUMNS_DATA_INDEX_13B.NAM_HOAC_KY);
            }}
          />
        )),
    },
    {
      title: translations.cap_don_vi_hanh_chinh,
      children: [
        {
          title: translations.huyen_tinh,
          dataIndex: COLUMNS_DATA_INDEX_13B.HUYEN_TINH,
          key: 'huyenTinh',
          align: 'center',
          render: (value, record: DataTypeTable13B, _index) => (record.isGroupTitle
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
                    SPEC_ROW_HUYEN_TABLE_13B_INDEX.includes(_index)
                      ? COLUMNS_DATA_INDEX_13B.CAP_DON_VI_HANH_CHINH
                      : COLUMNS_DATA_INDEX_13B.HUYEN_TINH,
                  );
                }}
                placeholder="..."
              />
            )),
          onCell: ({ isGroupTitle }, index) => {
            if (isGroupTitle) {
              return { colSpan: 0 };
            }

            if (SPEC_ROW_HUYEN_TABLE_13B_INDEX.includes(index as number)) {
              return { colSpan: 3 };
            }

            return {};
          },
        },
        {
          title: translations.vung,
          dataIndex: COLUMNS_DATA_INDEX_13B.VUNG,
          key: 'vung',
          align: 'center',
          render: (value, record: DataTypeTable13B, _index) => (record.isGroupTitle
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
                  handleOnChangeCommonField(_index, e.target.value, COLUMNS_DATA_INDEX_13B.VUNG);
                }}
                placeholder="..."
              />
            )),
          onCell: shareOnCellSpecial,
        },
        {
          title: translations.ca_nuoc,
          dataIndex: COLUMNS_DATA_INDEX_13B.CA_NUOC,
          key: 'caNuoc',
          align: 'center',
          render: (value, record: DataTypeTable13B, _index) => (
            record.isGroupTitle && !record.isOtherInfo
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
                      COLUMNS_DATA_INDEX_13B.CA_NUOC,
                    );
                  }}
                />
              )),
          // onCell: shareOnCellSpecial,
          onCell: ({ isOtherInfo, isGroupTitle }, index) => {
            if (isOtherInfo) {
              return { colSpan: 1 };
            }
            if (isGroupTitle) {
              return { colSpan: 0 };
            }
            if (SPEC_ROW_HUYEN_TABLE_13B_INDEX.includes(index as number)) {
              return { colSpan: 0 };
            }

            return { };
          },
        },
      ],
    },
    {
      title: translations.so_luong,
      dataIndex: COLUMNS_DATA_INDEX_13B.SO_LUONG,
      key: 'soLuong',
      align: 'center',
      render: (value, record: DataTypeTable13B, _index) => (
        record.isGroupTitle && !record.isOtherInfo
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
                  COLUMNS_DATA_INDEX_13B.SO_LUONG,
                );
              }}
              placeholder="..."
              style={{ width: '100%' }}
            />
          )),
      // onCell: sharedOnCell,
      onCell: (props) => {
        if (props.isOtherInfo) {
          return { colSpan: 1 };
        }

        return sharedOnCell(props);
      },
    },
  ];

  return (
    <Table<DataTypeTable13B>
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      rowKey="key"
      bordered
      rowClassName={(record) => (record.isGroupTitle ? 'group-title-row' : '')}
    />
  );
};

export default ({ name, languages, ...props }: any) => (
  <LanguageProviderForIndividual lng={languages} translationsVi={vi} translationsEn={en}>
    <TransformTable13B {...props} id={name}>
      <TableDatDai13BViewer {...props} />
    </TransformTable13B>
  </LanguageProviderForIndividual>
);
