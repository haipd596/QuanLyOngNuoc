import { fetchDvcBase } from './fetchDvcBase';
import { getBaseDvcApi } from './getBaseUrl';

// Danh sách loại khoáng sản
export const apiGetMineralType = async (mineralGroupId: string) => {
  try {
    if (!mineralGroupId) return;
    const url = `${getBaseDvcApi()}/_api/web/lists/getbytitle('ks_DM_LoaiKhoangSan')/items?$select=TenKhoangSan,ID,NhomKhoangSanId/TenNhom,DonViTinh&$expand=NhomKhoangSanId&$top=10000&$filter=NhomKhoangSanId eq '${mineralGroupId}'`;
    const data = await fetchDvcBase({ url, requestInit: { method: 'GET' } });
    if (data?.value?.length > 0) return data.value;
    return [];
  } catch (error) {
    throw new Error(`apiGetMineralGroup: ${error}`);
  }
};
