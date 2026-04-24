// 4648

import { HOSO_ID_PARAM1, HOSO_ID_PARAM2 } from '@packages/constants/commons';
import { fetchDvcBase } from './fetchDvcBase';
import { getBaseDvcApi } from './getBaseUrl';

export const apiGetHoSoByHsId = async () => {
  const params = new URL(window.location.href).searchParams;
  const hsid = params.get(HOSO_ID_PARAM1) || params.get(HOSO_ID_PARAM2);

  const url = `${getBaseDvcApi()}/_api/web/lists/getbytitle('mc_HoSo')/items?$select=*&$filter=ID eq '${hsid}'`;

  if (hsid) {
    try {
      const data = await fetchDvcBase({
        url,
        requestInit: {
          method: 'GET',
        },
      });

      if (data?.value?.length > 0) {
        const _data = data?.value[0];

        return _data;
      }
    } catch (error) {
      throw new Error(`apiGetHoSoByHsId: ${error}`);
    }
  }

  return {};
};
