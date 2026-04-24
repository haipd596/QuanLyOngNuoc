import { DeleteOutlined } from '@ant-design/icons';
import DownloadImageUrl from '@packages/components/CommonTable/DownloadImageUrl';
import { OPTIONS_ACCEPT_OTHER_TYPES, OPTIONS_ACCEPT_UPLOAD } from '@packages/components/Config/ConfigOptionAcceptUpload/constants';
import { DIGITALPAPER_TOOLTIP } from '@packages/components/DigitalPaper/constant';
import IconWrapper from '@packages/components/IconWrapper';
import PreviewDocument from '@packages/components/PreviewDocument';
import { getSystemParameterByMa } from '@packages/components/SystemParameters/utils';
import { getWebAbsoluteUrlPageContext } from '@packages/utils/common';
import {
  Button, message,
  Spin,
  Tooltip,
  Upload,
  UploadProps,
} from 'antd';
import { ButtonProps } from 'antd/lib';
import axios from 'axios';
import clsx from 'clsx';
import _ from 'lodash';
import _flatten from 'lodash/flatten';
import _get from 'lodash/get';
import React, { useMemo, useState } from 'react';
import { useAppSelector } from '~/redux/hooks';
import { selectSystemParameter } from '~/redux/slices';
import './styles.scss';
import { INIT_FILE_DATA, mergeHeaders } from './utils';

export interface ViewUploadProps extends UploadProps {
  action: string;
  responseKey: string;
  onChange: (value: any) => void,
  value: any,
  buttonContent: string,
  buttonType: ButtonProps['type'],
  disabled: boolean,
  headers: any,
  isShowUploadList: boolean,
  maxSizeInMB: number,
}

const ViewUpload: React.FC<ViewUploadProps> = ({
  action,
  responseKey,
  buttonContent,
  isShowUploadList,
  buttonType,
  disabled,
  headers,
  value,
  multiple,
  maxSizeInMB,
  ...rest
}) => {
  const systemParameters = useAppSelector(selectSystemParameter);
  const WebApiUrl = getSystemParameterByMa(systemParameters, 'WebApiUrl');
  const hiddenWebExtendUrl = getWebAbsoluteUrlPageContext();
  const [isUploading, setIsUploading] = useState(false);

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

    throw new Error('Đã có lỗi xảy ra!');
  };

  const customRequest = async (options: any) => {
    const {
      onSuccess, onError, file,
    } = options;
    const fmData = new FormData();
    // const config = {
    //   headers: headersWithFileServer,
    // };
    fmData.append('file', file);
    try {
      setIsUploading(true);
      const _file = await uploadMdm(fmData);
      // const res = await axios.post(
      //   buildUploadUrl(systemParameters),
      //   fmData,
      //   config,
      // );

      // if (!res.data.Success) {
      //   throw new Error(res.data.Message);
      // }

      onSuccess({
        Data: [_file],
      });
    } catch (err) {
      onError(err);
    } finally {
      setIsUploading(false);
    }
  };

  const props: UploadProps = {
    ...rest,
    customRequest,
    showUploadList: false,
    multiple: false,
    // Check type of file before upload. File only accept types has regulation in defaultAccept.
    beforeUpload: (file) => {
      const allowedTypes = rest.accept;
      const defaultOptionType = OPTIONS_ACCEPT_UPLOAD.concat(OPTIONS_ACCEPT_OTHER_TYPES);
      const targetLabels = defaultOptionType
        .filter((obj) => allowedTypes?.includes(obj.value))
        .map((obj) => obj.label);

      if (allowedTypes && !allowedTypes.includes(file.type)) {
        const allowedFormats = targetLabels.join(', ');
        message.error(`Vui lòng tải lên file đúng định dạng: ${allowedFormats}.`);
        return Upload.LIST_IGNORE; // Chặn upload
      }

      const maxSize = maxSizeInMB ?? 500; // Nếu maxSizeInMB không truyền vào thì mặc định là 500
      const isValidSize = file.size / 1024 / 1024 <= maxSize;
      if (!isValidSize) {
        message.error(`Vui lòng tải lên file có dung lượng dưới ${maxSize}MB!`);
        return Upload.LIST_IGNORE; // Chặn upload
      }

      return true;
    },
    // showUploadList: typeof rest.showUploadList === 'undefined' ? false : rest.showUploadList,
    defaultFileList: value?.map(({ NodeId, FileName }: any) => ({ name: FileName, NodeId, status: 'done' })) || [],
    headers: headersWithFileServer,
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.info(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        if (rest.onChange) {
          if (isShowUploadList) {
            const fileUploaded = _get(info.file, `response.${responseKey}`, '');
            const initDataEmpty = fileUploaded || [{
              Extension: INIT_FILE_DATA.EXTENSION,
              FileName: INIT_FILE_DATA.FILENAME,
              PhysicalName: INIT_FILE_DATA.PHYSICALNAME,
              FileSizeInBytes: INIT_FILE_DATA.FILESIZEINBYTES,
              NodeId: INIT_FILE_DATA.NODEID,
            }];
            if (multiple) {
              const getValue = value ?? [];
              rest.onChange([...getValue, ...initDataEmpty]);
            } else {
              rest.onChange([...initDataEmpty]);
            }
          } else {
            // rest.onChange(
            //   _flatten(info.fileList.map((file) => {
            //     const fileUploaded = _get(file, `response.${responseKey}`, '');

            //     return fileUploaded;
            //   })),
            // );
            const uploadedFiles = _flatten(
            info.fileList.map((file) => {
              const fileUploaded = _get(file, `response.${responseKey}`, '');
              if (fileUploaded && file.originFileObj) {
                return fileUploaded.map((meta: any) => ({
                  ...meta,
                  originFileObj: file.originFileObj,
                }));
              }
              return fileUploaded;
            }),
            );

            rest.onChange(uploadedFiles);
          }
        }
        message.success(`${info.file.name} tải lên thành công`);
      } else if (info.file.status === 'error') {
        if (_.isString(info.file.error?.message)) {
          message.error(info.file.error.message);
          return;
        }
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onRemove(file: any) {
      if (isShowUploadList) {
        if (rest.onChange) {
          const initDataEmptyRemove = {
            Extension: INIT_FILE_DATA.EXTENSION,
            FileName: INIT_FILE_DATA.FILENAME,
            PhysicalName: INIT_FILE_DATA.PHYSICALNAME,
            FileSizeInBytes: INIT_FILE_DATA.FILESIZEINBYTES,
            NodeId: INIT_FILE_DATA.NODEID,
          };
          if (multiple) {
            const getValue: any[] = value ?? [];
            const targetFile = getValue?.filter((_item) => file.NodeId !== _item.NodeId);
            const checkedFileLength: any[] = targetFile?.length > 0
              ? targetFile
              : [initDataEmptyRemove];
            rest.onChange([...checkedFileLength]);
          } else {
            rest.onChange([initDataEmptyRemove]);
          }
        }
        return true;
      }

      const newFileList = value?.filter(({ NodeId }: any) => NodeId !== file.NodeId);

      if (rest.onChange) {
        rest.onChange(newFileList);
      }

      return true;
    },
  };

  const renderFileList = useMemo(() => {
    if (!Array.isArray(value)) return null;

    const hasNonEmptyElementValue = value.some(
      (item) => item.Extension !== INIT_FILE_DATA.EXTENSION
        || item.FileName !== INIT_FILE_DATA.FILENAME
        || item.PhysicalName !== INIT_FILE_DATA.PHYSICALNAME
        || item.FileSizeInBytes !== INIT_FILE_DATA.FILESIZEINBYTES
        || item.NodeId !== INIT_FILE_DATA.NODEID,
    );
    const files = value;

    if (!files) return null;

    // const downLoadImg = files.NodeId;

    return (
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <>
        {files
          ?.filter((_f) => _f.NodeId)
          ?.map((_file) => {
            return (
              <div key={_file.uid || _file.NodeId}>
                <DownloadImageUrl fileId={_file.NodeId}>
                  {_file.FileName}
                </DownloadImageUrl>
                {hasNonEmptyElementValue && (
                <Button
                  type="link"
                  danger
                  className="btn-delete-attachment"
                  onClick={(e) => {
                    if (rest.onChange) {
                      e.stopPropagation();
                      const updatedFiles = value.filter((f) => f.NodeId !== _file.NodeId);
                      const _getListFileExist = updatedFiles.filter((_i) => _i.NodeId);
                      // Lọc những file có giá trị, nếu danh sách rỗng thì lấy giá trị mặc định
                      if (_getListFileExist.length === 0) {
                        rest.onChange([{
                          Extension: INIT_FILE_DATA.EXTENSION,
                          FileName: INIT_FILE_DATA.FILENAME,
                          PhysicalName: INIT_FILE_DATA.PHYSICALNAME,
                          FileSizeInBytes: INIT_FILE_DATA.FILESIZEINBYTES,
                          NodeId: INIT_FILE_DATA.NODEID,
                        }]);
                      } else {
                        rest.onChange(_getListFileExist);
                      }
                    }
                    message.success(`${_file.FileName} đã được xóa.`);
                  }}
                  icon={<DeleteOutlined />}
                />
                )}
                {['.pdf'].includes(_file.Extension) && <PreviewDocument nodeId={_file.NodeId} />}
              </div>
            );
          })}
      </>
    );
  }, [value, rest.onChange, isShowUploadList]);

  // useEffect(() => {
  //   if (value === undefined) {
  //     const initValue = [{
  //       Extension: INIT_FILE_DATA.EXTENSION,
  //       FileName: INIT_FILE_DATA.FILENAME,
  //       PhysicalName: INIT_FILE_DATA.PHYSICALNAME,
  //       FileSizeInBytes: INIT_FILE_DATA.FILESIZEINBYTES,
  //       NodeId: INIT_FILE_DATA.NODEID,
  //     }];

  //     rest.onChange(initValue);
  //   }
  // }, [value]);

  // Data test
  // useEffect(() => {
  //   rest.onChange([{
  //     FileName: 'kung_fu_panda_4_movie_2024-wallpaper-1920x1080.jpg',
  //     FileSizeInBytes: 260832,
  //     Extension: '.jpg',
  //     NodeId: 'ecs_0866ec74-c846-4c41-bbc8-186afe3bf2d1',
  //   },
  //   {
  //     FileName: 'kung_fu_panda_5_movie_2024-wallpaper-1920x1080.jpg',
  //     FileSizeInBytes: 260832,
  //     Extension: '.jpg',
  //     NodeId: 'ecs_574792a1-f6bc-4389-9de6-cb0dc0c8963d',
  //   }]);
  // }, []);

  return (
    <div>
      <Upload {...props} name="file" className={clsx(props.className, 'upload-zone')}>
        <Tooltip title={DIGITALPAPER_TOOLTIP.UPLOAD_FILE}>
          <Button
            icon={
            isUploading
              ? <Spin />
              : <IconWrapper icon={<i className={clsx('fa-solid fa-cloud-arrow-up fa-xl', 'icon_global_dvc')} />} />
          }
            disabled={disabled}
          >
            {buttonContent}
          </Button>
        </Tooltip>
      </Upload>
      {isShowUploadList ? renderFileList : null}
    </div>
  );
};

export default ViewUpload;
