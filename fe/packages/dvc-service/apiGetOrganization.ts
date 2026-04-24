import { getUserIdPageContext } from '@packages/utils/common';
import { fetchDvcBase } from './fetchDvcBase';
import { getBaseDvcApi } from './getBaseUrl';

// LẤY THÔNG TIN TỔ CHỨC
export const apiGetOrganization = async () => {
  try {
    const userId = getUserIdPageContext();
    if (!userId) return;
    const SELECT = '*,LoaiDoiTuong/Loai,NguoiDaiDien/ChucVu,NguoiDaiDien/Title';
    const EXPAND = 'LoaiDoiTuong,NguoiDaiDien';
    const FILTER = `NguoiDungId eq '${userId}'`;
    const url = `${getBaseDvcApi()}/_api/web/lists/getbytitle('DM_ThongTinToChuc')/items?$select=${SELECT}&$expand=${EXPAND}&$filter=${FILTER}`;
    const data = await fetchDvcBase({ url, requestInit: { method: 'GET' } });

    if (data?.value?.length > 0) return data.value[0];
    return {};
  } catch (error) {
    throw new Error(`apiGetOrganization: ${error}`);
  }
};
