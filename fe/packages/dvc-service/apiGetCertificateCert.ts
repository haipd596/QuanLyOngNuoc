import { fetchDvcBase } from './fetchDvcBase';
import { getBaseDvcApi } from './getBaseUrl';
import { TABLES } from './table';

// Danh sách phạm vi chứng nhận
export const apiGetProviderCert = async () => {
  const SELECT = '*';
  try {
    const url = `${getBaseDvcApi()}/_api/web/lists/getbytitle('${TABLES.eSign_CAName}')/items?$select=${SELECT}`;
    const response = await fetchDvcBase({ url, requestInit: { method: 'GET' } });
    if (response?.value) return response?.value;
    return [];
  } catch (error) {
    throw new Error(`apiGetListDistricts: ${error}`);
  }
};
