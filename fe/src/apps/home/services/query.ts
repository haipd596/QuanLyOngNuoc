import { useQuery, type UseQueryOptions, type UseQueryResult } from 'react-query';
import { getCartCount, getGioHang } from './api';
import type { ICart, ICartCount } from './types';
import type { IResponse, IResponsePagination } from '@/shared/types/response.type';

export const CART_QUERY_KEY = ['gio-hang'];
export const CART_COUNT_QUERY_KEY = ['gio-hang-count'];

export const useGioHangQuery = (
  options?: UseQueryOptions<IResponsePagination<ICart>>
): UseQueryResult<IResponsePagination<ICart>> => {
  return useQuery({
    queryKey: CART_QUERY_KEY,
    queryFn: () => getGioHang(),
    ...options,
  });
};

export const useCartCountQuery = (
  options?: UseQueryOptions<IResponse<ICartCount>>
): UseQueryResult<IResponse<ICartCount>> => {
  return useQuery({
    queryKey: CART_COUNT_QUERY_KEY,
    queryFn: () => getCartCount(),
    ...options,
  });
};
