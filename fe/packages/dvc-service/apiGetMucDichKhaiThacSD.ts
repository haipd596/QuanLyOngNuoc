import { fetchDvcBase } from './fetchDvcBase';
import { getBaseDvcApi } from './getBaseUrl';

// LẤY THÔNG TIN NGƯỜI DÙNG
export const apiGetMucDichKhaiThacSD = async () => {
  try {
    const url = `${getBaseDvcApi()}/_api/web/lists/getbytitle('dm_MucDichSDTNN')/items?$select=Ma,Ten`;
    const data = await fetchDvcBase({ url, requestInit: { method: 'GET' } });

    if (data?.value?.length > 0) return data.value;
    return {};
  } catch (error) {
    throw new Error(`apiGetMucDichKhaiThacSD: ${error}`);
  }
};
