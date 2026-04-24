import { FastBackwardOutlined } from '@ant-design/icons';
import { useAddress } from '@packages/components/FAddress/hooks';
import {
  Button, Col, Form, FormInstance, Input, Modal, Row,
} from 'antd';
import { useRef, useState } from 'react';
import './styles.scss';

import { addressString } from '../../addressString';
import { SelectAddressType } from '../../type';
import FormAddress from './FormAddress';

const SelectAddress: React.FC<SelectAddressType> = ({ name }) => {
  const [address] = useAddress(null, true);
  const [isOpen, setIsOpen] = useState(false);
  const [strAddress, setStrAddress] = useState<string>('');
  const useRefSubmit = useRef<FormInstance>(null);

  const onUpdate = async () => {
    const dataForm = await useRefSubmit.current?.validateFields();
    if (dataForm) {
      const str = addressString(dataForm, address);
      setStrAddress(str);
      setIsOpen(false);
    }
  };

  return (
    <div>
      <Modal
        width="43%"
        className="wrapper-select-address"
        title={<h3>Thông tin địa chỉ</h3>}
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onOk={() => setIsOpen(false)}
        footer={(
          <Row justify="center" gutter={[10, 0]}>
            <Col span={4}>
              <Button block type="primary" onClick={onUpdate}>Cập nhật</Button>
            </Col>
            <Col span={4}>
              <Button
                block
                icon={<FastBackwardOutlined />}
                onClick={() => setIsOpen(false)}
              >
                Hủy Bỏ
              </Button>
            </Col>
          </Row>
        )}
      >
        <FormAddress ref={useRefSubmit} />
      </Modal>
      <Form.Item
        name={name}
        label="Địa chỉ thường trú"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin bắt buộc' }]}
      >
        <Input onClick={() => setIsOpen(true)} value={strAddress} />
      </Form.Item>
    </div>
  );
};

export default SelectAddress;
