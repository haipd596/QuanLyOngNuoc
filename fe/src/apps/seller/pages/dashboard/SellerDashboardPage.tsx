import { CheckCircleOutlined, ClockCircleOutlined, ShoppingCartOutlined, TeamOutlined, TruckOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from "chart.js";
import { useEffect, useMemo, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  MetricCard,
  MetricGrid,
  MetricIcon,
  MetricLabel,
  MetricValue,
  Panel,
  PanelHeader,
  PanelTitle,
} from "@/apps/admin/pages/dashboard/styled";
import { formatMoney } from "@/apps/admin/pages/dashboard/utils";
import { getSellerDashboard } from "@/apps/seller/services/seller.api";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const SellerDashboardPage = () => {
  const [dashboard, setDashboard] = useState<any>(null);

  const fetchData = async () => {
    const dashRes: any = await getSellerDashboard();
    setDashboard(dashRes.data);
  };

  useEffect(() => {
    void fetchData();
  }, []);

  const metrics = useMemo(
    () => [
      { label: "Tổng sản phẩm", value: dashboard?.totalProducts ?? 0, icon: <ShoppingCartOutlined />, tone: "blue" },
      { label: "Tổng khách hàng", value: dashboard?.totalCustomers ?? 0, icon: <TeamOutlined />, tone: "green" },
      { label: "Tổng người dùng", value: dashboard?.totalUsers ?? 0, icon: <TeamOutlined />, tone: "orange" },
      { label: "Tổng đơn hàng", value: dashboard?.totalOrders ?? 0, icon: <ShoppingCartOutlined />, tone: "red" },
      { label: "Đơn mới hôm nay", value: dashboard?.newOrdersToday ?? 0, icon: <ShoppingCartOutlined />, tone: "orange" },
      { label: "Chờ xử lý", value: dashboard?.pendingOrders ?? 0, icon: <ClockCircleOutlined />, tone: "red" },
      { label: "Đang đóng gói", value: dashboard?.packingOrders ?? 0, icon: <TruckOutlined />, tone: "blue" },
      { label: "Đã hoàn tất", value: dashboard?.completedOrders ?? 0, icon: <CheckCircleOutlined />, tone: "green" },
    ],
    [
      dashboard?.completedOrders,
      dashboard?.newOrdersToday,
      dashboard?.packingOrders,
      dashboard?.pendingOrders,
      dashboard?.totalCustomers,
      dashboard?.totalOrders,
      dashboard?.totalProducts,
      dashboard?.totalUsers,
    ],
  );

  const summaryChartData = {
    labels: ["Sản phẩm", "Khách hàng", "Người dùng", "Đơn hàng", "Sắp hết hàng"],
    datasets: [
      {
        label: "Tổng quan",
        data: [
          Number(dashboard?.totalProducts || 0),
          Number(dashboard?.totalCustomers || 0),
          Number(dashboard?.totalUsers || 0),
          Number(dashboard?.totalOrders || 0),
          Number(dashboard?.lowStockProducts || 0),
        ],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.75)",
        borderRadius: 6,
      },
    ],
  };

  const statusChartData = {
    labels: ["Chờ xử lý", "Đang đóng gói", "Hoàn tất"],
    datasets: [
      {
        data: [
          Number(dashboard?.pendingOrders || 0),
          Number(dashboard?.packingOrders || 0),
          Number(dashboard?.completedOrders || 0),
        ],
        backgroundColor: ["#f59e0b", "#3b82f6", "#10b981"],
        borderWidth: 0,
      },
    ],
  };

  const hasStatusData =
    Number(dashboard?.pendingOrders || 0) +
      Number(dashboard?.packingOrders || 0) +
      Number(dashboard?.completedOrders || 0) >
    0;

  return (
    <>
      <MetricGrid>
        {metrics.map((metric) => (
          <MetricCard key={metric.label}>
            <MetricIcon $tone={metric.tone}>{metric.icon}</MetricIcon>
            <div>
              <MetricLabel>{metric.label}</MetricLabel>
              <MetricValue>{metric.value}</MetricValue>
            </div>
          </MetricCard>
        ))}
      </MetricGrid>

      <Row gutter={16} style={{ marginTop: 18 }}>
        <Col xs={24} lg={16}>
          <Panel>
            <PanelHeader>
              <PanelTitle>Tổng quan số liệu</PanelTitle>
            </PanelHeader>
            <div style={{ padding: 16 }}>
              <Bar data={summaryChartData} />
            </div>
          </Panel>
        </Col>
        <Col xs={24} lg={8}>
          <Panel>
            <PanelHeader>
              <PanelTitle>Cơ cấu trạng thái đơn</PanelTitle>
            </PanelHeader>
            <div style={{ padding: 16 }}>
              {hasStatusData ? (
                <div style={{ maxWidth: 320, margin: "0 auto" }}>
                  <Doughnut data={statusChartData} />
                </div>
              ) : (
                <div
                  style={{
                    minHeight: 220,
                    border: "1px dashed #d0d5dd",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#667085",
                    fontWeight: 500,
                  }}
                >
                  Chưa có dữ liệu trạng thái đơn
                </div>
              )}
              <div style={{ marginTop: 12, fontWeight: 700, color: "#0b2e59" }}>
                Doanh thu hôm nay: {formatMoney(Number(dashboard?.todayRevenue || 0))}
              </div>
              <div style={{ marginTop: 6, fontWeight: 600, color: "#b54708" }}>
                Sản phẩm sắp hết hàng: {Number(dashboard?.lowStockProducts || 0)}
              </div>
            </div>
          </Panel>
        </Col>
      </Row>
    </>
  );
};

export default SellerDashboardPage;
