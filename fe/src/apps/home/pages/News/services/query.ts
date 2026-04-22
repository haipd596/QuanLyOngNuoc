import { useQuery, type UseQueryOptions, type UseQueryResult } from 'react-query';
import { getTopicsArticle } from './api';
import type { TFilter } from './types';

export const useTopicsArticleQuery = ( params: TFilter, options?: UseQueryOptions<any>): UseQueryResult<any> => {
  return useQuery({
    queryKey: ['topics-article', params],
    queryFn: () => getTopicsArticle(params),
    ...options,
  });
};

