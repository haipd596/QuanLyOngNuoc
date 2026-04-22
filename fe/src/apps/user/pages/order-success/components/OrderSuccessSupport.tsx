import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import {
  SupportCard,
  SupportContact,
  SupportContactLabel,
  SupportContactValue,
  SupportContacts,
  SupportDescription,
  SupportHeading,
  SupportIcon,
  SupportText,
} from "../styled";

const OrderSuccessSupport = () => {
  return (
    <SupportCard bordered={false}>
      <SupportText>
        <SupportHeading>Cần hỗ trợ kỹ thuật?</SupportHeading>
        <SupportDescription>
          Nếu bạn có bất kỳ thắc mắc nào về thông số kỹ thuật hoặc cách lắp đặt,
          đội ngũ kỹ sư của chúng tôi luôn sẵn sàng hỗ trợ.
        </SupportDescription>
      </SupportText>

      <SupportContacts>
        <SupportContact>
          <SupportIcon>
            <PhoneOutlined />
          </SupportIcon>
          <div>
            <SupportContactLabel>Hotline 24/7</SupportContactLabel>
            <SupportContactValue>1900 8888</SupportContactValue>
          </div>
        </SupportContact>

        <SupportContact>
          <SupportIcon>
            <MailOutlined />
          </SupportIcon>
          <div>
            <SupportContactLabel>Email hỗ trợ</SupportContactLabel>
            <SupportContactValue>kythuat@ongnuocviet.vn</SupportContactValue>
          </div>
        </SupportContact>
      </SupportContacts>
    </SupportCard>
  );
};

export default OrderSuccessSupport;
