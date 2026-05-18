import { AlertOutlined, ShopOutlined, ShoppingCartOutlined, TeamOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { ArcElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { ORDER_STATUS_LABEL_MAP } from "@/apps/admin/constants/status";
import { getAdminDashboard, getOrderStatusSummary, getRevenueTrend } from "@/apps/admin/services/admin.api";
import { MetricCard, MetricGrid, MetricIcon, MetricLabel, MetricValue, Panel, PanelHeader, PanelTitle } from "../dashboard/styled";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

const AdminOverviewPage = () => {
  const [dashboard, setDashboard] = useState<any>(null);
  const [revenueTrend, setRevenueTrend] = useState<any[]>([]);
  const [orderStatusSummary, setOrderStatusSummary] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const [dashRes, trendRes, statusRes]: any = await Promise.all([
        getAdminDashboard(),
        getRevenueTrend(7),
        getOrderStatusSummary(30),
      ]);
      setDashboard(dashRes.data);
      setRevenueTrend(trendRes.data || []);
      setOrderStatusSummary(statusRes.data || []);
    };
    void load();
  }, []);

  const metrics = [
    { label: "Đơn hàng", value: dashboard?.totalOrders ?? 0, icon: <ShoppingCartOutlined />, tone: "orange" },
    { label: "Sản phẩm", value: dashboard?.totalProducts ?? 0, icon: <ShopOutlined />, tone: "blue" },
    { label: "Khách hàng", value: dashboard?.totalCustomers ?? 0, icon: <TeamOutlined />, tone: "green" },
    { label: "Tồn kho thấp", value: dashboard?.lowStockProducts ?? 0, icon: <AlertOutlined />, tone: "red" },
  ];

  return (
    <>
      <MetricGrid>
        {metrics.map((metric) => (
          <MetricCard key={metric.label}><MetricIcon $tone={metric.tone}>{metric.icon}</MetricIcon><div><MetricLabel>{metric.label}</MetricLabel><MetricValue>{metric.value}</MetricValue></div></MetricCard>
        ))}
      </MetricGrid>
      <Row gutter={16} style={{ marginTop: 18 }}>
        <Col xs={24} lg={16}>
          <Panel>
            <PanelHeader><PanelTitle>Doanh thu 7 ngày gần nhất</PanelTitle></PanelHeader>
            <div style={{ padding: 16 }}>
              <Line data={{ labels: revenueTrend.map((x) => x.date), datasets: [{ label: "Doanh thu", data: revenueTrend.map((x) => x.revenue), borderColor: "#1d4ed8", backgroundColor: "rgba(29,78,216,0.12)", tension: 0.35 }] }} />
            </div>
          </Panel>
        </Col>
        <Col xs={24} lg={8}>
          <Panel>
            <PanelHeader><PanelTitle>Tỷ lệ trạng thái đơn (30 ngày)</PanelTitle></PanelHeader>
            <div style={{ padding: 16 }}>
              <Doughnut data={{ labels: orderStatusSummary.map((x) => ORDER_STATUS_LABEL_MAP[x.orderStatus] || x.orderStatus), datasets: [{ data: orderStatusSummary.map((x) => x.count), backgroundColor: ["#0ea5e9", "#22c55e", "#f59e0b", "#6366f1", "#10b981", "#ef4444"] }] }} />
            </div>
          </Panel>
        </Col>
      </Row>
    </>
  );
};

export default AdminOverviewPage;
