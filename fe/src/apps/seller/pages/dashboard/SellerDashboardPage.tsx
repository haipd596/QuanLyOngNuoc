import { CheckCircleOutlined, ClockCircleOutlined, ShoppingCartOutlined, TruckOutlined } from "@ant-design/icons";
import { Select, Table, Tag, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useMemo, useState } from "react";
import { ORDER_STATUS_LABEL_MAP, ORDER_STATUS_OPTIONS } from "@/apps/admin/constants/status";
import { MetricCard, MetricGrid, MetricIcon, MetricLabel, MetricValue, Panel, PanelHeader, PanelTitle, StatusDot, TableWrap } from "@/apps/admin/pages/dashboard/styled";
import { formatMoney } from "@/apps/admin/pages/dashboard/utils";
import { getSellerDashboard, getSellerOrders, updateSellerOrderStatus } from "@/apps/seller/services/seller.api";

const PAGE_SIZE = 10;

const SellerDashboardPage = () => {
  const [loading, setLoading] = useState(false);
  const [dashboard, setDashboard] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [dashRes, orderRes]: any = await Promise.all([
        getSellerDashboard(),
        getSellerOrders({ Page: 1, PageSize: PAGE_SIZE }),
      ]);
      setDashboard(dashRes.data);
      setOrders(orderRes.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  const metrics = useMemo(
    () => [
      { label: "Đơn mới hôm nay", value: dashboard?.newOrdersToday ?? 0, icon: <ShoppingCartOutlined />, tone: "orange" },
      { label: "Đang đóng gói", value: dashboard?.packingOrders ?? 0, icon: <TruckOutlined />, tone: "blue" },
      { label: "Đã hoàn tất", value: dashboard?.completedOrders ?? 0, icon: <CheckCircleOutlined />, tone: "green" },
      { label: "Chờ xác nhận", value: dashboard?.pendingOrders ?? 0, icon: <ClockCircleOutlined />, tone: "red" },
    ],
    [dashboard?.completedOrders, dashboard?.newOrdersToday, dashboard?.packingOrders, dashboard?.pendingOrders],
  );

  const columns: ColumnsType<any> = [
    { title: "Mã đơn", dataIndex: "orderCode" },
    { title: "Khách hàng", render: (_, r) => r.customer?.fullName || r.guestName || "Khách lẻ" },
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
            void fetchData();
          }}
        />
      ),
    },
  ];

  return (
    <>
      <MetricGrid>
        {metrics.map((metric) => (
          <MetricCard key={metric.label}><MetricIcon $tone={metric.tone}>{metric.icon}</MetricIcon><div><MetricLabel>{metric.label}</MetricLabel><MetricValue>{metric.value}</MetricValue></div></MetricCard>
        ))}
      </MetricGrid>

      <Panel>
        <PanelHeader><PanelTitle>Đơn bán cần theo dõi</PanelTitle><StatusDot><span />Dữ liệu thật</StatusDot></PanelHeader>
        <TableWrap><Table rowKey="id" loading={loading} columns={columns} dataSource={orders} pagination={false} /></TableWrap>
      </Panel>
    </>
  );
};

export default SellerDashboardPage;
