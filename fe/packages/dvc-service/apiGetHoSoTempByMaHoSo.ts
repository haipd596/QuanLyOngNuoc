import _get from 'lodash/get';
import { fetchDvcBase } from './fetchDvcBase';
import { getBaseDvcApi } from './getBaseUrl';

export const apiGetHoSoTempByMaHoSo = async (maHoSo: any) => {
  const filter = `MaHoSo eq '${maHoSo}'`;

  const url = `${getBaseDvcApi()}/_api/web/lists/getbytitle('HoSoTemp')/items?$select=*&$filter=${filter}`;
  try {
    const data = await fetchDvcBase({
      url,
      requestInit: {
        method: 'GET',
      },
    });

    return _get(data, 'value.0', '{}');
  } catch (error) {
    throw new Error(`apiGetFormDataByHsId: ${error}`);
  }
};
