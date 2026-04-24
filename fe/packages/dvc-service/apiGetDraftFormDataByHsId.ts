import { HOSO_ID_PARAM1, HOSO_ID_PARAM2 } from '@packages/constants/commons';
import _get from 'lodash/get';
import { fetchDvcBase } from './fetchDvcBase';
import { getBaseDvcApi } from './getBaseUrl';

export const apiGetDraftFormDataByHsId = async () => {
  const { search } = window.location;
  const params = new URLSearchParams(search);
  const hsid = params.get(HOSO_ID_PARAM1) || params.get(HOSO_ID_PARAM2);
  const payload = {
    "title": "mc_HoSo_SchemaData",
    "filter": "HoSoId=@p0",
    "params": [hsid]
  }
  if (hsid) {
    const url = `${getBaseDvcApi()}/api/v1/common/query`;
    try {
      const data = await fetchDvcBase({
        url,
        requestInit: {
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
            accept: 'application/json;odata=nometadata'
          },
          body: JSON.stringify(payload)
        },
      });

      return JSON.parse(_get(data, 'value.0.SchemaData', '{}'));
    } catch (error) {
      throw new Error(`apiGetFormDataByHsId: ${error}`);
    }
  }

  return {};
};
