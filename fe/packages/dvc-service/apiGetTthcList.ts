import { fetchDvcBase } from './fetchDvcBase';
import { getBaseDvcApi } from './getBaseUrl';

export const apiGetTthcList = async (text: string) => {
  try {
    const payload = {
      "title": "dm_ThuTucHanhChinh",
      "filter": "Ten LIKE @p0",
      "params": [`%${text}%`]
    }
    const url = `${getBaseDvcApi()}/api/v1/common/query`;
    const response = await fetchDvcBase({ url, 
      requestInit: {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
          accept: 'application/json;odata=nometadata'
        },
        body: JSON.stringify(payload) 
      } 
    });
    if (response?.data?.items) return response?.data?.items;
    return [];
  } catch (error) {
    throw new Error(`apiGetListDistricts: ${error}`);
  }
};
