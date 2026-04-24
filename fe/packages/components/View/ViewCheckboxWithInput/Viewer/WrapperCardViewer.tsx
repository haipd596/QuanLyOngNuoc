/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Col, Form, Row } from 'antd';
import _ from 'lodash';

import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import { useEffect } from 'react';
import { ICheckBoxInput } from '../type';
import FormItemChange from './FormItemChange';

const WrapperCardViewer:React.FC<ICheckBoxInput> = (props) => {
  const { options } = props;
  const form = useFormInstance();

  useEffect(() => {
    form.setFieldsValue(options?.reduce((acc: any, { value, key }) => {
      acc[key] = { content: value, enabled: false };
      return acc;
    }, {}));
  }, [options]);

  if (!_.isArray(options)) return <div>Options not found!</div>;

  return (
    <Row justify="space-between" gutter={[30, 30]}>
      {options.map(({ key }, index) => (
        <Col key={index} xl={12} md={24} sm={24} xs={24}>
          <Form.Item name={key}>
            {/* @ts-ignore */}
            <FormItemChange />
          </Form.Item>
        </Col>
      ))}
    </Row>
  );
};

export default WrapperCardViewer;
