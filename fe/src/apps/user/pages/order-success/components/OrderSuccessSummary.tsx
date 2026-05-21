import { SafetyCertificateOutlined } from "@ant-design/icons";
import type { IMyOrder } from "@/apps/user/services";
import { Flex } from "antd";
import { HOME_ROUTE } from "@/apps/home/constants";
import { USER_ORDER_PENDING_ROUTE } from "../../../constants";
import {
  PanelDivider,
  PrimaryAction,
  SecondaryAction,
  SummaryPanel,
  SummaryRow,
  SummaryTitle,
  SummaryTotal,
  SummaryTotalPrice,
  WarrantyNote,
} from "../styled";

type Props = {
  order?: IMyOrder;
};

const formatMoney = (value?: string | number) =>
  `${Number(value || 0).toLocaleString("vi-VN")}đ`;

const OrderSuccessSummary = ({ order }: Props) => {
  const subtotal = Number(order?.totalAmount || 0);
  const shippingFee = Number(order?.shippingFee || 0);
  const discount = Number(order?.discountAmount || 0);
  const total = Number(order?.finalAmount || 0);

  return (
    <SummaryPanel bordered={false}>
      <SummaryTitle>Tổng kết chi phí</SummaryTitle>
      <SummaryRow>
        <span>Tạm tính</span>
        <span>{formatMoney(subtotal)}</span>
      </SummaryRow>
      <SummaryRow>
        <span>Phí vận chuyển</span>
        <span>{formatMoney(shippingFee)}</span>
      </SummaryRow>
      <SummaryRow>
        <span>Giảm giá</span>
        <span>-{formatMoney(discount)}</span>
      </SummaryRow>
      <SummaryTotal>
        <span>Tổng cộng</span>
        <SummaryTotalPrice>{formatMoney(total)}</SummaryTotalPrice>
      </SummaryTotal>

      <PrimaryAction block href={USER_ORDER_PENDING_ROUTE}>
        Theo dõi đơn hàng
      </PrimaryAction>
      <SecondaryAction block href={HOME_ROUTE}>
        Tiếp tục mua sắm
      </SecondaryAction>

      <PanelDivider />
      <Flex align="flex-start" gap={10}>
        <SafetyCertificateOutlined
          style={{ color: "#fff", fontSize: 18, marginTop: 2 }}
        />
        <WarrantyNote>
          Sản phẩm chính hãng 100%. Bảo hành theo tiêu chuẩn nhà sản xuất.
        </WarrantyNote>
      </Flex>
    </SummaryPanel>
  );
};

export default OrderSuccessSummary;
