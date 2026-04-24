import {
  Button, Col, Form, FormProps, Input, message, Row,
} from 'antd';
import React from 'react';
import { listkeyCty, listkeyPerson } from './constant';
import './styles.scss';

type FieldType = {
  ENTERPRISE_ID: string;
  NAME: string;
  ENTERPRISE_GDT_CODE: string;
  IMP_BUSINESS_CODE: string;
  SHORT_NAME: string;
  NAME_F: string;
  ENTERPRISE_TYPE_NAME: string;
  FOUNDING_DATE: string;
  AddressFullText: string;
  CityName: string;
  DistrictName: string;
  ENTERPRISE_STATUS: string;
  WardName: string;
  LEGAL_NAMES: string;
  CAPITAL_AMOUNT: string;
};

type TProps = {
  initValue: FieldType;
  onFinish: FormProps<FieldType>['onFinish'];
  onCancel: () => void;
  type: 1 | 0; // 1 is person, 0 is organization
};

function FrmGetOrganizationInfo(props: TProps) {
  const {
    initValue, onFinish, onCancel, type,
  } = props;

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    message.error(`Failed: ${errorInfo}`);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 9 }}
      wrapperCol={{ span: 15 }}
      initialValues={initValue}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="frmGetOrganizationInfoRequest"
    >
      <Row
        className="wrapper-"
        justify="space-between"
        align="middle"
        gutter={[10, 10]}
      >
        {(type ? listkeyPerson : listkeyCty).map((item) => (
          <Col xl={12} md={12} xs={24} key={`listkeyCty-${item.id}`}>
            <Form.Item<FieldType>
              label={item.key}
              name={item.value as keyof FieldType}
            >
              <Input disabled />
            </Form.Item>
          </Col>
        ))}
      </Row>
      <Row className="f-modal-csdl-quoc-gia__footer" justify="center">
        <Col>
          <Button onClick={onCancel}>Bỏ qua</Button>
          <Button type="primary" htmlType="submit" style={{ marginLeft: 10 }}>
            Đồng ý
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default FrmGetOrganizationInfo;
