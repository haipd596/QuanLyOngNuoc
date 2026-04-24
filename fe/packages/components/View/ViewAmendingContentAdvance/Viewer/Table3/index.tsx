import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import type { TableColumnsType } from 'antd';
import {
  Button,
  Input,
  InputNumber,
  Popconfirm,
  Table
} from 'antd';
import React, { useEffect, useState } from 'react';

// Import type chung (giữ nguyên đường dẫn của bạn)
import { InvestorBorrowData } from "@packages/components/View/TableCapitalLending/service/type";
import { calculateVerticalTotal, initData } from "@packages/components/View/TableCapitalLending/Viewer/Table1/constant";
import { randomString } from "@packages/utils/radomString";
import { TTableProps } from '../type';
import './styles.scss';

const Table2: React.FC<TTableProps> = ({
  value: tableData,
  onChange,
  loaiNgoaiTe
}) => {
  const [data, setData] = useState<InvestorBorrowData[]>(
    (tableData?.data as unknown as InvestorBorrowData[]) || initData
  );

  // Sync dữ liệu ra ngoài khi có thay đổi
  useEffect(() => {
    onChange?.({
      data: data,
      profit: loaiNgoaiTe,
    });
  }, [data]);

  // --- THÊM DÒNG ---
  const handleAddRow = () => {
    const newData = [...data];
    // Tìm vị trí dòng tổng cộng
    const totalIndex = newData.findIndex(item => item.isTotalRow);
    
    // Tạo dòng mới với key unique 
    const newRow: InvestorBorrowData = {
      key: randomString(10),
      tenNhaDauTu: '',
      choVay: 0,
      baoLanh: 0,
    };

    // Chèn vào trước dòng tổng
    if (totalIndex !== -1) {
      newData.splice(totalIndex, 0, newRow);
    } else {
      newData.push(newRow);
    }
    setData(newData);
  };

  // ---  XÓA DÒNG ---
  const handleDeleteRow = (key: string) => {
    // Lọc bỏ dòng có key tương ứng
    let newData = data.filter(item => item.key !== key);
    // Tính lại tổng ngay sau khi xóa
    newData = calculateVerticalTotal(newData);
    setData(newData);
  };

  // --- XỬ LÝ NHẬP LIỆU ---
  const handleInputChange = (
    value: number | null,
    rowKey: string,
    field: keyof InvestorBorrowData
  ) => {
    let newData = data.map((row) => {
      if (row.key === rowKey) {
        return { ...row, [field]: value };
      }
      return row;
    });

    // Tính lại tổng khi số liệu thay đổi
    newData = calculateVerticalTotal(newData);
    setData(newData);
  };

  const handleNameChange = (val: string, key: string) => {
      const newData = data.map(r => r.key === key ? {...r, tenNhaDauTu: val} : r);
      setData(newData);
  }

  // --- CẤU HÌNH CỘT ---
  const columns: TableColumnsType<InvestorBorrowData> = [
    {
      title: <div className="text-center">Tên nhà đầu tư</div>,
      dataIndex: "tenNhaDauTu",
      key: "tenNhaDauTu",
      width: 250,
      render: (text, record) => {
          if (record.isTotalRow) return <div style={{textAlign: 'center'}}>{text}</div>;
          return (
            <Input 
                placeholder="Nhập tên nhà đầu tư" 
                value={text} 
                onChange={e => handleNameChange(e.target.value, record.key)} 
                variant="borderless"
            />
          );
      }
    },
    {
      title: <div className="text-center">Số tiền</div>,
      children: [
        {
          title: <div className="text-center">Cho tổ chức kinh tế ở nước<br/>ngoài vay</div>,
          dataIndex: "choVay",
          key: "choVay",
          width: 200,
          render: (value, record) => {
            if (record.isTotalRow) return <div className="text-right">{value ? value.toLocaleString() : 0}</div>;
            return (
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  value={value}
                  formatter={val => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  
                  onChange={(val) => handleInputChange(val, record.key, "choVay")}
                />
            );
          },
        },
        {
          title: <div className="text-center">Bảo lãnh cho tổ chức kinh<br/>tế ở nước ngoài vay</div>,
          dataIndex: "baoLanh",
          key: "baoLanh",
          width: 200,
          render: (value, record) => {
            if (record.isTotalRow) return <div className="text-right">{value ? value.toLocaleString() : 0}</div>;
            return (
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  value={value}
                  formatter={val => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  
                  onChange={(val) => handleInputChange(val, record.key, "baoLanh")}
                />
            );
          },
        },
      ],
    },
    // CỘT HÀNH ĐỘNG (NÚT XÓA)
    {
        title: 'Thao tác',
        key: 'action',
        width: 50,
        align: 'center',
        render: (_, record) => {
            // Không hiện nút xóa ở dòng Tổng
            if (record.isTotalRow) return null;
            return (
                <Popconfirm title="Xóa dòng này?" okText='Xác nhận' cancelText='Từ chối' onConfirm={() => handleDeleteRow(record.key)}>
                    <Button type="text" danger icon={<DeleteOutlined />} size="small" />
                </Popconfirm>
            )
        }
    }
  ];

  return (
    <div className="custom-table-container">
      <Table<InvestorBorrowData>
        pagination={false}
        columns={columns}
        dataSource={data}
        bordered
        className="custom_text_table"
        rowClassName={(record) => record.isTotalRow ? "total-row-highlight" : ""}
      />
      
      {/* NÚT THÊM DÒNG */}
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

export default Table2;