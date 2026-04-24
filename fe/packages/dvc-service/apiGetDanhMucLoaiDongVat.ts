import { fetchDvcBase } from './fetchDvcBase';
import { getBaseDvcApi } from './getBaseUrl';

export const apiGetDanhMucLoaiDongVat = async () => {
  try {
    const url = `${getBaseDvcApi()}/_api/web/lists/GetByTitle('dm_LoaiNguyCap')/items`;
    const response = await fetchDvcBase({ url, requestInit: { method: 'GET' } });
    if (response?.value) return response;
    return [];
  } catch (error) {
    throw new Error(`apiGetDanhMucLoaiDongVat: ${error}`);
  }
};
