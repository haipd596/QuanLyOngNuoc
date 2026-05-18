import { Select, Table, Tag, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { ORDER_STATUS_LABEL_MAP } from "@/apps/admin/constants/status";
import { Panel, PanelHeader, PanelTitle, StatusDot, TableWrap } from "@/apps/admin/pages/dashboard/styled";
import { formatMoney } from "@/apps/admin/pages/dashboard/utils";
import { getSellerOrders, updateSellerOrderStatus } from "@/apps/seller/services/seller.api";

const PAGE_SIZE = 10;
const DELIVERY_OPTIONS = [
  { value: "PACKING", label: "Đang đóng gói" },
  { value: "SHIPPED", label: "Đang giao" },
  { value: "COMPLETED", label: "Hoàn tất" },
];

const SellerDeliveryPage = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res: any = await getSellerOrders({ Page: 1, PageSize: PAGE_SIZE });
      const filtered = (res.data || []).filter((x: any) => ["CONFIRMED", "PACKING", "SHIPPED"].includes(x.orderStatus));
      setOrders(filtered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchOrders();
  }, []);

  const columns: ColumnsType<any> = [
    { title: "Mã đơn", dataIndex: "orderCode" },
    { title: "Khách hàng", render: (_, r) => r.customer?.fullName || r.guestName || "Khách lẻ" },
    { title: "Trạng thái", render: (_, r) => <Tag color="blue">{ORDER_STATUS_LABEL_MAP[r.orderStatus] || r.orderStatus}</Tag> },
    { title: "Tổng tiền", align: "right", render: (_, r) => formatMoney(Number(r.finalAmount)) },
    {
      title: "Xử lý giao hàng",
      render: (_, r) => (
        <Select
          style={{ width: 180 }}
          value={r.orderStatus}
          options={DELIVERY_OPTIONS}
          onChange={async (value) => {
            await updateSellerOrderStatus(r.id, value);
            message.success("Đã cập nhật tiến độ giao hàng");
            void fetchOrders();
          }}
        />
      ),
    },
  ];

  return (
    <Panel>
      <PanelHeader><PanelTitle>Đơn cần giao</PanelTitle><StatusDot><span />Dữ liệu thật</StatusDot></PanelHeader>
      <TableWrap><Table rowKey="id" loading={loading} columns={columns} dataSource={orders} pagination={false} /></TableWrap>
    </Panel>
  );
};

export default SellerDeliveryPage;
