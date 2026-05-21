import { Col, Form, Input, Row, notification } from "antd";
import { useState } from "react";
import { createContactMessage } from "@/apps/home/services/api";
import {
  FormCard,
  Intro,
  SectionTitle,
  SmallNotice,
  SubmitButton,
} from "./styled";

type ContactFormValues = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
};

const ContactFormSection = () => {
  const [form] = Form.useForm<ContactFormValues>();
  const [submitting, setSubmitting] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const onSubmit = async (values: ContactFormValues) => {
    try {
      setSubmitting(true);
      const res: any = await createContactMessage(values);
      api.success({
        message: "Thành công",
        description: res?.message || "Gửi liên hệ thành công",
      });
      form.resetFields();
    } catch {
      api.error({
        message: "Thất bại",
        description: "Không thể gửi liên hệ, vui lòng thử lại",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {contextHolder}
      <SectionTitle>Gửi thắc mắc cho chúng tôi</SectionTitle>
      <Intro>
        Nếu bạn có thắc mắc gì, có thể gửi yêu cầu cho chúng tôi, và chúng tôi sẽ liên lạc lại với bạn
        sớm nhất có thể.
      </Intro>

      <FormCard>
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item name="fullName" rules={[{ required: true, message: "Vui lòng nhập tên" }]}>
            <Input placeholder="Tên của bạn" />
          </Form.Item>

          <Row gutter={22}>
            <Col span={12}>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email" },
                  { type: "email", message: "Email không hợp lệ" },
                ]}
              >
                <Input placeholder="Email của bạn" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="phone" rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}>
                <Input placeholder="Số điện thoại của bạn" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="message"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả" },
              { min: 10, message: "Mô tả phải có ít nhất 10 ký tự" },
            ]}
          >
            <Input.TextArea placeholder="Nội dung" autoSize={{ minRows: 7, maxRows: 7 }} />
          </Form.Item>

          <SmallNotice>
            This site is protected by reCAPTCHA and the Google{" "}
            <a href="https://policies.google.com/privacy">Privacy Policy</a> and{" "}
            <a href="https://policies.google.com/terms">Terms of Service</a> apply.
          </SmallNotice>

          <SubmitButton htmlType="submit" type="primary" loading={submitting}>
            Gửi cho chúng tôi
          </SubmitButton>
        </Form>
      </FormCard>
    </>
  );
};

export default ContactFormSection;
