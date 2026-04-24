import { fetchDvcBase } from './fetchDvcBase';
import { getBaseDvcApi } from './getBaseUrl';

export const apiGetCoQuanTiepNhanByProvince = async (
  provinceId: number,
  linhVucId: number | undefined,
) => {
  try {
    const url = `${getBaseDvcApi()}/_vti_bin/DVCM/HoSoServices.svc/GetCoQuanTiepNhanByTinhThanh?tinhId=${provinceId}&linhVucId=${linhVucId}`;
    const response = await fetchDvcBase({ url, requestInit: { method: 'GET' } });

    if (response) return response.Data;
    return [];
  } catch (err) {
    throw new Error(`apiGetCoQuanTiepNhanByProvince: ${err}`);
  }
};

export const apiGetLinhVucByTTHCID = async (tthcId: number | undefined) => {
  try {
    const url = `${getBaseDvcApi()}/_api/web/lists/GetByTitle('dm_ThuTucHanhChinh')/items(${tthcId})?$select=LinhVucId`;
    const response = await fetchDvcBase({ url, requestInit: { method: 'GET' } });
    if (response) return response.LinhVucId;
    return {};
  } catch (err) {
    throw new Error(`apiGetLinhVucByTTHCID: ${err}`);
  }
};
