import { FileTextOutlined, PhoneOutlined } from "@ant-design/icons";
import { ActionButton, HeaderActions, HeaderRow, HeaderText, OrderSubtext, OrderTitle, SupportButton } from "../styled";

interface OrderHeaderProps {
  orderNumber: string;
  orderDate: string;
  orderTime: string;
}

const OrderHeader = ({ orderNumber, orderDate, orderTime }: OrderHeaderProps) => {
  return (
    <HeaderRow>
      <HeaderText>
        <OrderTitle>Đơn hàng #{orderNumber}</OrderTitle>
        <OrderSubtext>Đặt ngày {orderDate} • {orderTime}</OrderSubtext>
      </HeaderText>

      <HeaderActions>
        <ActionButton icon={<FileTextOutlined />}>In hóa đơn</ActionButton>
        <SupportButton type="primary" icon={<PhoneOutlined />}>
          Hỗ trợ kỹ thuật
        </SupportButton>
      </HeaderActions>
    </HeaderRow>
  );
};

export default OrderHeader;
