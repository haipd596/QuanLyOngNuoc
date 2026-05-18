import { Col, Row, Table } from "antd";
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { MetricCard, MetricGrid, MetricLabel, MetricValue, Panel, PanelHeader, PanelTitle, TableWrap } from "@/apps/admin/pages/dashboard/styled";
import { formatMoney } from "@/apps/admin/pages/dashboard/utils";
import { getInventorySummary, getSalesOverview, getSellerRevenueTrend } from "@/apps/seller/services/seller.api";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const SellerReportsPage = () => {
  const [loading, setLoading] = useState(false);
  const [salesOverview, setSalesOverview] = useState<any>(null);
  const [revenueTrend, setRevenueTrend] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [salesRes, trendRes, inventoryRes]: any = await Promise.all([
          getSalesOverview(),
          getSellerRevenueTrend(7),
          getInventorySummary({ Page: 1, PageSize: 10 }),
        ]);
        setSalesOverview(salesRes.data);
        setRevenueTrend(trendRes.data || []);
        setInventory(inventoryRes.data || []);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  return (
    <>
      <MetricGrid>
        <MetricCard><div><MetricLabel>Tổng đơn trong kỳ</MetricLabel><MetricValue>{salesOverview?.totalOrders || 0}</MetricValue></div></MetricCard>
        <MetricCard><div><MetricLabel>Doanh thu</MetricLabel><MetricValue>{formatMoney(Number(salesOverview?.totalRevenue || 0))}</MetricValue></div></MetricCard>
        <MetricCard><div><MetricLabel>Chiết khấu</MetricLabel><MetricValue>{formatMoney(Number(salesOverview?.totalDiscount || 0))}</MetricValue></div></MetricCard>
        <MetricCard><div><MetricLabel>Doanh thu thuần</MetricLabel><MetricValue>{formatMoney(Number(salesOverview?.netRevenue || 0))}</MetricValue></div></MetricCard>
      </MetricGrid>

      <Row gutter={16} style={{ marginTop: 18 }}>
        <Col xs={24} lg={14}>
          <Panel>
            <PanelHeader><PanelTitle>Xu hướng doanh thu 7 ngày</PanelTitle></PanelHeader>
            <div style={{ padding: 16 }}>
              <Line data={{ labels: revenueTrend.map((x) => x.date), datasets: [{ label: "Doanh thu", data: revenueTrend.map((x) => x.revenue), borderColor: "#2563eb", backgroundColor: "rgba(37,99,235,0.1)", tension: 0.35 }] }} />
            </div>
          </Panel>
        </Col>
        <Col xs={24} lg={10}>
          <Panel>
            <PanelHeader><PanelTitle>Tồn kho hiện tại</PanelTitle></PanelHeader>
            <TableWrap><Table rowKey="id" loading={loading} columns={[{ title: "SKU", dataIndex: "sku" }, { title: "Tên", dataIndex: "name" }, { title: "Tồn", dataIndex: "stockQuantity" }]} dataSource={inventory} pagination={false} /></TableWrap>
          </Panel>
        </Col>
      </Row>
    </>
  );
};

export default SellerReportsPage;
