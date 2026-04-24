import { getUserIdPageContext } from '@packages/utils/common';
import { fetchDvcBase } from './fetchDvcBase';
import { getBaseDvcApi } from './getBaseUrl';

// LẤY THÔNG TIN NGƯỜI DÙNG
export const apiGetUserInfo = async () => {
  try {
    const userId = getUserIdPageContext();
    if (!userId) return;
    const url = `${getBaseDvcApi()}/_api/web/lists/getbytitle('DM_ThongTinNguoiDung')/items?$select=*,LoaiDoiTuong/Loai&$expand=LoaiDoiTuong&$filter=NguoiDungId eq '${userId}'`;
    const data = await fetchDvcBase({ url, requestInit: { method: 'GET' } });

    if (data?.value?.length > 0) return data.value[0];
    return {};
  } catch (error) {
    throw new Error(`apiGetUserInfo: ${error}`);
  }
};
