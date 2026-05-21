import { ORDER_STATUS_LABEL_MAP } from "@/apps/admin/constants/status";
import { DeliverySteps, MainCard, SectionHeading } from "../styled";

interface DeliveryStatusProps {
  orderStatus?: string;
}

const STATUS_FLOW = ["PENDING", "CONFIRMED", "PACKING", "SHIPPED", "COMPLETED"];

const DeliveryStatus = ({ orderStatus = "PENDING" }: DeliveryStatusProps) => {
  const currentIndex = STATUS_FLOW.indexOf(orderStatus);
  const current = currentIndex >= 0 ? currentIndex : 0;

  const items = STATUS_FLOW.map((status) => ({
    title: ORDER_STATUS_LABEL_MAP[status] || status,
    description: status === orderStatus ? "Đang xử lý" : "",
  }));

  if (orderStatus === "CANCELED") {
    items.push({ title: ORDER_STATUS_LABEL_MAP.CANCELED, description: "Đơn hàng đã hủy" });
    return (
      <MainCard bordered={false}>
        <SectionHeading>Trạng thái vận chuyển</SectionHeading>
        <DeliverySteps current={items.length - 1} status="error" items={items} />
      </MainCard>
    );
  }

  return (
    <MainCard bordered={false}>
      <SectionHeading>Trạng thái vận chuyển</SectionHeading>
      <DeliverySteps current={current} items={items} />
    </MainCard>
  );
};

export default DeliveryStatus;
