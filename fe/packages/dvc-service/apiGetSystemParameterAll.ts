import { fetchDvcBase } from './fetchDvcBase';
import { getBaseDvcApi } from './getBaseUrl';

export const apiGetSystemParameterAll = async () => {
  // eslint-disable-next-line max-len
  // const url = `${getBaseDvcApi()}/_api/web/lists/getbytitle('SystemParameter')/items?$select=Id,GiaTri,Ma`;
  const url = `${getBaseDvcApi()}/_vti_bin/dvcm/ProxyService.svc/GetParam?listTitle=&listId=9324398d-23cf-467a-b0a0-ceeef9da2d89&select=Id,Ma,GiaTri&filter=(Title eq 'WebApiUrl'  or Title eq 'AppKey' or Title eq 'AppID' or Title eq 'SystemApiBaseUrl')`;
  try {
    const data = await fetchDvcBase({ url, requestInit: { method: 'GET' } });
    if (data?.d?.results?.length > 0) return data?.d?.results;

    return {};
  } catch (error) {
    throw new Error(`apiGetSystemParameterAll: ${error}`);
  }
};
