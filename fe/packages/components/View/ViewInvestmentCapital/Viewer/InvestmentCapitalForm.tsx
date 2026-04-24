import { useValidate } from '@packages/hooks/useValidate';
import { Col, Form, Input, Row } from 'antd';

export default function InvestmentCapitalForm({ index }: { index: number }) {
  const { RULE_REQUIRED, RULES_256_NO_HTML, RULE_NO_HTML } = useValidate();

  return (
    <Row gutter={[10, 0]}>
      <Col span={24}>
        <Form.Item
          name={[index, 'TenNhaDauTu']}
          label="Tên nhà đầu tư"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập tên nhà đầu tư" />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          name={[index, 'VonChuSoHuu']}
          label="Vốn chủ sở hữu"
          rules={[...RULE_REQUIRED, ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập vốn chủ sở hữu" />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          name={[index, 'VonVay']}
          label="Vốn vay"
          rules={[ ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập vốn vay" />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          name={[index, 'LoiNhuanTaiDauTu']}
          label="Lợi nhuận tái đầu tư"
          rules={[ ...RULES_256_NO_HTML]}
        >
          <Input placeholder="Nhập lợi nhuận tái đầu tư" />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          name={[index, 'GiaiTrinhCamKet']}
          label="Giải trình cam kết"
          rules={[ ...RULE_NO_HTML]}
        >
          <Input.TextArea rows={3} placeholder="Nhập giải trình cam kết" />
        </Form.Item>
      </Col>
    </Row>
  );
}
