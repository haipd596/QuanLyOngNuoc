import { Table } from "antd";
import { useEffect, useState } from "react";
import { getInventoryAudit, getSalesOverview } from "@/apps/admin/services/admin.api";
import { formatMoney } from "../dashboard/utils";
import { MetricCard, MetricGrid, MetricLabel, MetricValue, Panel, PanelHeader, PanelTitle, TableWrap } from "../dashboard/styled";

const AdminReportsPage = () => {
  const [loading, setLoading] = useState(false);
  const [salesOverview, setSalesOverview] = useState<any>(null);
  const [inventoryAudit, setInventoryAudit] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [salesRes, inventoryRes]: any = await Promise.all([getSalesOverview(), getInventoryAudit()]);
        setSalesOverview(salesRes.data);
        setInventoryAudit(inventoryRes.data);
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
        <MetricCard><div><MetricLabel>Giảm giá</MetricLabel><MetricValue>{formatMoney(Number(salesOverview?.totalDiscount || 0))}</MetricValue></div></MetricCard>
        <MetricCard><div><MetricLabel>Doanh thu thuần</MetricLabel><MetricValue>{formatMoney(Number(salesOverview?.netRevenue || 0))}</MetricValue></div></MetricCard>
      </MetricGrid>
      <Panel>
        <PanelHeader><PanelTitle>Kiểm kê tồn kho thấp</PanelTitle></PanelHeader>
        <TableWrap><Table rowKey="id" loading={loading} columns={[{ title: "SKU", dataIndex: "sku" }, { title: "Tên", dataIndex: "name" }, { title: "Tồn", dataIndex: "stockQuantity" }, { title: "Min", dataIndex: "minStockLevel" }]} dataSource={inventoryAudit?.lowStock?.data || []} pagination={false} /></TableWrap>
      </Panel>
    </>
  );
};

export default AdminReportsPage;
