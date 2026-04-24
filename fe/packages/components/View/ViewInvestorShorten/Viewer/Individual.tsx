import useValidate from "@packages/hooks/useValidate";
import { Col, Form, Input, Row } from "antd";

export default function Individual({index}:any){
  const {
    RULE_REQUIRED,
    RULE_EMAIL,
    RULES_256_NO_HTML,
    RULE_FAX,
    RULE_PHONE,
    RULE_CCCD_OR_PASSPORT
  } = useValidate();
  return (
    <Row gutter={[16, 0]}>
      <Col span={24}>
        <Form.Item
          name={[index, "TenNhaDauTu"]}
          label="Tên nhà đầu tư"
          rules={[ ...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập tên nhà đầu tư" />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          label="CCCD/Hộ chiếu"
          name={[index, "GiayToPhapLy"]}
          rules={[ ...RULE_REQUIRED, ...RULES_256_NO_HTML, ...RULE_CCCD_OR_PASSPORT ]}
        >
          <Input placeholder="Nhập CCCD/Hộ chiếu"/>
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          name={[index, "SoDienThoai"]}
          label="Số điện thoại"
          rules={[
            ...RULE_REQUIRED,
            ...RULE_PHONE
          ]}
        >
          <Input placeholder="Nhập mã số điện thoại"/>
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          name={[index, "Fax"]}
          label="Fax"
          rules={[ ...RULE_FAX ]}
        >
          <Input placeholder="Nhập số Fax"/>
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          name={[index, "Email"]}
          label="Email"
          rules={[ ...RULE_EMAIL]}
        >
          <Input placeholder="Nhập email"/>
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          name={[index, "DiaChi"]}
          label="Nơi ở hiện tại"
          rules={[ ...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập chỗ ở hiện tại"/>
        </Form.Item>
      </Col>
    </Row>
  )
}
