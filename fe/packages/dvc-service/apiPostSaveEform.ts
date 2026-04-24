import { fetchDvcBase } from './fetchDvcBase';
import { getBaseDvcApi } from './getBaseUrl';

export const apiPostSaveEform = async (body:any) => {
  const url = `${getBaseDvcApi()}/api/v1/eform/save`;
  try {
    const data = await fetchDvcBase({
      url,
      requestInit: {
        method: 'POST',
        headers: {
          "Content-Type": "application/json", 
          Accept: 'application/json; odata=nometadata',
        },
        body: JSON.stringify(body),
      },
    });
    if (data?.data?.id) {
      return data.data;
    }
  } catch (error) {
    throw new Error(`apiGetDuAn: ${error}`);
  }

  return null;
}