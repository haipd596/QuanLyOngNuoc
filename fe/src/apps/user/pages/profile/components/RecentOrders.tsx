import {
  GiftOutlined,
  HistoryOutlined,
  InboxOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import {
  CardHeading,
  IconBadge,
  RecentOrderAction,
  RecentOrderAmount,
  RecentOrderCard,
  RecentOrderDate,
  RecentOrderHeader,
  RecentOrderIcon,
  RecentOrderItem,
  RecentOrderMeta,
  RecentOrderSecondary,
  RecentOrderStatus,
  RecentOrderTitle,
  RecentOrdersSection,
  SectionTitle,
} from "../styled";

const RecentOrders = () => {
  return (
    <RecentOrdersSection>
      <RecentOrderHeader>
        <CardHeading>
          <IconBadge>
            <InboxOutlined />
          </IconBadge>
          <SectionTitle>Đơn hàng gần đây</SectionTitle>
        </CardHeading>

        <RecentOrderAction href="#">Xem tất cả lịch sử</RecentOrderAction>
      </RecentOrderHeader>

      <RecentOrderCard>
        <RecentOrderItem>
          <RecentOrderIcon>
            <GiftOutlined />
          </RecentOrderIcon>
          <RecentOrderMeta>
            <RecentOrderTitle>Đơn hàng #ONV-9821</RecentOrderTitle>
            <RecentOrderSecondary>12 phụ kiện PPR &amp; ống 25mm</RecentOrderSecondary>
          </RecentOrderMeta>
          <div>
            <RecentOrderAmount>2.450.000đ</RecentOrderAmount>
            <RecentOrderDate>14/10/2023</RecentOrderDate>
          </div>
          <RecentOrderStatus $variant="processing">Chờ xử lý</RecentOrderStatus>
        </RecentOrderItem>

        <RecentOrderItem>
          <RecentOrderIcon>
            <ThunderboltOutlined />
          </RecentOrderIcon>
          <RecentOrderMeta>
            <RecentOrderTitle>Đơn hàng #ONV-9744</RecentOrderTitle>
            <RecentOrderSecondary>Dây cáp điện CADIVI 4.0mm</RecentOrderSecondary>
          </RecentOrderMeta>
          <div>
            <RecentOrderAmount>5.120.000đ</RecentOrderAmount>
            <RecentOrderDate>08/10/2023</RecentOrderDate>
          </div>
          <RecentOrderStatus $variant="shipping">Đang giao</RecentOrderStatus>
        </RecentOrderItem>

        <RecentOrderItem>
          <RecentOrderIcon>
            <HistoryOutlined />
          </RecentOrderIcon>
          <RecentOrderMeta>
            <RecentOrderTitle>Đơn hàng #ONV-9610</RecentOrderTitle>
            <RecentOrderSecondary>Hệ thống lọc nước đầu nguồn</RecentOrderSecondary>
          </RecentOrderMeta>
          <div>
            <RecentOrderAmount>12.800.000đ</RecentOrderAmount>
            <RecentOrderDate>22/09/2023</RecentOrderDate>
          </div>
          <RecentOrderStatus $variant="completed">Đã hoàn thành</RecentOrderStatus>
        </RecentOrderItem>
      </RecentOrderCard>
    </RecentOrdersSection>
  );
};

export default RecentOrders;
