import { CaretDownOutlined } from "@ant-design/icons";
import type { TableColumnsType } from 'antd';
import {
  Empty,
  InputNumber,
  Select, Spin, Table
} from 'antd';
import React, {
  useEffect,
  useState
} from 'react';
import { TTableProps } from '../type';


import { fetchNgoaiTe } from "@packages/components/View/TableProfit/service/api";
import { NgoaiTe, ProfitData } from "@packages/components/View/TableProfit/service/type";
import { initValueColumn, recalcRow3 } from "@packages/components/View/TableProfit/Viewer/Table1/constant";
import './styles.scss';

const Table1: React.FC<TTableProps> = ({
  value: tableData, onChange, loaiNgoaiTe
}) => {

  const [currency, setCurrency] = useState<string>("VND");
  const [listNgoaiTe, setListNgoaiTe] = useState<NgoaiTe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Dữ liệu mẫu (có thể thay thế bằng props hoặc API)
  const [data, setData] = useState<ProfitData[]>(tableData?.data ?? initValueColumn);
  console.log("loaiNgoaiTe::", loaiNgoaiTe)
  useEffect(() => {
    onChange({
      data: data,
      profit: currency,
    });
  }, [currency, data]);
  useEffect(() => {
    fetchNgoaiTe()
      .then((data) => {
        
        setListNgoaiTe(data); // data JSON từ API
        setLoading(false);

      })
      .catch((err) => {
        setError(err.message || "Lỗi API");
        setLoading(false);
      });
  }, []);
  if (loading) return  <Spin tip="Loading" size="small"></Spin>;
  if (error) return <Empty />;
 // Hàm xử lý khi nhập liệu (nếu cần tính toán)
  const handleInputChange = (
    value: number | null,
    rowKey: string,
    field: "soTienNgoaiTe" | "soTienUSD",
  ) => {
   const newData = data.map((row) =>
    row.key === rowKey ? { ...row, [field]: value } : row
  );

  recalcRow3(newData); // tự kiểm tra ROW_1 + ROW_2
  setData(newData);
  };
 

 // Render Select ngay trong Header
  const renderCurrencyHeader = () => (
    <div className="currency-header-container">
      <Select
        value={currency}
        onChange={setCurrency}
        size="small"
        variant="borderless" // Quan trọng: Tắt viền để trông giống text
        className="currency-select-inline"
        suffixIcon={
          <span className="select-arrow-icon">
            <CaretDownOutlined />
          </span>
        } 
        options={listNgoaiTe.map((item)=>({
          label: item.ma,
          value: item.ma,
        }))}
      >
        
      </Select>
      <span>( loại ngoại tệ dùng để đầu tư)</span>
    </div>
  );
 const columns: TableColumnsType<ProfitData> = [
  {
    title: "",
    dataIndex: "sttHienThi",
    key: "sttHienThi",
    width: 80,
    align: "center",
  },
  {
    title: "Tên chỉ tiêu",
    dataIndex: "tenChiTieu",
    key: "tenChiTieu",
  },
  {
    title: "Số tiền",
    children: [
      {
        title: renderCurrencyHeader,
        dataIndex: "soTienNgoaiTe",
        key: "soTienNgoaiTe",
        render: (value, record) => (
          <InputNumber
            style={{ width: "100%" }}
            value={value}
            min={0}
            onChange={(val) =>
              handleInputChange(val, record.key, "soTienNgoaiTe")
            }
          />
        ),
      },
      {
        title: "USD",
        dataIndex: "soTienUSD",
        key: "soTienUSD",
        width: 150,
        render: (value, record) => (
          <InputNumber
            style={{ width: "100%" }}
            value={value}
            min={0}
            formatter={val => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            onChange={(val) =>
              handleInputChange(val, record.key, "soTienUSD")
            }
          />
        ),
      },
    ],
  },
];


  return (
    <Table<ProfitData>
      pagination={false}
      columns={columns}
      dataSource={data}
      bordered
      className="custom_text_table"
    />
  );
};

export default Table1;
