import {
  CalendarOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import {
  IconCircle,
  InfoCard,
  InfoGrid,
  InfoText,
  InfoTitle,
} from "./styled";

const ContactInfo = () => {
  return (
    <InfoGrid>
      <InfoCard>
        <IconCircle>
          <EnvironmentOutlined />
        </IconCircle>
        <div>
          <InfoTitle>Địa chỉ</InfoTitle>
          <InfoText>54 Triều Khúc, Thanh Xuân, Hà Nội</InfoText>
        </div>
      </InfoCard>

      <InfoCard>
        <IconCircle>
          <CalendarOutlined />
        </IconCircle>
        <div>
          <InfoTitle>Thời gian làm việc</InfoTitle>
          <InfoText>Thứ 2 đến Thứ 6: từ 8h đến 17h</InfoText>
          <InfoText>Thứ 7: từ 8h00 đến 11h30</InfoText>
        </div>
      </InfoCard>

      <InfoCard>
        <IconCircle>
          <PhoneOutlined />
        </IconCircle>
        <div>
          <InfoTitle>Điện thoại</InfoTitle>
          <InfoText>0843.490.333</InfoText>
        </div>
      </InfoCard>

      <InfoCard>
        <IconCircle>
          <MailOutlined />
        </IconCircle>
        <div>
          <InfoTitle>Email</InfoTitle>
          <InfoText>cskh.ovu@gmail.com</InfoText>
        </div>
      </InfoCard>
    </InfoGrid>
  );
};

export default ContactInfo;
