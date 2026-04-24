import {
  Button, Col, Flex, Modal, Row,
} from 'antd';

import { IDocumentModal } from '../../type';
import './styles.scss';

const DocumentModal: React.FC<IDocumentModal> = (props) => {
  const {
    isOpen, onCancel, onOk, children,
  } = props;

  return (
    <Modal
      className="wrapper-modal-document"
      width="55%"
      title={(
        <Row gutter={[0, 10]}>
          <Col span={24}>
            <p>Tờ khai điện tử</p>
          </Col>
          <Col span={8} offset={8}>
            <Flex gap={5}>
              <Button type="primary" block>Tải mẫu giấy tờ khai</Button>
              <Button type="primary" block> Xuất tờ khai</Button>
            </Flex>
          </Col>
        </Row>
    )}
      open={isOpen}
      onCancel={onCancel}
      onOk={onOk}
      footer={(
        <Row justify="center" gutter={[10, 0]}>
          <Col span={4}>
            <Button block type="primary" onClick={onCancel}>Đóng</Button>
          </Col>
          <Col span={4}>
            <Button block>Tiếp tục</Button>
          </Col>
        </Row>
      )}
    >
      {children}
    </Modal>
  );
};

export default DocumentModal;
