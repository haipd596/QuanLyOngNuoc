import {
  Checkbox, DatePicker, Input, Table, Typography,
} from 'antd';
import 'antd/dist/reset.css';
import type { ColumnsType } from 'antd/es/table';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { LanguageProviderForIndividual } from '../../TableGroup/Viewer/LanguageSwitcherForIndividuals';
import {
  createCheckboxOptions,
  createReportCheckboxOptions,
  createVerticalInputs,
  DOC_TYPE_IS_CHECKBOX,
  DOC_TYPE_MAU_DAT,
  DOC_TYPE_MAU_REPORT_DAT,
  LEVEL_VERTICAL_INPUT,
  TABLE13D_DATASOURCE,
} from '../constant';
import TransformTableData13D from './TransformTableData13D';

interface DataType {
  key: string;
  doc_type: any;
  supply: boolean;
  year: string | null;
  level?: string;
}

const TableDatDai13DViewer: React.FC<any> = ({ value: tableData, onChange }) => {
  const initialData = Array.isArray(tableData) ? tableData : TABLE13D_DATASOURCE;
  const [data, setData] = useState<DataType[]>(initialData);
  // const [data, setData] = useState<DataType[]>(tableData || TABLE13D_DATASOURCE);
  const timerRef:any = useRef<NodeJS.Timeout | undefined>(undefined);
  const isUserChange = useRef(false);

  useEffect(() => {
    if (Array.isArray(tableData?.data)) {
      setData(tableData.data);
    }
  }, [tableData]);

  const updateData = (newData: DataType[]) => {
    setData(newData);
    isUserChange.current = true;
  };

  useEffect(() => {
    clearTimeout(timerRef.current);

    if (isUserChange.current) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        onChange({ data });
      }, 1000);
    }

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [data, onChange]);

  const handleSupplyChange = (key: string, checked: boolean) => {
    const newData = data.map((item) => {
      if (item.key === key) {
        return { ...item, supply: checked };
      }
      return item;
    });
    updateData(newData);
  };

  const handleDoctypeChange = (key: string, newDoc: any) => {
    const newData = data.map((item) => {
      if (item.key === key) {
        return {
          ...item,
          doc_type: {
            ...item.doc_type,
            ...newDoc,
          },
        };
      }
      return item;
    });
    updateData(newData);
  };

  const handleDvhc = (key: string, newLevel: any) => {
    const newData = data.map((item) => {
      if (item.key === key) {
        return {
          ...item,
          level: newLevel,
        };
      }
      return item;
    });

    updateData(newData);
  };

  const handleYearChange = (key: string, date: Dayjs | null) => {
    const year = date ? date.format('YYYY') : '';
    const newData = data.map((item) => {
      if (item.key === key) {
        return { ...item, year };
      }
      return item;
    });
    updateData(newData);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
      width: 60,
      align: 'center',
    },
    {
      title: 'Loại tài liệu',
      dataIndex: 'doc_type',
      key: 'doc_type',
      render: (value, record) => {
        const handleChange = (values: any) => {
          handleDoctypeChange(record.key, values);
        };

        if (DOC_TYPE_IS_CHECKBOX.includes(Number(record.key))) {
          return createCheckboxOptions(value, handleChange);
        }

        if (DOC_TYPE_MAU_DAT.includes(Number(record.key))) {
          const { checkbox1, checkbox2 } = value.checkBoxValue;

          const handleMultiCheckboxChange = (checkboxName: string, _value: any) => {
            handleChange({
              ...value,
              checkBoxValue: {
                ...value.checkBoxValue,
                [checkboxName]: _value.checkBoxValue,
              },
            });
          };

          return (
            <>
              {createCheckboxOptions({ label: '- Mẫu đất:', checkBoxValue: checkbox1 }, (_value: any) => handleMultiCheckboxChange('checkbox1', _value))}
              {createCheckboxOptions({ label: '- Nước:', checkBoxValue: checkbox2 }, (_value: any) => handleMultiCheckboxChange('checkbox2', _value))}
            </>
          );
        }

        if (DOC_TYPE_MAU_REPORT_DAT.includes(Number(record.key))) {
          return createReportCheckboxOptions(value, handleChange);
        }

        return value.label;
      },
    },
    {
      title: 'Cung cấp',
      dataIndex: 'supply',
      key: 'supply',
      width: 80,
      align: 'center',
      render: (checked, record) => (
        <Checkbox
          checked={checked}
          onChange={(e) => handleSupplyChange(record.key, e.target.checked)}
        />
      ),
    },
    {
      title: 'Năm hoặc kỳ',
      dataIndex: 'year',
      key: 'year',
      width: 120,
      align: 'center',
      render: (_, record) => (
        <DatePicker
          picker="year"
          value={record.year ? dayjs(record.year, 'YYYY') : null}
          onChange={(date) => handleYearChange(record.key, date)}
          style={{ width: '100%' }}
        />
      ),
    },
    {
      title: 'Cấp đơn vị hành chính (tỉnh/vùng, cả nước) hoặc chuyên đề',
      dataIndex: 'level',
      key: 'level',
      render: (_value, record) => {
        if (LEVEL_VERTICAL_INPUT[record.key]) {
          return createVerticalInputs(_value, (values: any) => handleDvhc(record.key, values));
        }

        return (
          <Input value={_value} onChange={(e) => handleDvhc(record.key, e.target.value)} />
        );
      },
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Typography.Title level={3} style={{ textAlign: 'center' }}>
        THÔNG TIN, DỮ LIỆU CHI TIẾT VỀ ĐIỀU TRA, ĐÁNH GIÁ, BẢO VỆ, CẢI TẠO, PHỤC
        HỒI ĐẤT
      </Typography.Title>
      <Typography.Text
        style={{ textAlign: 'center', display: 'block', marginBottom: '20px' }}
      >
        (Kèm theo Phiếu yêu cầu cung cấp thông tin, dữ liệu đất đai)
      </Typography.Text>
      <Table<DataType>
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default ({ value, onChange, ...rest }: any) => (
  <LanguageProviderForIndividual translationsEn={{}} translationsVi={{}}>
    <TransformTableData13D value={value} onChange={onChange} id={rest.id}>
      <TableDatDai13DViewer {...rest} />
    </TransformTableData13D>
  </LanguageProviderForIndividual>
);
