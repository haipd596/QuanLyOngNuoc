import { Col, Form, Input, Row } from "antd";
import { SectionCard, SectionTitle, StepBadge, StyledForm } from "../styled";

const ShippingAddressSection = () => {
  return (
    <section>
      <SectionTitle>
        <StepBadge>2</StepBadge>
        Địa chỉ nhận hàng
      </SectionTitle>

      <SectionCard bordered={false}>
        <StyledForm>
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Tỉnh / thành phố"
                name="city"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tỉnh / thành phố",
                  },
                ]}
              >
                <Input placeholder="Nhập tỉnh / thành phố" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Phường / xã"
                name="ward"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập phường / xã",
                  },
                ]}
              >
                <Input placeholder="Nhập phường / xã" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Địa chỉ chi tiết"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ chi tiết",
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="Nhập số nhà, tên đường..."
                  autoSize={{ minRows: 3 }}
                />
              </Form.Item>
            </Col>
          </Row>
        </StyledForm>
      </SectionCard>
    </section>
  );
};

export default ShippingAddressSection;
