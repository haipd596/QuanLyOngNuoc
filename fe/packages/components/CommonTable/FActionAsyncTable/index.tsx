import { EyeOutlined } from '@ant-design/icons';
import _get from 'lodash/get';
import React from 'react';
import DownloadFileUrl from '../DownloadFileUrl';
import SaveFileToStorage from '../SaveFileToStorage';

type FActionAsyncTableType = {
  record: any;
  onClick: () => void;
};

const FActionAsyncTable:React.FC<FActionAsyncTableType> = (props) => {
  const { record, onClick } = props;

  if (record.isSubForm) {
    const fileOjectId = _get(record, 'file.fileNodeObject.0.NodeId', '');
    if (fileOjectId) {
      return (
        <div>
          <div style={{ position: 'relative' }}>
            <DownloadFileUrl fileId={fileOjectId} />
            <EyeOutlined
              style={{
                position: 'absolute', top: '50%', transform: 'translate(50%, -50%)', cursor: 'pointer',
              }}
              onClick={onClick}
            />
          </div>
          <SaveFileToStorage file={record?.file?.fileNodeObject} />
        </div>
      );
    }
    return null;
  }

  const fileId = _get(record, 'file.0.NodeId', '');
  if (fileId) {
    return (
      <>
        <DownloadFileUrl fileId={fileId} />
        <SaveFileToStorage file={record?.file} />
      </>
    );
  }

  return null;
};

export default FActionAsyncTable;
