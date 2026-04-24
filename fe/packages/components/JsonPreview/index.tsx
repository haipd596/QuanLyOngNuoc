import {
  Button, Modal,
} from 'antd';
import React, { CSSProperties, useState } from 'react';
import { AnyObject } from 'antd/es/_util/type';
import { ExpandOutlined } from '@ant-design/icons';

type ViewPreviewProps = {
  data: AnyObject;
};

const JsonPreview: React.FC<ViewPreviewProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggle = React.useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const preStyle : CSSProperties = { overflowX: 'auto', overflowY: 'auto', maxHeight: 500 };
  const smallPreStyle : CSSProperties = { ...preStyle, maxHeight: 200 };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Button icon={<ExpandOutlined />} onClick={toggle} />
      </div>
      <Modal title="Preview data" open={isModalOpen} onOk={handleModal} onCancel={handleModal} width={1200}>
        <pre style={preStyle}>
          {JSON.stringify(data, null, 2)}
        </pre>
      </Modal>
      <pre style={smallPreStyle}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default JsonPreview;
