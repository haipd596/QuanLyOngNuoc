import { CaretDownOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import type { TableColumnsType } from 'antd';
import {
  Button,
  Empty,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Spin,
  Table,
  Typography
} from 'antd';
import React, { useEffect, useState } from 'react';

// Giữ nguyên import của bạn
import { InvestorData } from "@packages/components/View/TableCapitalContribution/service/type";
import { calculateVerticalTotal, initData } from "@packages/components/View/TableCapitalContribution/Viewer/Table1/constant";
import { fetchNgoaiTe } from "@packages/components/View/TableProfit/service/api";
import { NgoaiTe } from "@packages/components/View/TableProfit/service/type";
import { randomString } from "@packages/utils/radomString";
import { TTableProps } from '../type';
import './styles.scss';

const { Text } = Typography;

const Table1: React.FC<TTableProps> = ({
  value: tableData,
  onChange,
}) => {
  const [currency, setCurrency] = useState<string>("VND");
  const [listNgoaiTe, setListNgoaiTe] = useState<NgoaiTe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  

  const [data, setData] = useState<InvestorData[]>(
    (tableData?.data as unknown as InvestorData[]) || initData
  );

  useEffect(() => {
    fetchNgoaiTe()
      .then((res) => {
        setListNgoaiTe(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Lỗi API"); console.log(err);
        setListNgoaiTe([] );
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    onChange?.({
      data: data,
      profit: currency,
    });
  }, [currency, data]);

 

  // --- CÁC HÀM XỬ LÝ SỰ KIỆN ---

  //  Hàm Thêm dòng
  const handleAddRow = () => {
    const newData = [...data];
    // Tìm vị trí dòng tổng cộng
    const totalIndex = newData.findIndex(item => item.isTotalRow);
    
   const newRow: InvestorData = {
    key: randomString(10),
    stt: totalIndex + 1,
    tenNhaDauTu: '',
    tienNgoaiTe: 0,
    tienUsd: 0,
    mayMocNgoaiTe: 0,
    mayMocUsd: 0,
    taiSanKhacNgoaiTe: 0,
    taiSanKhacUsd: 0,
    tongNgoaiTe: 0,
    tongUsd: 0,
  };

    // Chèn dòng mới vào TRƯỚC dòng tổng cộng
    if (totalIndex !== -1) {
      newData.splice(totalIndex, 0, newRow);
    } else {
      newData.push(newRow);
    }

    setData(newData);
  };

  //  Hàm Xóa dòng
  const handleDeleteRow = (key: string) => {
    // Lọc bỏ dòng cần xóa
    let newData = data.filter(item => item.key !== key);
    
    // Tính lại tổng sau khi xóa
    newData = calculateVerticalTotal(newData);
    setData(newData);
  };

  const handleInputChange = (
    value: number | null,
    rowKey: string,
    field: keyof InvestorData
  ) => {
    let newData = data.map((row) => {
      if (row.key === rowKey) {
        const updatedRow = { ...row, [field]: value };

        const fcFields: (keyof InvestorData)[] = [
          'tienNgoaiTe',
          'mayMocNgoaiTe',
          'taiSanKhacNgoaiTe',
        ];

        const usdFields: (keyof InvestorData)[] = [
          'tienUsd',
          'mayMocUsd',
          'taiSanKhacUsd',
        ];

        if (fcFields.includes(field)) {
          updatedRow.tongNgoaiTe =
            (updatedRow.tienNgoaiTe || 0) +
            (updatedRow.mayMocNgoaiTe || 0) +
            (updatedRow.taiSanKhacNgoaiTe || 0);
        }

        if (usdFields.includes(field)) {
          updatedRow.tongUsd =
            (updatedRow.tienUsd || 0) +
            (updatedRow.mayMocUsd || 0) +
            (updatedRow.taiSanKhacUsd || 0);
        }

        return updatedRow;
      }
      return row;
    });

    newData = calculateVerticalTotal(newData);
    setData(newData);
  };

  const handleNameChange = (val: string, key: string) => {
    setData(data.map(r =>
      r.key === key ? { ...r, tenNhaDauTu: val } : r
    ));
  };


  // --- RENDER ---

  const renderCurrencyHeader = () => (
    <div className="currency-header-container" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Select
        value={currency}
        onChange={setCurrency}
        size="small"
        variant="borderless"
        className="currency-select-inline"
        style={{ minWidth: 80, fontWeight: 'bold'}}
        suffixIcon={<CaretDownOutlined />}
        options={listNgoaiTe.map((item) => ({ label: item.ma, value: item.ma }))}
      />
      <div style={{ fontWeight: 'normal', fontStyle: 'italic', fontSize: '12px', marginBottom: 4 }}>
        (loại ngoại tệ dùng để đầu tư)
      </div>
      
    </div>
  );


  if (loading) return <Spin tip="Loading..." />;
  if (error) return <Empty description={error} />;

  const columns: TableColumnsType<InvestorData> = [
    {
      title: (
        <div style={{ whiteSpace: 'pre-wrap', textAlign: 'center' }}>
          Hình thức vốn{'\n'}(1) + (2) + (3)
        </div>
      ),
      dataIndex: "tenNhaDauTu",
      key: "tenNhaDauTu",
      width: 200,
      fixed: 'left',
      render: (text, record) => {
          if (record.isTotalRow) return <b>{text}</b>;
          return <Input placeholder="Nhập tên nhà đầu tư..." value={text} onChange={e => handleNameChange(e.target.value, record.key)} variant="borderless" />;
      }
    },
    // NHÓM 1: TIỀN
    {
      title: <div >Tiền (1)</div>,
      children: [
        {
          title: renderCurrencyHeader,
          dataIndex: "tienNgoaiTe",
          key: "tienNgoaiTe",
          // width: 130,
          render: (value, record) => (
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              value={value}
              // disabled={record.isTotalRow}
              formatter={val => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
             
              onChange={(val) => handleInputChange(val, record.key, "tienNgoaiTe")}
            />
          ),
        },
        {
          title: <div >Tương đương USD</div>,
          dataIndex: "tienUsd",
          key: "tienUsd",
          width: 70,
          render: (value, record) => (
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              value={value}
              // disabled={record.isTotalRow}
              formatter={val => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              onChange={(val) => handleInputChange(val, record.key, "tienUsd")}
            />
          ),
        },
      ],
    },
    // NHÓM 2: MÁY MÓC
    {
      title: <div >Máy móc, thiết bị,hàng hóa (2)</div>,
      children: [
        {
          title: renderCurrencyHeader,
          dataIndex: "mayMocNgoaiTe",
          key: "mayMocNgoaiTe",
          // width: 130,
          render: (value, record) => (
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              value={value}
              // disabled={record.isTotalRow}
              formatter={val => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              onChange={(val) => handleInputChange(val, record.key, "mayMocNgoaiTe")}
            />
          ),
        },
        {
          title: <div >Tương đương USD</div>,
          dataIndex: "mayMocUsd",
          key: "mayMocUsd",
          width: 70,
          render: (value, record) => (
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              value={value}
              // disabled={record.isTotalRow}
              formatter={val => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              onChange={(val) => handleInputChange(val, record.key, "mayMocUsd")}
            />
          ),
        },
      ],
    },
    // NHÓM 3: TÀI SẢN KHÁC
    {
      title: <div >Tài sản khác (ghi rõ) (3)</div>,
      children: [
        {
          title: renderCurrencyHeader,
          dataIndex: "taiSanKhacNgoaiTe",
          key: "taiSanKhacNgoaiTe",
          // width: 130,
          render: (value, record) => (
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              value={value}
              // disabled={record.isTotalRow}
              formatter={val => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              onChange={(val) => handleInputChange(val, record.key, "taiSanKhacNgoaiTe")}
            />
          ),
        },
        {
          title: <div >Tương đương USD</div>,
          dataIndex: "taiSanKhacUsd",
          key: "taiSanKhacUsd",
          width: 70,
          render: (value, record) => (
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              value={value}
              // disabled={record.isTotalRow}
              formatter={val => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              onChange={(val) => handleInputChange(val, record.key, "taiSanKhacUsd")}
            />
          ),
        },
      ],
    },
    // NHÓM 4: TỔNG (READ ONLY)
    {
      title: <div >Tổng (1+2+3)</div>,
      children: [
        {
          title: renderCurrencyHeader,
          dataIndex: "tongNgoaiTe",
          key: "tongNgoaiTe",
          // width: 130,
          render: (value) => (
            <Text strong>{value ? value.toLocaleString() : 0}</Text>
          ),
        },
        {
          title: <div >Tương đương USD</div>,
          dataIndex: "tongUsd",
          key: "tongUsd",
          width: 70,
          render: (value) => (
            <Text strong>{value ? value.toLocaleString() : 0}</Text>
          ),
        },
      ],
    },
    // CỘT HÀNH ĐỘNG (XÓA)
    {
        title: 'Thao tác',
        key: 'action',
        width: 70,
        fixed: 'right',
        align: 'center',

        render: (_, record) => {
            if (record.isTotalRow) return null;
            return (
                <Popconfirm title="Xóa dòng này?" okText='Xác nhận' cancelText='Từ chối' onConfirm={() => handleDeleteRow(record.key)}>
                    <Button type="text" danger icon={<DeleteOutlined />} size="small" style={{padding:0}}/>
                </Popconfirm>
            )
        }
    }
  ];

  return (
    <div className="custom-table-container">
      <Table<InvestorData>
        pagination={false}
        columns={columns}
        dataSource={data}
        bordered
        className="custom_text_table"
        scroll={{ x: 'max-content' }}
        rowClassName={(record) => record.isTotalRow ? "total-row-highlight" : ""}
      />
      
      {/* Nút thêm dòng nằm bên dưới bảng */}
      <div className="addrow-button">
        <Button 
            type="primary" 
            onClick={handleAddRow} 
            block 
            icon={<PlusOutlined />}
        >
            Thêm dòng
        </Button>
      </div>
    </div>
  );
};

export default Table1;