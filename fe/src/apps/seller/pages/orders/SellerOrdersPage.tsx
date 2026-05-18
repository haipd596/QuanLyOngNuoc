import { Select, Table, Tag, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { ORDER_STATUS_LABEL_MAP, ORDER_STATUS_OPTIONS } from "@/apps/admin/constants/status";
import { Panel, PanelHeader, PanelTitle, StatusDot, TableWrap } from "@/apps/admin/pages/dashboard/styled";
import { formatMoney } from "@/apps/admin/pages/dashboard/utils";
import { getSellerOrders, updateSellerOrderStatus } from "@/apps/seller/services/seller.api";

const PAGE_SIZE = 10;

const SellerOrdersPage = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res: any = await getSellerOrders({ Page: page, PageSize: PAGE_SIZE });
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
    { title: "Trạng thái", render: (_, r) => <Tag color={r.orderStatus === "CANCELED" ? "red" : "blue"}>{ORDER_STATUS_LABEL_MAP[r.orderStatus] || r.orderStatus}</Tag> },
    { title: "Tổng tiền", align: "right", render: (_, r) => formatMoney(Number(r.finalAmount)) },
    {
      title: "Cập nhật",
      render: (_, r) => (
        <Select
          style={{ width: 170 }}
          value={r.orderStatus}
          options={ORDER_STATUS_OPTIONS}
          onChange={async (value) => {
            await updateSellerOrderStatus(r.id, value);
            message.success("Đã cập nhật trạng thái đơn");
            void fetchOrders();
          }}
        />
      ),
    },
  ];

  return (
    <Panel>
      <PanelHeader><PanelTitle>Danh sách đơn bán</PanelTitle><StatusDot><span />Dữ liệu thật</StatusDot></PanelHeader>
      <TableWrap><Table rowKey="id" loading={loading} columns={columns} dataSource={orders} pagination={{ current: page, pageSize: PAGE_SIZE, total, onChange: setPage }} /></TableWrap>
    </Panel>
  );
};

export default SellerOrdersPage;
