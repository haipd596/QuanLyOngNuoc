import _get from 'lodash/get';
import { fetchDvcBase } from './fetchDvcBase';
import { getBaseDvcApi } from './getBaseUrl';

export const apiGetFormDataByHsIdAndIdForm = async (hsId: string, FormId: string) => {
  if (hsId && FormId) {
    const payload = {
      "title": "mc_HoSo_SchemaData",
      "filter": "HoSoId=@p0",
      "params": [hsId]
    }
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

      return JSON.parse(_get(data, 'data.items.0.SchemaData', '{}'));
    } catch (error) {
      throw new Error(`apiGetFormDataByHsId: ${error}`);
    }
  }

  return {};
};
