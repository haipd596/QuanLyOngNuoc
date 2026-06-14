import { useQuery, type UseQueryOptions, type UseQueryResult } from 'react-query';
import { getCategoryProductCounts, getDanhMuc, getSanPham, getSanPhamDetail } from './api';
import type { ISanPham, TFilter } from './types';
import type { IResponse } from '@/shared/types/response.type';

export const PRODUCT_LIST_QUERY_KEY = 'san-pham';
export const PRODUCT_DETAIL_QUERY_KEY = 'san-pham-detail';
export const CATEGORY_PRODUCT_COUNTS_QUERY_KEY = 'category-product-counts';

export const useDanhMucQuery = ( params: TFilter, options?: UseQueryOptions<any>): UseQueryResult<any> => {
  return useQuery({
    queryKey: ['danh-muc', params],
    queryFn: () => getDanhMuc(params),
    ...options,
  });
};

export const useSanPhamQuery = ( params: TFilter, options?: UseQueryOptions<any>): UseQueryResult<any> => {
  return useQuery({
    queryKey: [PRODUCT_LIST_QUERY_KEY, params],
    queryFn: () => getSanPham(params),
    ...options,
  });
};

export const useSanPhamDetailQuery = (
  id?: string,
  options?: UseQueryOptions<IResponse<ISanPham>>,
): UseQueryResult<IResponse<ISanPham>> => {
  return useQuery({
    queryKey: [PRODUCT_DETAIL_QUERY_KEY, id],
    queryFn: () => getSanPhamDetail(id as string),
    enabled: !!id,
    ...options,
  });
};

export const useCategoryProductCountsQuery = (
  options?: UseQueryOptions<any>,
): UseQueryResult<any> => {
  return useQuery({
    queryKey: [CATEGORY_PRODUCT_COUNTS_QUERY_KEY],
    queryFn: () => getCategoryProductCounts(),
    ...options,
  });
};
