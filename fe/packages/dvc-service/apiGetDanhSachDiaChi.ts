import { fetchDvcBase } from './fetchDvcBase';
import { getBaseDvcApi } from './getBaseUrl';
import { TABLES } from './table';

// LẤY DANH SÁCH TỈNH/THÀNH PHỐ
export const apiGetListProvinces = async () => {
  const SELECT = 'ID,Ma,Ten,DaXoa,QuocGiaId/Ten,CapDonViHanhChinhId/Ten,ChaId/Ten';
  const EXPAND = 'QuocGiaId/Ma, CapDonViHanhChinhId/Ten,ChaId/ID, ChaId/Ten';
  const FILTER = 'QuocGiaId/Ma eq \'VN\' and DaXoa eq \'0\' and CapDonViHanhChinhId eq \'1\'';
  try {
    const url = `${getBaseDvcApi()}/_api/web/lists/getbytitle('${TABLES.DM_DONVIHANHCHINH}')/items?$select=${SELECT}&$expand=${EXPAND}&$filter=${FILTER}`;
    const response = await fetchDvcBase({ url, requestInit: { method: 'GET' } });
    if (response?.value) return response?.value;
    return [];
  } catch (error) {
    throw new Error(`apiGetMineralGroup: ${error}`);
  }
};

// LẤY DANH SÁCH QUẬN/HUYỆN
export const apiGetListDistricts = async (provinceId: number) => {
  const SELECT = 'ID,Ma,Ten,DaXoa,QuocGiaId/Ten,CapDonViHanhChinhId/Ten,ChaId/Ten';
  const EXPAND = 'QuocGiaId/Ma, CapDonViHanhChinhId/Ten,ChaId/ID, ChaId/Ten';
  const FILTER = `QuocGiaId/Ma eq 'VN' and DaXoa eq '0' and CapDonViHanhChinhId eq '2' and ChaIdId eq '${provinceId}'`;
  try {
    const url = `${getBaseDvcApi()}/_api/web/lists/getbytitle('${TABLES.DM_DONVIHANHCHINH}')/items?$select=${SELECT}&$expand=${EXPAND}&$filter=${FILTER}`;
    const response = await fetchDvcBase({ url, requestInit: { method: 'GET' } });
    if (response?.value) return response?.value;
    return [];
  } catch (error) {
    throw new Error(`apiGetListDistricts: ${error}`);
  }
};

// LẤY DANH SÁCH PHƯỜNG/XÃ
export const apiGetListWars = async (districtId: number) => {
  const SELECT = 'ID,Ma,Ten,DaXoa,QuocGiaId/Ten,CapDonViHanhChinhId/Ten,ChaId/Ten';
  const EXPAND = 'QuocGiaId/Ma, CapDonViHanhChinhId/Ten,ChaId/ID, ChaId/Ten';
  const FILTER = `QuocGiaId/Ma eq 'VN' and DaXoa eq '0' and ChaIdId eq '${districtId}'`;
  try {
    const url = `${getBaseDvcApi()}/_api/web/lists/getbytitle('${TABLES.DM_DONVIHANHCHINH}')/items?$select=${SELECT}&$expand=${EXPAND}&$filter=${FILTER}`;
    const response = await fetchDvcBase({ url, requestInit: { method: 'GET' } });
    if (response?.value) return response?.value;
    return [];
  } catch (error) {
    throw new Error(`apiGetListWars: ${error}`);
  }
};

// LẤY DANH SÁCH TỈNH/THÀNH PHỐ NEW
export const apiGetListProvincesNew = async () => {
  const SELECT = 'ID,Ma,Ten,DaXoa,QuocGiaId/Ten,CapDonViHanhChinhId/Ten,ChaId/Ten,QuocGiaId/Ma,ChaId/Ten';
  const EXPAND = 'QuocGiaId, CapDonViHanhChinhId,ChaId';
  const FILTER = '(QuocGiaId/Ma eq \'VN\' or QuocGiaId/Ma eq \'vi-VN\') and DaXoa eq 0 and CapDonViHanhChinhId/Id eq 1';
  try {
    const url = `${getBaseDvcApi()}/_api/web/lists/getbytitle('${TABLES.DM_DONVIHANHCHINH_NEW}')/items?$select=${SELECT}&$expand=${EXPAND}&$filter=${FILTER}&$top=10000`;
    const response = await fetchDvcBase({ url, requestInit: { method: 'GET' } });
    if (response?.value) return response?.value;
    return [];
  } catch (error) {
    throw new Error(`apiGetMineralGroup: ${error}`);
  }
};

// LẤY DANH SÁCH PHƯỜNG/XÃ NEW
export const apiGetListWarsNew = async (provinceId: number) => {
  const SELECT = 'ID,Ma,Ten,DaXoa,QuocGiaId/Ten,CapDonViHanhChinhId/Ten,ChaId/Ten';
  const EXPAND = 'QuocGiaId/Ma, CapDonViHanhChinhId/Ten,ChaId/ID, ChaId/Ten';
  const FILTER = `(QuocGiaId/Ma eq 'VN' or QuocGiaId/Ma eq 'vi-VN') and DaXoa eq '0' and ChaIdId eq '${provinceId}'`;
  try {
    const url = `${getBaseDvcApi()}/_api/web/lists/getbytitle('${TABLES.DM_DONVIHANHCHINH_NEW}')/items?$select=${SELECT}&$expand=${EXPAND}&$filter=${FILTER}&$top=10000`;
    const response = await fetchDvcBase({ url, requestInit: { method: 'GET' } });
    if (response?.value) return response?.value;
    return [];
  } catch (error) {
    throw new Error(`apiGetListWars: ${error}`);
  }
};
