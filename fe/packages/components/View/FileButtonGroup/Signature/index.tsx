/* eslint-disable no-eval */
import BaseIconFontAwesome from '@packages/components/BaseIconFontAwesome';
import { getWebAbsoluteUrlPageContext } from '@packages/utils/common';
import { buildUrlDownload } from '@packages/utils/images';
import { Button, message, Space, Tooltip } from 'antd';
import clsx from 'clsx';
import React, { useState } from 'react';
import SignatureProcess from '../SignatureProcess';

type TSignatureProps = {
  onDelete?: () => void,
  onSigned: (file: any) => void,
  file: any,
  indexFile?: number
  originalFile?: any;
  targetFieldKey?: string;
};

const Signature = ({ file, onSigned, indexFile, targetFieldKey }: TSignatureProps) => {
  const hiddenWebExtendUrl = getWebAbsoluteUrlPageContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleVerifySignedFile = () => {
    try {
      eval(`callbackVerify(${JSON.stringify(file)})`);
    } catch (error) {
      console.error('handleVerifySignedFile', error);
      message.error('Xác thực lỗi');
    }
  };

  const handleSignUsbToken = () => {
    try {
      console.info("signUsbToken function called")
      if (typeof (window as any).signUsbToken === 'function') {
        (window as any).signUsbToken(file, indexFile, targetFieldKey);
      } else {
        throw new Error('signUsbToken is not defined');
      }
    } catch (error) {
      console.error('handleSignUsbToken', error);
      message.error('Ký số bằng USB Token thất bại');
    }
  };

  const handleSigned = (_file: any) => {
    _file.signed = true;
    onSigned(_file);
  };

  const handleSignFile = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <a
        href={buildUrlDownload({ url: hiddenWebExtendUrl, fileId: file.NodeId })}
        title={file.FileName}
        download
      >
        <Space size={3}>
          <BaseIconFontAwesome
            className={`${clsx('fa-solid fa-cloud-arrow-down', 'icon_global_dvc')}`}
          />
          <span>Tải tệp</span>
        </Space>
      </a>
      {/* <Button
        type="link"
        icon={(
          <BaseIconFontAwesome
            className={`${clsx('fa-solid fa-trash', 'icon_global_dvc')}`}
          />
      )}
        onClick={onDelete}
      >
        Xóa tệp
      </Button> */}
      <Tooltip title="Ký số từ xa">
        <Button
          type="link"
          icon={(
            <BaseIconFontAwesome
              className={`${clsx('fa-regular fa-file-signature', 'icon_global_dvc')}`}
            />
        )}
          onClick={handleSignFile}
        >
          Ký Remote
        </Button>
      </Tooltip>

      <Tooltip title="Ký số bằng usb token">
        <Button
          type="link"
          icon={(
            <BaseIconFontAwesome
              className={`${clsx('fa-regular fa-file-signature', 'icon_global_dvc')}`}
            />
          )}
          onClick={handleSignUsbToken}
        >
          Ký Usb Token
        </Button>
      </Tooltip>
      {file.signed && (
        <Button
          type="link"
          icon={(
            <BaseIconFontAwesome
              className={`${clsx('fa-solid fa-check', 'icon_global_dvc')}`}
            />
          )}
          onClick={handleVerifySignedFile}
        >
          Xác thực
        </Button>
      )}
      {
        isOpen && (
          <SignatureProcess
            setIsOpen={setIsOpen}
            open={isOpen}
            file={file}
            onSuccess={handleSigned}
          />
        )
      }
    </div>
  );
};

export default Signature;
