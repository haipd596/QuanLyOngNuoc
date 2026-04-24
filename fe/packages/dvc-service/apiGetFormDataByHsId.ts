import { HOSO_ID_PARAM1, HOSO_ID_PARAM2 } from '@packages/constants/commons';
import _get from 'lodash/get';
import axiosClient from "~/configs/axios";
import { fetchDvcBase } from './fetchDvcBase';
import { getBaseDvcApi } from './getBaseUrl';

export const apiGetFormDataByHsId = async (_hsId?: string) => {
  const { search } = window.location;
  const params = new URLSearchParams(search);
  const hsid = _hsId || params.get(HOSO_ID_PARAM1) || params.get(HOSO_ID_PARAM2);

  if (hsid) {
    const title = "mc_HoSo_SchemaData";
    const url = '/eform/common/query';
    const payload = {
      "title": title,
      "filter": `HoSoId=${hsid}  AND TypeForm=0`
    }
    try {
      const rs = await axiosClient.post(url, payload);
      return JSON.parse(_get(rs, 'data.items.0.SchemaData', '{}'));
    } catch (error) {
      throw new Error(`apiGetFormDataByHsId: ${error}`);
    }
  }

  return {};
};

export const apiGetListIdsByHsId = async (_hsId?: string) => {
  const { search } = window.location;
  const params = new URLSearchParams(search);
  const hsid = _hsId || params.get(HOSO_ID_PARAM1) || params.get(HOSO_ID_PARAM2);

  if (hsid) {
    const payload = {
      "title": "mc_GiayToDinhKemHoSo",
      "filter": "HoSoId=@p0",
      "params": [hsid]
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

  return [];
};
