import BaseIconFontAwesome from '@packages/components/BaseIconFontAwesome';
import { getBaseDvcApi } from '@packages/dvc-service/getBaseUrl';
import {
  Button, message, Space,
} from 'antd';
import clsx from 'clsx';
import _isEmpty from 'lodash/isEmpty';
import { useState } from 'react';
import { SubmitSignatureType, TSignatureResult } from './type';

const SubmitSignature:React.FC<SubmitSignatureType> = (props) => {
  const {
    FileName, linkMdm, onDeleteFile,
  } = props;
  const [fileServer, setFileServer] = useState<string>();

  const configJsonPrms = JSON.stringify({
    FileUploadHandler: `${getBaseDvcApi()}/Pages/FileUploadHandler.aspx`,
    SessionId: '',
    JWTToken: '',
    FileName: linkMdm,
    MetaData: [{ Key: 'fileNameOriginal', Value: FileName }],
  });

  const handleSubmitFile = () => {
    if (_isEmpty(props))message.error('Tên tệp không được để trống!');

    // @ts-expect-error: _spPageContextInfo
    vgca_sign_approved(configJsonPrms, (rv: string) => {
      const result: TSignatureResult = JSON.parse(rv);
      switch (result.Status) {
        case 14:
          message.error(result.Message);
          break;
        case 28:
          message.error(result.Message);
          break;
        case 0:
          setFileServer(result.FileServer);
          message.success('Successfully signed');
          break;
        default:
          break;
      }
    });
  };

  const handleSubmitFileSY = () => {
    if (_isEmpty(props))message.error('Tên tệp không được để trống!');

    // @ts-expect-error: _spPageContextInfo
    vgca_sign_copy(configJsonPrms, (rv: string) => {
      const result: TSignatureResult = JSON.parse(rv);
      switch (result.Status) {
        case 14:
          message.error(result.Message);
          break;
        case 28:
          message.error(result.Message);
          break;
        case 0:
          setFileServer(result.FileServer);
          message.success('Successfully signed');
          break;
        default:
          break;
      }
    });
  };

  const handleDeleteFile = () => {
    onDeleteFile();
    setFileServer('');
  };

  return (
    <Space size={3} wrap align="baseline" className="group-button">
      <a
        href={fileServer || linkMdm}
        title={FileName}
        download
      >
        <Space size={3}>
          <BaseIconFontAwesome
            className={`${clsx('fa-solid fa-cloud-arrow-down', 'icon_global_dvc')}`}
          />
          <span>Tải tệp</span>
        </Space>
      </a>
      <Button
        type="link"
        icon={(
          <BaseIconFontAwesome
            className={`${clsx('fa-solid fa-trash', 'icon_global_dvc')}`}
          />
      )}
        onClick={handleDeleteFile}
      >
        Xóa tệp
      </Button>
      <Button
        type="link"
        icon={(
          <BaseIconFontAwesome
            className={`${clsx('fa-regular fa-file-signature', 'icon_global_dvc')}`}
          />
      )}
        onClick={handleSubmitFile}
      >
        Ký Số
      </Button>
      <Button
        type="link"
        icon={(
          <BaseIconFontAwesome
            className={`${clsx('fa-regular fa-signature', 'icon_global_dvc')}`}
          />
        )}
        onClick={handleSubmitFileSY}
      >
        Ký SY
      </Button>
    </Space>
  );
};

export default SubmitSignature;
