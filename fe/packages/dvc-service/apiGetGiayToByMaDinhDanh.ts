import _get from 'lodash/get';
import { fetchDvcBase } from './fetchDvcBase';
import { getBaseDvcApi } from './getBaseUrl';

export const apiGetGiayToByMaDinhDanh = async (maDinhDanh: string) => {
  if (maDinhDanh) {
    try {
      // eslint-disable-next-line max-len
      // const url = `${getBaseDvcApi()}/_api/web/lists/getbytitle('dm_GiayTo')/items?$select=*&$filter=MaDinhDanh eq '${maDinhDanh}'`;
      const url = `${getBaseDvcApi()}/_api/web/lists(guid'f92e9fa0-bec4-4175-afa7-df9e4dee2e8d')/items?$select=*&$filter=MaDinhDanh eq '${maDinhDanh}'`;
      const data = await fetchDvcBase({
        url,
        requestInit: {
          method: 'GET',
        },
      });

      return _get(data, 'value', []);
    } catch (error) {
      throw new Error(`apiGetGiayToByMaDinhDanh: ${error}`);
    }
  }

  return {};
};
