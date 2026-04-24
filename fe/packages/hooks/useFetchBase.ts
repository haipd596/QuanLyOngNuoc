import { AnyObject } from 'antd/es/_util/type';
import _isArray from 'lodash/isArray';
import { useCallback, useState } from 'react';

export type TFetchBase = {
  action: string,
  searchQueryKey?: string,
  queryParams?: { key: string, value: string }[],
  headers?: { key: string, value: string }[],
};

type TFetchProps = TFetchBase & {
  onError?: (error: any) => void,
  onSuccess?: (error: any) => void,
};

export const useFetchBase = ({
  action,
  queryParams,
  headers,
  searchQueryKey,
  onError,
  onSuccess,
}: TFetchProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchBase = useCallback(async (searchValue?: string) => {
    try {
      if (!action) {
        throw new Error('Action required');
      }
      let method = 'GET';
      setIsLoading(true);
      const url = new URL(action);
      let originUrl:any = url
      let body:any = null
      let contentType:AnyObject = {} 

      if (searchValue && searchQueryKey) {
        if (action.endsWith('&$filter')) {
          // Hỗ trợ search API sharepoint (cấu hình searchQueryKey)
          const filterQuery = `substringof('${searchValue}', ${searchQueryKey})`;

          url.searchParams.delete('$filter');
          url.searchParams.set('$filter', filterQuery);
        } else {
          url.searchParams.append(searchQueryKey, searchValue);
        }
      }

      if (_isArray(queryParams)) {
        queryParams.forEach(({ key, value }) => {
          url.searchParams.append(key, value);
        });
      }
      if(url?.search?.includes("title")) {
        method = "POST";
        originUrl = url.origin + url.pathname;
        const query = url?.search
        const params = Object.fromEntries(
          new URLSearchParams(query)
        );
        const extend:any = {
          "foreignKey": params?.foreignKey,
          "primaryKey": params?.primaryKey,
          "tableName": params?.tableName
        }
        contentType = {"content-type": "application/json; charset=utf-8"}
        body = JSON.stringify({
          title: params.title,
          top: Number(params.top),
          filter: params.filter,
          extend: extend
        });
      }

      const res = await fetch(originUrl, {
        method: method,
        headers: headers?.reduce((acc, cur) => {
          acc[cur.key] = cur.value;
          return acc;
        }, contentType),
        body: body
      });

      if (res?.status > 400) {
        throw new Error(res.statusText || 'Server error');
      }

      const data = await res.json();

      if (onSuccess) {
        onSuccess(data);
      }

      setIsLoading(false);
    } catch (error) {
      if (onError) {
        onError(error);
      }
      setIsLoading(false);
    }
  }, [searchQueryKey, action, onSuccess, onError, JSON.stringify(headers)]);

  return { fetchBase, isLoading };
};
