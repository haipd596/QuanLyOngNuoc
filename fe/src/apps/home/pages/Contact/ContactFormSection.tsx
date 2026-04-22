import { Col, Form, Input, Row } from "antd";
import {
  FormCard,
  Intro,
  SectionTitle,
  SmallNotice,
  SubmitButton,
} from "./styled";

const ContactFormSection = () => {
  return (
    <>
      <SectionTitle>Gửi thắc mắc cho chúng tôi</SectionTitle>
      <Intro>
        Nếu bạn có thắc mắc gì, có thể gửi yêu cầu cho chúng tôi, và chúng tôi
        sẽ liên lạc lại với bạn sớm nhất có thể.
      </Intro>

      <FormCard>
        <Form layout="vertical">
          <Form.Item name="name">
            <Input placeholder="Tên của bạn" />
          </Form.Item>

          <Row gutter={22}>
            <Col span={12}>
              <Form.Item name="email">
                <Input placeholder="Email của bạn" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="phone">
                <Input placeholder="Số điện thoại của bạn" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="message">
            <Input.TextArea
              placeholder="Nội dung"
              autoSize={{ minRows: 7, maxRows: 7 }}
            />
          </Form.Item>
        </Form>

        <SmallNotice>
          This site is protected by reCAPTCHA and the Google{" "}
          <a href="https://policies.google.com/privacy">Privacy Policy</a> and{" "}
          <a href="https://policies.google.com/terms">Terms of Service</a> apply.
        </SmallNotice>

        <SubmitButton type="primary">Gửi cho chúng tôi</SubmitButton>
      </FormCard>
    </>
  );
};

export default ContactFormSection;
