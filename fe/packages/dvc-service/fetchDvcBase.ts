import _isObject from 'lodash/isObject';

type TFetchDvcBaseParams = {
  url: string,
  requestInit?: RequestInit
};

export const fetchDvcBase = async ({ url, requestInit }: TFetchDvcBaseParams) => {
  const { headers, ...rest } = requestInit || {};
  let acceptHeader = 'application/json';

  // if (import.meta.env.PROD) {
  acceptHeader = `${acceptHeader}; odata=nometadata`;
  // }
  const extraHeaders = _isObject(headers) ? headers : {};

  try {
    const res = await fetch(url, {
      headers: {
        Accept: acceptHeader,
        ...extraHeaders,
      },
      ...rest,
    });

    const data = await res.json();

    return data;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};
