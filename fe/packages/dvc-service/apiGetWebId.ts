import { fetchDvcBase } from './fetchDvcBase';
import { getBaseDvcApi } from './getBaseUrl';

export const apiGetWebId = async () => {
  try {
    const url = `${getBaseDvcApi()}/_api/site/id`;
    const data = await fetchDvcBase({ url, requestInit: { method: 'GET' } });

    if (data?.value) return data.value;
    return [];
  } catch (error) {
    throw new Error(`apiGetWebId: ${error}`);
  }
};
