import { fetchDvcBase } from './fetchDvcBase';
import { getBaseDvcApi } from './getBaseUrl';
import { TABLES } from './table';

// Danh sách phạm vi chứng nhận
export const apiGetDanhSachPhamViChungNhan = async () => {
  const SELECT = 'Id,Ten,NhomPhamViId,NhomPhamViTen,ThuTuHienThi';
  const FILTER = 'DaXoa eq \'0\'';
  try {
    const url = `${getBaseDvcApi()}/_api/web/lists/getbytitle('${TABLES.mt_GCNQTMT_PhamViChungNhan}')/items?$select=${SELECT}&$filter=${FILTER}`;
    const response = await fetchDvcBase({ url, requestInit: { method: 'GET' } });
    if (response?.value) return response?.value;
    return [];
  } catch (error) {
    throw new Error(`apiGetListDistricts: ${error}`);
  }
};
