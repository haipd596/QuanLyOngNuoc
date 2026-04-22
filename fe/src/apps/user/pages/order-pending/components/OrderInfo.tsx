import { Space } from "antd";
import { InfoCard, InfoLabel, InfoText, InfoTitle, NoteText } from "../styled";

interface OrderInfoProps {
  recipientName: string;
  phone: string;
  address: string;
  note: string;
}

const OrderInfo = ({ recipientName, phone, address, note }: OrderInfoProps) => {
  return (
    <InfoCard bordered={false}>
      <Space direction="vertical" size={12} style={{ width: "100%" }}>
        <InfoTitle>Thông tin nhận hàng</InfoTitle>
        <div>
          <InfoLabel>Người nhận</InfoLabel>
          <InfoText>{recipientName}</InfoText>
        </div>
        <div>
          <InfoLabel>Số điện thoại</InfoLabel>
          <InfoText>{phone}</InfoText>
        </div>
        <div>
          <InfoLabel>Địa chỉ giao hàng</InfoLabel>
          <InfoText>{address}</InfoText>
        </div>
        <div>
          <InfoLabel>Ghi chú giao hàng</InfoLabel>
          <NoteText>{note}</NoteText>
        </div>
      </Space>
    </InfoCard>
  );
};

export default OrderInfo;
