import {
  Button, Col, Form, Input, Row,
} from 'antd';

const InputSearchBuilder:React.FC = () => {
  return (
    <Form>
      <Row justify="space-between">
        <Col flex="auto">
          <Form.Item
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col flex="100px">
          <Form.Item>
            <Button type="primary">
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default InputSearchBuilder;
