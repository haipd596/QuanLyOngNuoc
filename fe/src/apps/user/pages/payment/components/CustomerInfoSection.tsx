import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row } from "antd";
import { useEffect } from "react";

import { useMyProfileQuery } from "@/apps/user/services";

import { SectionCard, SectionTitle, StepBadge, StyledForm } from "../styled";

const CustomerInfoSection = () => {
  const form = Form.useFormInstance();
  const { data } = useMyProfileQuery();

  useEffect(() => {
    const profile = data?.data;

    if (!profile) return;

    form.setFieldsValue({
      fullName: profile.fullName,
      phone: profile.phone,
      email: profile.email,
    });
  }, [data, form]);

  return (
    <section>
      <SectionTitle>
        <StepBadge>1</StepBadge>
        Thông tin khách hàng
      </SectionTitle>

      <SectionCard bordered={false}>
        <StyledForm>
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Họ và tên"
                name="fullName"
                rules={[
                  { required: true, message: "Vui lòng nhập họ và tên" },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Nhập họ và tên"
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại" },
                  {
                    pattern: /^0\d{9}$/,
                    message: "Số điện thoại không hợp lệ",
                  },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined />}
                  placeholder="Nhập số điện thoại"
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { type: "email", message: "Email không hợp lệ" },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Nhập email"
                />
              </Form.Item>
            </Col>
          </Row>
        </StyledForm>
      </SectionCard>
    </section>
  );
};

export default CustomerInfoSection;
