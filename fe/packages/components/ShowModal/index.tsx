import { Modal } from 'antd';
import { ReactNode } from 'react';

interface IShowModal {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  children: ReactNode
}

const ShowModal: React.FC<IShowModal> = (props) => {
  const {
    open, onCancel, onOk, children,
  } = props;

  return (
    <Modal
      title="Click to add control"
      className="modal-add-new-element"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      footer={null}
      styles={{ body: { height: 550, overflow: 'auto' } }}
    >
      {children}
    </Modal>
  );
};

export default ShowModal;
