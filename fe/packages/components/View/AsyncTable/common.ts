import { getSystemParameterByMa } from '@packages/components/SystemParameters/utils';
import { getWebAbsoluteUrlPageContext } from '@packages/utils/common';
import axios from 'axios';
import _get from 'lodash/get';

/**
 * Upload một file lên Dell ECS bằng cơ chế presigned URL
 * Trả về metadata giống như khi upload bằng ViewUpload
 */
export const uploadToDellEcs = async (file: any, systemParameters: any) => {
  const hiddenWebExtendUrl = getWebAbsoluteUrlPageContext();
  const WebApiUrl = getSystemParameterByMa(systemParameters, 'WebApiUrl');

  // --- B1: Lấy presigned URL
  const presignedRes = await axios.get(
    `${hiddenWebExtendUrl}/_vti_bin/dvcm/CommonServices.svc/presignedUrl`,
  );

  const presignedUrl = _get(presignedRes, 'data.PresignedURL');
  const objectKey = _get(presignedRes, 'data.ObjectKey');

  if (!presignedUrl || !objectKey) {
    throw new Error('Không thể lấy được Presigned URL từ server.');
  }

  // --- B2: Upload file lên Dell ECS qua API proxy (post FormData)
  const fmData = new FormData();
  fmData.append('file', file);

  const uploadRes = await axios.post(
    `${WebApiUrl}api/dellecs/presignedUrlPutFileFormData?presignedUrl=${encodeURIComponent(
      presignedUrl,
    )}`,
    fmData,
  );

  // --- B3: Gọi filenametometadata để cập nhật metadata
  const uploadedFile = _get(uploadRes, 'data.Data[0]');
  if (!uploadedFile) {
    throw new Error('Không nhận được dữ liệu file sau khi upload.');
  }

  await axios.get(
    `${hiddenWebExtendUrl}/_vti_bin/dvcm/CommonServices.svc/filenametometadata`,
    {
      params: {
        objectKey,
        fileName: uploadedFile.FileName,
      },
    },
  );

  // --- B4: Trả về metadata giống ViewUpload
  return {
    Extension: uploadedFile.Extension,
    FileName: uploadedFile.FileName,
    PhysicalName: uploadedFile.FileName,
    FileSizeInBytes: uploadedFile.FileSizeInBytes,
    NodeId: objectKey,
  };
};
