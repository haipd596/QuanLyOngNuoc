import {
  CalendarOutlined,
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Col, DatePicker, Form, Input, Row } from "antd";
import type { FormInstance } from "antd";
import {
  CardHeader,
  CardHeading,
  IconBadge,
  ProfileCard,
  SaveButton,
  SectionDescription,
  SectionTitle,
  StyledFormWrap,
} from "../styled";

interface ProfileBasicFormProps {
  form: FormInstance;
}

const ProfileBasicForm = ({ form }: ProfileBasicFormProps) => {
  return (
    <ProfileCard bordered={false}>
      <CardHeader>
        <CardHeading>
          <IconBadge>
            <EditOutlined />
          </IconBadge>
          <div>
            <SectionTitle>Hồ sơ cơ bản</SectionTitle>
            <SectionDescription>
              Thông tin chính dùng cho tài khoản của bạn
            </SectionDescription>
          </div>
        </CardHeading>
      </CardHeader>

      <StyledFormWrap>
        <Form form={form} layout="vertical">
          <Row gutter={[24, 8]}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Họ và tên"
                name="fullName"
                rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
              >
                <Input
                  size="large"
                  prefix={<UserOutlined />}
                  placeholder="Nhập họ và tên"
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Địa chỉ email"
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email" },
                  { type: "email", message: "Email không hợp lệ" },
                ]}
              >
                <Input
                  size="large"
                  prefix={<MailOutlined />}
                  placeholder="Nhập địa chỉ email"
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
              >
                <Input
                  size="large"
                  prefix={<PhoneOutlined />}
                  placeholder="Nhập số điện thoại"
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Ngày sinh" name="dateOfBirth">
                <DatePicker
                  size="large"
                  style={{ width: "100%" }}
                  placeholder="Chọn ngày sinh"
                  format="DD/MM/YYYY"
                  suffixIcon={<CalendarOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>

          <SaveButton type="primary" htmlType="submit">
            Lưu thay đổi
          </SaveButton>
        </Form>
      </StyledFormWrap>
    </ProfileCard>
  );
};

export default ProfileBasicForm;
