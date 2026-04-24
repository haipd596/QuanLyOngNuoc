import { EyeOutlined } from '@ant-design/icons';
import { getWebAbsoluteUrlPageContext } from '@packages/utils/common';
import { buildPreviewFile } from '@packages/utils/images';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import './style.scss';

type IPreviewDocument = {
  nodeId?: string
};

const PreviewDocument:React.FC<IPreviewDocument> = (props) => {
  const { nodeId } = props;
  const hiddenWebExtendUrl = getWebAbsoluteUrlPageContext();
  const [preview, setPreview] = useState<boolean>(false);

  return (
    <>
      <Button
        type="link"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setPreview(true);
        }}
        onMouseDown={(e) => e.stopPropagation()}
        icon={<EyeOutlined style={{ color: '#6a6868' }} />}
        className="btn-delete-attachment"
      />
      <Modal
        open={preview}
        width="90%"
        footer={null}
        style={{ top: 30 }}
        onCancel={() => setPreview(false)}
        wrapClassName="modal-preview-document"
      >
        <iframe
          src={buildPreviewFile({ url: hiddenWebExtendUrl, fileId: nodeId })}
          width="100%"
          title="Iframe Example"
          style={{ height: '85vh' }}
        />
      </Modal>
    </>
  );
};

export default PreviewDocument;
