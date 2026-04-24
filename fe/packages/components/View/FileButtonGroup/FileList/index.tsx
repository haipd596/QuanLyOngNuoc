import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import PreviewPdf from '@packages/components/PreviewPdf';
import { getWebAbsoluteUrlPageContext } from '@packages/utils/common';
import { buildUrlDownload } from '@packages/utils/images';
import {
  Button, Flex, Modal, Tooltip,
} from 'antd';
import { useState } from 'react';

type TFileItemProps = {
  name: string,
  filedId: string,
  onRemove: (filedId: string) => void,
  isShowDownload?: boolean,
  previewFile?: undefined
};

const FileItem = ({
  name, onRemove, filedId, isShowDownload, previewFile,
}: TFileItemProps) => {
  const hiddenWebExtendUrl = getWebAbsoluteUrlPageContext();
  const [isShowPreview, setIsShowPreview] = useState(false);
  const downloadUrl = buildUrlDownload({ url: hiddenWebExtendUrl, fileId: filedId });

  const handlePreview = (e: any) => {
    e.stopPropagation();
    setIsShowPreview(true);
  };

  return (
    <Flex wrap>
      <Tooltip title={name}>
        <div style={{
          whiteSpace: 'nowrap', maxWidth: 'calc(100% - 42px)', overflow: 'hidden', textOverflow: 'ellipsis',
        }}
        >
          {isShowDownload ? (
            <a href={downloadUrl}>{name}</a>
          ) : name}
        </div>
      </Tooltip>
      {
        previewFile && (
          <Tooltip title="Xem chi tiết"> 
            <div style={{ display: 'inline-block', padding: '0 2px', cursor: 'pointer' }} onClick={handlePreview}><EyeOutlined /></div>
          </Tooltip>
        )
      }
      <Tooltip title="Xóa">
        <DeleteOutlined onClick={() => onRemove(filedId)} className="hidden-in-details" />
      </Tooltip>
      {previewFile && (
        <Modal
          open={isShowPreview}
          onCancel={() => setIsShowPreview(false)}
          width="50vw"
          
          footer={(
            <Button onClick={() => setIsShowPreview(false)}>
              Đóng
            </Button>
          )}
        >
          <PreviewPdf url={previewFile} />
        </Modal>
      )}
    </Flex>
  );
};

export default FileItem;
