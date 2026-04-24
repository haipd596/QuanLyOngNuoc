import { fetchDvcBase } from './fetchDvcBase';
import { getBaseDvcApi } from './getBaseUrl';

// Danh sách nhóm khoáng sản
export const apiGetMineralGroups = async () => {
  try {
    const url = `${getBaseDvcApi()}/_api/web/lists/getbytitle('ks_DM_NhomKhoangSan')/items?$select=Id,TenNhom&$top=10000`;
    const data = await fetchDvcBase({ url, requestInit: { method: 'GET' } });

    if (data?.value?.length > 0) return data.value;
    return [];
  } catch (error) {
    throw new Error(`apiGetMineralGroup: ${error}`);
  }
};
