import { fetchDvcBase } from './fetchDvcBase';
import { getBaseDvcApi } from './getBaseUrl';

export const apiGetSystemParameter = async () => {
  // eslint-disable-next-line max-len
  // const url = `${getBaseDvcApi()}/_api/web/lists/getbytitle('SystemParameter')/items?$select=Id,GiaTri&$filter=Title eq 'MaKetQua'`;
  const url = `${getBaseDvcApi()}/_vti_bin/dvcm/ProxyService.svc/GetParam?listTitle=&listId=9324398d-23cf-467a-b0a0-ceeef9da2d89&select=Id,Ma,GiaTri&filter=Title eq 'MaKetQua'`;
  try {
    const data = await fetchDvcBase({ url, requestInit: { method: 'GET' } });
    if (data?.value?.length > 0) return data?.value[0];

    return {};
  } catch (error) {
    throw new Error(`apiGetSystemParameter: ${error}`);
  }
};
