import { Select, Table, Tag, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { ORDER_STATUS_LABEL_MAP } from "@/apps/admin/constants/status";
import {
  Panel,
  PanelHeader,
  PanelTitle,
  StatusDot,
  TableWrap,
} from "@/apps/admin/pages/dashboard/styled";
import { formatMoney } from "@/apps/admin/pages/dashboard/utils";
import { getSellerOrders, updateSellerOrderStatus } from "@/apps/seller/services/seller.api";

const PAGE_SIZE = 10;
const DELIVERY_FLOW = ["PENDING", "CONFIRMED", "PACKING", "SHIPPED", "COMPLETED"];
const DELIVERY_OPTIONS = DELIVERY_FLOW.map((value) => ({
  value,
  label: ORDER_STATUS_LABEL_MAP[value] || value,
}));

const SellerDeliveryPage = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res: any = await getSellerOrders({ Page: 1, PageSize: PAGE_SIZE });
      const filtered = (res.data || []).filter((x: any) => DELIVERY_FLOW.includes(x.orderStatus));
      setOrders(filtered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchOrders();
  }, []);

  const columns: ColumnsType<any> = [
    { title: "Mã don", dataIndex: "orderCode" },
    { title: "Khách hàng", render: (_, r) => r.customer?.fullName || r.guestName || "Khách l?" },
    {
      title: "Tr?ng thái",
      render: (_, r) => <Tag color="blue">{ORDER_STATUS_LABEL_MAP[r.orderStatus] || r.orderStatus}</Tag>,
    },
    { title: "T?ng ti?n", align: "right", render: (_, r) => formatMoney(Number(r.finalAmount)) },
    {
      title: "X? lý giao hàng",
      render: (_, r) => (
        <Select
          style={{ width: 180 }}
          value={r.orderStatus}
          options={DELIVERY_OPTIONS}
          onChange={async (value) => {
            try {
              await updateSellerOrderStatus(r.id, value);
              notification.success({ message: "Thành công", description: "Ðã c?p nh?t ti?n d? giao hàng" });
              void fetchOrders();
            } catch {
              notification.error({ message: "Th?t b?i", description: "C?p nh?t ti?n d? giao hàng th?t b?i" });
            }
          }}
        />
      ),
    },
  ];

  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>Ðon c?n giao</PanelTitle>
        <StatusDot>
          <span />D? li?u th?t
        </StatusDot>
      </PanelHeader>
      <TableWrap>
        <Table rowKey="id" loading={loading} columns={columns} dataSource={orders} pagination={false} />
      </TableWrap>
    </Panel>
  );
};

export default SellerDeliveryPage;
