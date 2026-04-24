import { getSystemParameterByMa, getXApiKey } from '@packages/components/SystemParameters/utils';

export const mergeHeaders = (systemParameters: any) => {
  const _headers: any = {};

  _headers['X-ApiKey'] = getXApiKey(systemParameters);

  return _headers;
};

export const buildUploadUrl = (systemParameters: any) => {
  const ServiceAPI = getSystemParameterByMa(systemParameters, 'ServiceAPI');

  return `${ServiceAPI}api/mdm/uploadfile?destinationPath=`;
};

export const INIT_FILE_DATA = {
  EXTENSION: '',
  FILENAME: '',
  PHYSICALNAME: '',
  FILESIZEINBYTES: 0,
  NODEID: '',
};
