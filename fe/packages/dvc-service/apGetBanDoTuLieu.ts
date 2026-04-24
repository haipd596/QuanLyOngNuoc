import { fetchDvcBase } from './fetchDvcBase';
import { getBaseDvcApi } from './getBaseUrl';

export const apiGetBanDoTuLieu = async (filter: string) => {
  try {
    const url = `${getBaseDvcApi()}/_api/web/lists/getbytitle('BD_TuLieu')/items?$select=Ten,MaBanDo,PhanLoai,MaBanDoCha,ID,Gia,Id&$filter=${filter}&$top=1000000`;
    const response = await fetchDvcBase({ url, requestInit: { method: 'GET' } });
    if (response?.value) return response?.value;
    return [];
  } catch (error) {
    throw new Error(`apiGetListDistricts: ${error}`);
  }
};

export const apiGetDuLieuDongDoDacBanDo = async () => {
  try {
    const url = `${getBaseDvcApi()}/_api/web/lists/GetByTitle('dm_DuLieuDoDong')/items`;
    const response = await fetchDvcBase({ url, requestInit: { method: 'GET' } });
    if (response?.value) return response?.value;
    return [];
  } catch (error) {
    throw new Error(`apiGetDuLieuDongDoDacBanDo: ${error}`);
  }
};
