import {
  Checkbox, Col, Form, Row, Input,
} from 'antd';
import _ from 'lodash';

import { ICheckBoxInput } from '../type';

const WrapperCardBuilder:React.FC<ICheckBoxInput> = (props) => {
  const { options } = props;

  if (!_.isArray(options)) return <div>Options not found!</div>;

  return (
    <Checkbox.Group style={{ width: '100%' }} disabled>
      <Row justify="space-between" gutter={[25, 25]}>
        {options.map(({ value, key }, index) => (
          <Col key={index} xl={12} md={24} sm={24} xs={24}>
            <Row justify="start" align="top" style={{ height: 60 }}>
              <Col flex="25px">
                <Form.Item>
                  <Checkbox />
                </Form.Item>
              </Col>
              <Col flex="auto">
                <Form.Item name={key} initialValue={value}>
                  <Input.TextArea autoSize={{ minRows: 2, maxRows: 2 }} disabled />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
    </Checkbox.Group>
  );
};

export default WrapperCardBuilder;
