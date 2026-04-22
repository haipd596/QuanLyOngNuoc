import { SafetyCertificateOutlined } from "@ant-design/icons";
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

const OrderSuccessSummary = () => {
  return (
    <SummaryPanel bordered={false}>
      <SummaryTitle>Tổng kết chi phí</SummaryTitle>
      <SummaryRow>
        <span>Tạm tính</span>
        <span>3.575.000đ</span>
      </SummaryRow>
      <SummaryRow>
        <span>Phí vận chuyển</span>
        <span>45.000đ</span>
      </SummaryRow>
      <SummaryRow>
        <span>Thuế (VAT 8%)</span>
        <span>286.000đ</span>
      </SummaryRow>
      <SummaryTotal>
        <span>Tổng cộng</span>
        <SummaryTotalPrice>3.906.000đ</SummaryTotalPrice>
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
