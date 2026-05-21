import { Button, Input, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Panel, PanelHeader, PanelTitle, StatusDot, TableWrap } from "@/apps/admin/pages/dashboard/styled";
import { getSellerOrders } from "@/apps/seller/services/seller.api";

const PAGE_SIZE = 10;
const CANCEL_PREFIX = "[CANCEL_REASON]";

const extractCancelReason = (note?: string | null) => {
  if (!note) return "";
  if (!note.startsWith(CANCEL_PREFIX)) return note;
  return note.replace(CANCEL_PREFIX, "").trim();
};

const SellerCancelReasonsPage = () => {
  const { Search } = Input;
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res: any = await getSellerOrders({
        Page: page,
        PageSize: PAGE_SIZE,
        Keyword: keyword.trim() || undefined,
        "Query.OrderStatus": "CANCELED",
      });
      setOrders(res.data || []);
      setTotal(res.metaData?.total || 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchOrders();
  }, [page]);

  const columns: ColumnsType<any> = [
    { title: "Mã đơn", dataIndex: "orderCode" },
    {
      title: "Khách hàng",
      render: (_, r) => r.customer?.fullName || r.guestName || "Khách lẻ",
    },
    {
      title: "Trạng thái",
      render: () => <Tag color="red">Đã hủy</Tag>,
    },
    {
      title: "Lý do hủy",
      dataIndex: "note",
      render: (note) => extractCancelReason(note) || "Không có lý do",
    },
    {
      title: "Thời gian",
      dataIndex: "updatedAt",
      render: (value) => new Date(value).toLocaleString("vi-VN"),
    },
  ];

  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>Quản lý lý do hủy đơn</PanelTitle>
        <StatusDot>
          <span />
          Đơn đã hủy
        </StatusDot>
      </PanelHeader>

      <div style={{ marginBottom: 12 }}>
        <Space>
          <Search
            allowClear
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Tìm theo mã đơn, khách hàng"
            onSearch={() => {
              setPage(1);
              void fetchOrders();
            }}
          />
          <Button onClick={() => { setKeyword(""); setPage(1); void fetchOrders(); }}>Xóa lọc</Button>
        </Space>
      </div>

      <TableWrap>
        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={orders}
          pagination={{ current: page, pageSize: PAGE_SIZE, total, onChange: setPage }}
        />
      </TableWrap>
    </Panel>
  );
};

export default SellerCancelReasonsPage;
