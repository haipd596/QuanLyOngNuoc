import { configLocale } from '@packages/utils';
import {
  Col, DatePicker, Form, Input, Row,
} from 'antd';

const ThreadCertificate2 = () => {
  return (
    <div className="wrapper-thread-certificate">
      <Row justify="space-between" gutter={[15, 0]}>
        <Col span={12}>
          <Form.Item colon={false} label="2.1. Sổ vào cấp GCN" name="name">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item colon={false} label="2.2. Sổ phát hành GCN" name="name">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item colon={false} label="2.3. Ngày cấp GCN" name="date">
        <DatePicker locale={configLocale} placeholder="Chọn ngày cấp..." />
      </Form.Item>
      <Form.Item colon={false} label="2.3. Địa chỉ thửa đất" name="date">
        <Input />
      </Form.Item>
    </div>
  );
};

export default ThreadCertificate2;
