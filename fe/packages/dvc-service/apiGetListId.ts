import { fetchDvcBase } from './fetchDvcBase';
import { getBaseDvcApi } from './getBaseUrl';

export const apiGetListId = async () => {
  try {
    const url = `${getBaseDvcApi()}/_api/web/GetList('/Lists/HoSoTemp')?$select=*`;
    const data = await fetchDvcBase({ url, requestInit: { method: 'GET' } });

    return data;
  } catch (error) {
    throw new Error(`apiGetListId: ${error}`);
  }
};
