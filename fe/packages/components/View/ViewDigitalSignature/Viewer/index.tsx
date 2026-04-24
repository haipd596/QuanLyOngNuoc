import type { UploadProps } from 'antd';
import {
  Button, message, Space, Upload,
} from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import clsx from 'clsx';
import _flatten from 'lodash/flatten';
import _get from 'lodash/get';
import _isArray from 'lodash/isArray';
import React, { useState } from 'react';

import BaseIconFontAwesome from '@packages/components/BaseIconFontAwesome';
import { ModalSelectFilePDF } from '@packages/components/ModalSelectFilePDF';
import { getWebAbsoluteUrlPageContext } from '@packages/utils/common';
import { buildUrlDownload } from '@packages/utils/images';
import SubmitSignature from '../SubmitSignature';
import { filePDFType, ViewUploadPropsSignature } from '../type';
import './styles.scss';

const ViewerDigitalSignature: React.FC<ViewUploadPropsSignature> = ({
  action, responseKey, buttonContent, buttonType, linkMdm,
  disabled, headers, fileUploadkey, ...rest
}) => {
  const [signatureFile, setSignatureFile] = useState<filePDFType | null>();
  const [isOpen, setIsOpen] = useState(false);
  const hiddenWebExtendUrl = getWebAbsoluteUrlPageContext();

  const uploadProps: UploadProps = {
    ...rest,
    name: fileUploadkey,
    action,
    defaultFileList: rest.value?.map(({ NodeId, FileName }: any) => ({ name: FileName, NodeId, status: 'done' })) || [],
    headers: headers?.reduce((acc : any, cur: any) => {
      acc[cur.key] = cur.value;
      return acc;
    }, {} as AnyObject),

    onChange(info) {
      if (info.file.status !== 'uploading') console.info(info.file, info.fileList);

      if (info.file.status === 'done') {
        const filePDF: any = _flatten(info.fileList.map((file) => {
          const fileUploaded = _get(file, `response.${responseKey}`, '');

          return fileUploaded;
        }));
        if (_isArray(filePDF)) {
          setSignatureFile({
            linkMdm: `${linkMdm?.replace(/\/$/, '')}/${filePDF[0]?.NodeId}`,
            FileName: filePDF[0]?.FileName,
          });
        }

        if (rest.onChange) rest.onChange(filePDF);

        message.success(`${info.file.name} tải file thành công!`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} tải file không thành công!`);
      }
    },
    onRemove(file: any) {
      const newFileList = rest.value?.filter(({ NodeId }: any) => NodeId !== file.NodeId);
      if (rest.onChange) rest.onChange(newFileList);

      return true;
    },
  };

  const handleSelectFile = (values: AnyObject) => {
    const { NodeId, FileName } = values;
    if (NodeId && FileName) {
      setSignatureFile({
        linkMdm: buildUrlDownload({ url: hiddenWebExtendUrl, fileId: NodeId }),
        FileName,
      });
    }
    if (rest.onChange) rest.onChange(values);
    setIsOpen(false);
  };

  return (
    <Space wrap direction="horizontal" align="baseline" className="f-upload-signal-digital">
      <Space wrap align="baseline" className="group-button" size={3}>
        <Upload {...uploadProps} className={clsx(uploadProps.className, 'upload-zone')}>
          <Button
            icon={(
              <BaseIconFontAwesome
                className={`${clsx('fa-solid fa-cloud-arrow-up', 'icon_global_dvc')}`}
              />
            )}
            disabled={disabled}
            type="link"
          >
            Tải tệp lên
          </Button>
        </Upload>
        <Space size={3} align="baseline">
          <ModalSelectFilePDF
            isOpen={isOpen}
            onCancel={() => setIsOpen(false)}
            onOk={() => setIsOpen(false)}
            onDownloadFile={handleSelectFile}
          />
          <Button
            icon={(
              <BaseIconFontAwesome
                className={`${clsx('fa-solid fa-folder-open', 'icon_global_dvc')}`}
              />
            )}
            type="link"
            onClick={() => setIsOpen(true)}
          >
            Chọn tệp
          </Button>
        </Space>
      </Space>
      {
        signatureFile && (
          <SubmitSignature
            {...signatureFile}
            linkMdm={signatureFile?.linkMdm}
            onDeleteFile={() => setSignatureFile(null)}
          />
        )
      }
    </Space>
  );
};

export default ViewerDigitalSignature;
