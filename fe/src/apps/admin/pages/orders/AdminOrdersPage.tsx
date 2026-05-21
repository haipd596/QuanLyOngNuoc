import { Button, Input, Select, Space, Table, Tag, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { ORDER_STATUS_LABEL_MAP, ORDER_STATUS_OPTIONS } from "@/apps/admin/constants/status";
import { getSalesOrders, updateOrderStatus } from "@/apps/admin/services/admin.api";
import { ADMIN_PAGE_SIZE, formatMoney } from "../dashboard/utils";
import { Panel, PanelHeader, PanelTitle, StatusDot, TableWrap } from "../dashboard/styled";

const AdminOrdersPage = () => {
  const { Search } = Input;
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params: Record<string, unknown> = {
        Page: page,
        PageSize: ADMIN_PAGE_SIZE,
      };
      if (keyword.trim()) params.Keyword = keyword.trim();
      if (statusFilter) params["Query.OrderStatus"] = statusFilter;

      const res: any = await getSalesOrders(params as any);
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
    { title: "Khách hàng", render: (_, r) => r.customer?.fullName || r.guestName || "Khách lẻ" },
    { title: "Thanh toán", dataIndex: "paymentStatus" },
    { title: "Tổng tiền", render: (_, r) => formatMoney(Number(r.finalAmount)) },
    { title: "Trạng thái", render: (_, r) => <Tag color={r.orderStatus === "CANCELED" ? "red" : "blue"}>{ORDER_STATUS_LABEL_MAP[r.orderStatus] || r.orderStatus}</Tag> },
    {
      title: "Cập nhật",
      render: (_, r) => (
        <Select
          style={{ width: 180 }}
          value={r.orderStatus}
          options={ORDER_STATUS_OPTIONS}
          onChange={async (value) => {
            try {
              await updateOrderStatus(r.id, value);
              notification.success({ message: "Thành công", description: "Đã cập nhật trạng thái đơn hàng" });
              void fetchOrders();
            } catch {
              notification.error({ message: "Thất bại", description: "Cập nhật trạng thái thất bại" });
            }
          }}
        />
      ),
    },
  ];

  return (
    <Panel>
      <PanelHeader><PanelTitle>Danh sách đơn hàng</PanelTitle><StatusDot><span />Dùng map trạng thái tiếng Việt</StatusDot></PanelHeader>

      <div style={{ marginBottom: 12 }}>
        <Space wrap>
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
          <Select
            allowClear
            placeholder="Lọc trạng thái"
            style={{ width: 200 }}
            value={statusFilter}
            options={ORDER_STATUS_OPTIONS}
            onChange={(value) => setStatusFilter(value)}
          />
          <Button onClick={() => { setKeyword(""); setStatusFilter(undefined); setPage(1); void fetchOrders(); }}>
            Xóa lọc
          </Button>
        </Space>
      </div>

      <TableWrap><Table rowKey="id" loading={loading} columns={columns} dataSource={orders} pagination={{ current: page, pageSize: ADMIN_PAGE_SIZE, total, onChange: setPage }} /></TableWrap>
    </Panel>
  );
};

export default AdminOrdersPage;
