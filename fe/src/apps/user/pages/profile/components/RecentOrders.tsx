import { GiftOutlined, InboxOutlined } from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";
import { ORDER_STATUS_LABEL_MAP } from "@/apps/admin/constants/status";
import { USER_ORDER_PENDING_ROUTE } from "@/apps/user/constants";
import { useMyOrdersQuery } from "@/apps/user/services";
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

const formatCurrency = (v: string | number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(Number(v || 0));

const toStatusVariant = (status?: string): "processing" | "shipping" | "completed" => {
  if (status === "COMPLETED") return "completed";
  if (status === "SHIPPED") return "shipping";
  return "processing";
};

const RecentOrders = () => {
  const navigate = useNavigate();
  const { data: ordersRes } = useMyOrdersQuery({ Page: 1, PageSize: 5 });
  const orders = ordersRes?.data || [];

  return (
    <RecentOrdersSection>
      <RecentOrderHeader>
        <CardHeading>
          <IconBadge>
            <InboxOutlined />
          </IconBadge>
          <SectionTitle>Đơn hàng gần đây</SectionTitle>
        </CardHeading>

        <RecentOrderAction
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate({ to: USER_ORDER_PENDING_ROUTE });
          }}
        >
          Xem tất cả lịch sử
        </RecentOrderAction>
      </RecentOrderHeader>

      <RecentOrderCard>
        {orders.length === 0 ? (
          <RecentOrderItem>
            <RecentOrderMeta>
              <RecentOrderTitle>Chưa có đơn hàng</RecentOrderTitle>
              <RecentOrderSecondary>Bạn chưa phát sinh đơn hàng nào.</RecentOrderSecondary>
            </RecentOrderMeta>
          </RecentOrderItem>
        ) : (
          orders.map((order) => {
            const firstItem = order.items?.[0];
            const moreCount = Math.max((order.items?.length || 1) - 1, 0);

            return (
              <RecentOrderItem key={order.id}>
                <RecentOrderIcon>
                  <GiftOutlined />
                </RecentOrderIcon>
                <RecentOrderMeta>
                  <RecentOrderTitle>Đơn hàng #{order.orderCode}</RecentOrderTitle>
                  <RecentOrderSecondary>
                    {firstItem?.product?.name || "Sản phẩm"}
                    {moreCount > 0 ? ` +${moreCount} sản phẩm khác` : ""}
                  </RecentOrderSecondary>
                </RecentOrderMeta>
                <div>
                  <RecentOrderAmount>{formatCurrency(order.finalAmount || 0)}</RecentOrderAmount>
                  <RecentOrderDate>{new Date(order.createdAt).toLocaleString("vi-VN")}</RecentOrderDate>
                </div>
                <RecentOrderStatus $variant={toStatusVariant(order.orderStatus)}>
                  {ORDER_STATUS_LABEL_MAP[order.orderStatus] || order.orderStatus}
                </RecentOrderStatus>
              </RecentOrderItem>
            );
          })
        )}
      </RecentOrderCard>
    </RecentOrdersSection>
  );
};

export default RecentOrders;
