import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
// import DownloadFileUrl from '@packages/components/CommonTable/DownloadFileUrl';
import DownloadImageUrl from '@packages/components/CommonTable/DownloadImageUrl';
import { getSystemParameterByMa } from '@packages/components/SystemParameters/utils';
import { getWebAbsoluteUrlPageContext } from '@packages/utils/common';
import {
  Button, Input, message, Spin, Upload,
} from 'antd';
import { UploadFile, UploadProps } from 'antd/lib';
import axios from 'axios';
import _ from 'lodash';
import _get from 'lodash/get';
import React, { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '~/redux/hooks';
import { selectSystemParameter } from '~/redux/slices';
import { mergeHeaders } from '../../ViewUpload/utils';
import './styles.scss';

const { TextArea } = Input;

export interface InputWithUploadViewerProps {
  value?: { text: string, fileRes: any };
  onChange?: (value: { text: string, fileRes: any }) => void;
  isMultipleUpload?: boolean;
}

type UploadFileProps = UploadFile & { FileName: string };
const InputWithUploadViewer: React.FC<InputWithUploadViewerProps> = ({
  value = {
    text: '',
    fileRes: {},
  },
  onChange,
  isMultipleUpload,
}) => {
  const systemParameters = useAppSelector(selectSystemParameter);
  const WebApiUrl = getSystemParameterByMa(systemParameters, 'WebApiUrl');
  const hiddenWebExtendUrl = getWebAbsoluteUrlPageContext();
  const [isUploading, setIsUploading] = useState(false);
  const [fileUpload, setFileUpload] = useState<UploadFileProps[]>([value.fileRes]);

  const headersWithFileServer = useMemo(() => {
    return mergeHeaders(
      systemParameters,
    );
  }, [systemParameters]);

  const presignedUrl = async () => {
    const res = await axios.get(`${hiddenWebExtendUrl}/_vti_bin/dvcm/CommonServices.svc/presignedUrl`);

    return res.data;
  };

  const presignedUrlPutFileFormData = async (
    formData: any,
    _presignedUrl: any,
  ) => {
    const res = await axios.post(`${WebApiUrl}api/dellecs/presignedUrlPutFileFormData?presignedUrl=${encodeURIComponent(_presignedUrl)}`, formData);

    return res.data;
  };

  const filenametometadata = async (objectKey: any, fileName: any) => {
    const res = await axios.get(`${hiddenWebExtendUrl}/_vti_bin/dvcm/CommonServices.svc/filenametometadata?objectKey=${objectKey}&fileName=${fileName}`);

    return res.data;
  };

  const uploadMdm = async (formData: any) => {
    const resPresigned = await presignedUrl();
    const resPutFile = await presignedUrlPutFileFormData(formData, resPresigned?.PresignedURL);
    const successCode = _get(resPutFile, 'Status');

    // eslint-disable-next-line eqeqeq
    if (successCode != 1) {
      const Message = _get(resPutFile, 'Message', '');

      throw new Error(Message || 'Đã có lỗi xảy ra!');
    }

    if (resPutFile?.Data?.length > 0) {
      await filenametometadata(resPresigned?.ObjectKey, resPutFile?.Data[0]?.FileName);

      return {
        Extension: resPutFile?.Data[0]?.Extension,
        FileName: resPutFile?.Data[0]?.FileName,
        PhysicalName: resPutFile?.Data[0]?.FileName,
        FileSizeInBytes: resPutFile?.Data[0]?.FileSizeInBytes,
        NodeId: resPresigned?.ObjectKey,
      };
    }
    return {};
  };

  const handleTextChange = (e: any) => {
    onChange?.({ ...value, text: e.target.value });
  };

  const handleUploadChange: UploadProps['onChange'] = (info) => {
    let filesInit: any;

    if (info.file.status !== 'uploading') {
      console.info(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      if (onChange) {
        const result = _get(info.fileList[0], 'response.Data[0]');
        setFileUpload(result);
        filesInit = result;
      }
      message.success(`${info.file.name} tải lên thành công`);
    } else if (info.file.status === 'error') {
      if (_.isString(info.file.error?.message)) {
        message.error(info.file.error.message);
        return;
      }
      message.error(`${info.file.name} file upload failed.`);
    }

    if (isMultipleUpload) {
      setFileUpload(info.fileList.map((file: any) => file));
    } else if (info.fileList.length > 0) {
      const customFileName = {
        ...info.fileList.slice(-1)[0],
        FileName: info.fileList.slice(-1)[0].name,
      };
      setFileUpload([customFileName]);
    }

    onChange?.({
      ...value,
      fileRes: filesInit,
    });
  };

  const customRequest = async (options: any) => {
    const {
      onSuccess, onError, file,
    } = options;

    const fmData = new FormData();

    fmData.append('file', file);
    try {
      setIsUploading(true);
      const _file = await uploadMdm(fmData);

      onSuccess({
        Data: [_file],
      });
    } catch (err) {
      onError(err);
    } finally {
      setIsUploading(false);
    }
  };

  const uploadProps: UploadProps = {
    customRequest,
    headers: headersWithFileServer,
    fileList: fileUpload,
    onChange: handleUploadChange,
    showUploadList: false,
    multiple: isMultipleUpload,
  };

  const renderFileList = useMemo(() => {
    const getImg = _get(fileUpload[0], 'response.Data[0].NodeId');

    return (
      <div className="file_list">
        {fileUpload.length > 0 && fileUpload.map((file) => {
          return file.FileName ? (
            <div
              key={file.uid}
            >
              <DownloadImageUrl fileId={getImg}>
                {file.FileName}
              </DownloadImageUrl>
              <Button
                type="link"
                danger
                onClick={() => {
                  const updatedFiles = fileUpload.filter((f) => f.uid !== file.uid);
                  setFileUpload(updatedFiles);
                  onChange?.({
                    ...value,
                    fileRes: updatedFiles.length ? updatedFiles : {
                      Extension: '',
                      FileName: '',
                      PhysicalName: '',
                      FileSizeInBytes: 0,
                      NodeId: '',
                    },
                  });
                  message.success(`${file.name} đã được xóa.`);
                }}
                icon={<DeleteOutlined />}
              />
            </div>
          ) : null;
        })}
      </div>
    );
  }, [fileUpload]);

  useEffect(() => {
    if (_.isEmpty(value)) {
      onChange?.({
        text: '',
        fileRes: {
          Extension: '',
          FileName: '',
          PhysicalName: '',
          FileSizeInBytes: 0,
          NodeId: '',
        },
      });
    }
  }, [value]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <TextArea
        rows={4}
        value={value.text}
        onChange={handleTextChange}
        placeholder="Nhập nội dung tại đây..."
      />
      <div className="custom_upload_list">
        <Upload {...uploadProps} fileList={fileUpload} className="customUpload">
          <Button icon={isUploading ? <Spin /> : <UploadOutlined />}>
            {isUploading ? 'Đang tải lên...' : 'Tải lên tệp'}
          </Button>
        </Upload>
        {renderFileList}
      </div>
    </div>
  );
};

export default InputWithUploadViewer;
