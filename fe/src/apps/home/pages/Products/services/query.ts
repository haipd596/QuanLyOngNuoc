import { useQuery, type UseQueryOptions, type UseQueryResult } from 'react-query';
import { getDanhMuc, getSanPham } from './api';
import type { TFilter } from './types';

export const useDanhMucQuery = ( params: TFilter, options?: UseQueryOptions<any>): UseQueryResult<any> => {
  return useQuery({
    queryKey: ['danh-muc', params],
    queryFn: () => getDanhMuc(params),
    ...options,
  });
};

export const useSanPhamQuery = ( params: TFilter, options?: UseQueryOptions<any>): UseQueryResult<any> => {
  return useQuery({
    queryKey: ['san-pham', params],
    queryFn: () => getSanPham(params),
    ...options,
  });
};