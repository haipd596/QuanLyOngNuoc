import { Modal } from 'antd';

import TabWarehouse from './Components/TabWarehouse';
import './styles.scss';

type ModalSelectFilePDFType = {
  isOpen: boolean;
  onCancel: () => void;
  onOk: () => void;
  onDownloadFile: (data: any) => void;
};

export const ModalSelectFilePDF:React.FC<ModalSelectFilePDFType> = (props) => {
  const {
    isOpen, onCancel, onOk, onDownloadFile,
  } = props;

  return (
    <Modal
      open={isOpen}
      onCancel={onCancel}
      onOk={onOk}
      width={630}
      height="80vh"
      rootClassName="modal-select-images theme-dvc"
      title="Tìm kiếm giấy tờ"
      
      footer={null}
    >
      <TabWarehouse onDownloadFile={onDownloadFile} />
    </Modal>
  );
};
