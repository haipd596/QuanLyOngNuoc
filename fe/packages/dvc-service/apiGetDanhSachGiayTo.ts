import _isEmpty from 'lodash/isEmpty';
import { fetchDvcBase } from './fetchDvcBase';
import { getBaseDvcApi } from './getBaseUrl';

// LẤY DANH SÁCH GIẤY TỜ TỪ KHO DỮ LIỆU QUỐC GIA
export const apiGetListDocumentFromNationalDatabase = async (
  // data: { body: AnyObject, token: string },
  params: {
    maThuTuc: any;
    kenhThucHien: number;
    soDinhDanhChuSoHuu: number;
    soDinhDanhNguoiYeuCau: number;
    hoTenNguoiYeuCau: string;
  },
) => {
  // const { body, token } = data;
  const endpoint = `/_vti_bin/DVCM/CommonServices.svc/GiayToCaNhanFromDVCQG?maThuTuc=${params.maThuTuc}&kenhThucHien=${params.kenhThucHien}&soDinhDanhChuSoHuu=${params.soDinhDanhChuSoHuu}&soDinhDanhNguoiYeuCau=${params.soDinhDanhNguoiYeuCau}&hoTenNguoiYeuCau=${params.hoTenNguoiYeuCau}`;
  // const testUrl = 'http://demo-dichvucong.monre.gov.vn/_vti_bin/DVCM/CommonServices.svc/GiayToCaNhanFromDVCQG?maThuTuc=1.011671&kenhThucHien=1&soDinhDanhChuSoHuu=135602342&soDinhDanhNguoiYeuCau=135602342&hoTenNguoiYeuCau=Đào Văn Tài';
  try {
    const response = await fetch(
      `${getBaseDvcApi()}${endpoint}`,
      // testUrl,
      {
        method: 'GET',
        headers: {
          // Authorization: token,
          // 'X-ApiKey': getXApiKey(params.systemParameters),
          'Content-Type': 'application/json',
          Charset: 'utf-8',
        },
        // body: JSON.stringify(body),
      },
    );

    const result = await response.json();

    return result;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

// LẤY DANH SÁCH GIẤY TỜ TỪ KHO DỮ LIỆU ĐIỆN TỬ CỦA TÔI
export const apiGetListDocumentFromMyDatabase = async (authorId: string, keySearch?: string) => {
  if (authorId) {
    // eslint-disable-next-line max-len
    // let url = `${getBaseDvcApi()}/_api/web/lists/getbytitle('dm_GiayTo')/items?$select=*&$filter=DaXoaByCaNhanToChuc eq '0' and MaDinhDanh eq '${authorId}'&$top=10000`;
    let url = `${getBaseDvcApi()}/_api/web/lists(guid'f92e9fa0-bec4-4175-afa7-df9e4dee2e8d')/items?$select=*&$filter=DaXoaByCaNhanToChuc eq '0' and MaDinhDanh eq '${authorId}'&$top=10000`;
    try {
      if (!_isEmpty(keySearch)) {
        // eslint-disable-next-line max-len
        // url = `${getBaseDvcApi()}/_api/web/lists/getbytitle('dm_GiayTo')/items?$select=*&$filter=DaXoaByCaNhanToChuc eq '0' and MaDinhDanh eq '${authorId}' and substringof('${keySearch}', FileName)&$top=10000`;
        url = `${getBaseDvcApi()}/_api/web/lists(guid'f92e9fa0-bec4-4175-afa7-df9e4dee2e8d')/items?$select=*&$filter=DaXoaByCaNhanToChuc eq '0' and MaDinhDanh eq '${authorId}' and substringof('${keySearch}', FileName)&$top=10000`;
      }
      const response = await fetchDvcBase({ url, requestInit: { method: 'GET' } });
      if (response?.value?.length > 0) return response?.value;
      return [];
    } catch (error) {
      throw new Error(`apiGetFormDataByHsId: ${error}`);
    }
  } else {
    throw new Error('AuthorId is not found');
  }
};
