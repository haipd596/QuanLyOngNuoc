import { Schema } from '@packages/main/Forms';
import axiosClient from "~/configs/axios";
import { DEMO_VIEWER } from '~/pages/ViewPage/demo';
import { fetchDvcBase } from './fetchDvcBase';
import { getBaseDvcApi } from './getBaseUrl';

export const apiGetSchemaByTthcId = async (_tthcid?: string) => { 
  const params = new URL(window.location.href).searchParams;
  const tthcid = _tthcid || params.get('tthcId') || params.get('tthcid') || params.get('dichVuCongId');;
  
  const title = "dm_FormTiepNhanThuTuc";
  const url = '/eform/common/query';
  let payload = {
    "title": title,
    "filter": `ThuTucId=${tthcid}  AND TypeForm=0`,
  }
  
  if (tthcid) {
    try {
      const rs = await axiosClient.post(url, payload);
      if (rs?.data?.items?.length > 0) {
        const schemaJson = new Schema(JSON.parse(rs?.data?.items[0]?.SchemaEform));
        return schemaJson;
      }
    } catch (error) {
      throw new Error(`apiGetSchemaByTthcId: ${error}`);
    }
  }

  return DEMO_VIEWER;
};

export const apiGetByTthcId = async () => {
  const params = new URL(window.location.href).searchParams;
  const tthcid = params.get('tthcId');
  const payload = {
    "title": "dm_ThuTucHanhChinh",
    "filter": "Id=@p0",
    "params": [tthcid]
  }
  const url = `${getBaseDvcApi()}/api/v1/common/query`;

  if (tthcid) {
    try {
      const data = await fetchDvcBase({ url, requestInit: { 
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
            accept: 'application/json;odata=nometadata'
          },
          body: JSON.stringify(payload) } 
      });

      if (data?.data?.items?.length > 0) return data?.data?.items[0];
      return {};
    } catch (error) {
      throw new Error(`apiGetByTthcId: ${error}`);
    }
  }

  return {};
};
