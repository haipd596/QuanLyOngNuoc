import { fetchDvcBase } from './fetchDvcBase';
import { getBaseDvcApi } from './getBaseUrl';

export const apiPostTenGiayToMoi = async (listIds: []) => {
  const url = `${getBaseDvcApi()}/_vti_bin/dvcm/HoSoServices.svc/GetTenGiayToMoi`;

  try {
    const data = await fetchDvcBase({
      url,
      requestInit: {
        method: 'POST',
        headers: {
          Accept: 'application/json; odata=nometadata',
        },
        body: JSON.stringify(listIds),
      },
    });

    if (data?.value?.length > 0) {
      return data.Data;
    }
  } catch (error) {
    throw new Error(`apiGetDuAn: ${error}`);
  }

  return {};
};

export const apiGetTenGiayToMoi = async (listIds: number[]) => {
  if (!listIds || listIds.length === 0) return null;

  const queryParam = listIds.join(',');
  const url = `${getBaseDvcApi()}/_vti_bin/dvcm/HoSoServices.svc/GetTenGiayToMoi?lstId=${queryParam}`;

  try {
    const data = await fetchDvcBase({
      url,
      requestInit: {
        method: 'GET',
      },
    });

    return data;
  } catch (error) {
    console.error('Lỗi khi gọi apiGetTenGiayToMoi:', error);
    throw error;
  }
};

export const apiGetTenNguoiXuLy = async (listCodes: string[]) => {
  if (!listCodes || listCodes.length === 0) return null;

  const queryParam = listCodes.join(',');
  const url = `${getBaseDvcApi()}/_vti_bin/dvcm/HoSoServices.svc/GetTenCoQuanQuanLy?lstCq=${queryParam}`;

  try {
    const data = await fetchDvcBase({
      url,
      requestInit: {
        method: 'GET',
      },
    });

    return data;
  } catch (error) {
    console.error('Lỗi khi gọi apiGetTenNguoiXuLy:', error);
    throw error;
  }
};
