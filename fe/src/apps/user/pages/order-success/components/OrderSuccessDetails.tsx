import { CreditCardOutlined, EnvironmentOutlined } from "@ant-design/icons";
import type { IMyOrder } from "@/apps/user/services";
import { Flex, Skeleton } from "antd";
import {
  DeliveryText,
  MetaLabel,
  MetaValue,
  MiniInfoCard,
  MiniInfoGrid,
  MiniInfoPrimary,
  MiniInfoText,
  MiniInfoTitle,
  OrderCard,
  OrderMeta,
  ProductImage,
  ProductItem,
  ProductMeta,
  ProductName,
  ProductPrice,
  SuccessTag,
} from "../styled";

type Props = {
  order?: IMyOrder;
  loading?: boolean;
};

const formatMoney = (value?: string | number) =>
  `${Number(value || 0).toLocaleString("vi-VN")}đ`;

const resolveImageUrl = (imageUrl?: string) => {
  if (!imageUrl) return "https://via.placeholder.com/200x200?text=Khong+co+anh";
  if (/^https?:\/\//i.test(imageUrl)) return imageUrl;

  const apiBase = import.meta.env.VITE_API_URL as string | undefined;
  if (!apiBase) return imageUrl;

  try {
    const origin = new URL(apiBase).origin;
    return `${origin}${imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`}`;
  } catch {
    return imageUrl;
  }
};

const formatPaymentMethod = (method?: string) => {
  const normalized = String(method || "COD").toUpperCase();
  if (normalized === "BANK_TRANSFER") return "Chuyển khoản ngân hàng";
  return "Thanh toán khi nhận hàng";
};

const OrderSuccessDetails = ({ order, loading }: Props) => {
  if (loading) {
    return <Skeleton active paragraph={{ rows: 10 }} />;
  }

  if (!order) {
    return <OrderCard bordered={false}>Không tìm thấy thông tin đơn hàng.</OrderCard>;
  }

  const deliveryDate = new Date(order.createdAt);

  return (
    <div>
      <OrderCard bordered={false}>
        <OrderMeta>
          <div>
            <MetaLabel>Mã đơn hàng</MetaLabel>
            <MetaValue>#{order.orderCode}</MetaValue>
          </div>
          <div style={{ textAlign: "right" }}>
            <MetaLabel>Ngày đặt</MetaLabel>
            <DeliveryText>{deliveryDate.toLocaleString("vi-VN")}</DeliveryText>
          </div>
        </OrderMeta>

        {(order.items || []).map((item) => {
          const img = resolveImageUrl(
            item.product?.images?.find((i) => i.isMain)?.imageUrl ||
              item.product?.images?.[0]?.imageUrl,
          );

          return (
            <ProductItem key={item.id}>
              <ProductImage src={img} />
              <div>
                <ProductName>{item.product?.name || "Sản phẩm"}</ProductName>
                <ProductMeta>Số lượng: {item.quantity}</ProductMeta>
              </div>
              <ProductPrice>{formatMoney(item.subtotal)}</ProductPrice>
            </ProductItem>
          );
        })}
      </OrderCard>

      <MiniInfoGrid>
        <MiniInfoCard bordered={false}>
          <MiniInfoTitle>Địa chỉ giao hàng</MiniInfoTitle>
          <Flex align="flex-start" gap={10}>
            <EnvironmentOutlined
              style={{ color: "#0b2e59", fontSize: 18, marginTop: 4 }}
            />
            <div>
              <MiniInfoPrimary>{order.customer?.fullName || "Khách hàng"}</MiniInfoPrimary>
              <MiniInfoText>{order.customer?.address || order.guestAddress || "Không có địa chỉ"}</MiniInfoText>
              <MiniInfoText>SĐT: {order.customer?.phone || order.guestPhone || ""}</MiniInfoText>
            </div>
          </Flex>
        </MiniInfoCard>

        <MiniInfoCard bordered={false}>
          <MiniInfoTitle>Phương thức thanh toán</MiniInfoTitle>
          <Flex align="flex-start" gap={10}>
            <CreditCardOutlined
              style={{ color: "#0b2e59", fontSize: 18, marginTop: 4 }}
            />
            <div>
              <MiniInfoPrimary>{formatPaymentMethod(order.paymentMethod)}</MiniInfoPrimary>
              <MiniInfoText>Trạng thái: {order.paymentStatus}</MiniInfoText>
              <SuccessTag>{order.orderStatus}</SuccessTag>
            </div>
          </Flex>
        </MiniInfoCard>
      </MiniInfoGrid>
    </div>
  );
};

export default OrderSuccessDetails;
