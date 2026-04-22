import { CreditCardOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Flex } from "antd";
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

const OrderSuccessDetails = () => {
  return (
    <div>
      <OrderCard bordered={false}>
        <OrderMeta>
          <div>
            <MetaLabel>Mã đơn hàng</MetaLabel>
            <MetaValue>#ONV-2024-98562</MetaValue>
          </div>
          <div style={{ textAlign: "right" }}>
            <MetaLabel>Dự kiến giao hàng</MetaLabel>
            <DeliveryText>Thứ 4, 15 Tháng 5, 2024</DeliveryText>
          </div>
        </OrderMeta>

        <ProductItem>
          <ProductImage src="https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=200&q=80" />
          <div>
            <ProductName>Ống Nhựa HDPE Tiền Phong D25 PN10</ProductName>
            <ProductMeta>Số lượng: 50 Mét</ProductMeta>
          </div>
          <ProductPrice>2.750.000đ</ProductPrice>
        </ProductItem>

        <ProductItem>
          <ProductImage src="https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=200&q=80" />
          <div>
            <ProductName>Van Bi Đồng Minh Hòa Miha DN20</ProductName>
            <ProductMeta>Số lượng: 05 Cái</ProductMeta>
          </div>
          <ProductPrice>825.000đ</ProductPrice>
        </ProductItem>
      </OrderCard>

      <MiniInfoGrid>
        <MiniInfoCard bordered={false}>
          <MiniInfoTitle>Địa chỉ giao hàng</MiniInfoTitle>
          <Flex align="flex-start" gap={10}>
            <EnvironmentOutlined
              style={{ color: "#0b2e59", fontSize: 18, marginTop: 4 }}
            />
            <div>
              <MiniInfoPrimary>Nguyễn Văn An</MiniInfoPrimary>
              <MiniInfoText>
                123 Đường Công Nghệ, Phường 4, Quận Tân Bình, TP. Hồ Chí Minh
              </MiniInfoText>
              <MiniInfoText>SĐT: 090 * * * 1234</MiniInfoText>
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
              <MiniInfoPrimary>Chuyển khoản ngân hàng</MiniInfoPrimary>
              <MiniInfoText>Techcombank - 1903...241</MiniInfoText>
              <SuccessTag>Đã xác nhận</SuccessTag>
            </div>
          </Flex>
        </MiniInfoCard>
      </MiniInfoGrid>
    </div>
  );
};

export default OrderSuccessDetails;
