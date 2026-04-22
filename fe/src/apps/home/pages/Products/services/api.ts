import axiosClient from '@configs/axios';
import { IAddGioHang, ISanPham, type IDanhMuc, type TFilter } from './types';
import { stringtifyQuery } from '@/shared/utils';
import type { IResponsePagination } from '@/shared/types/response.type';

export const getDanhMuc = (params: TFilter): Promise<IResponsePagination<IDanhMuc>> => {
  const query = stringtifyQuery(params);
  return axiosClient.get(`/categories?${query}`)  
}

export const getSanPham = (params: TFilter): Promise<IResponsePagination<ISanPham>> => {
  const query = stringtifyQuery(params);
  return axiosClient.get(`/products?${query}`)  
}

export const addToCart = (payload: IAddGioHang) => {
  return axiosClient.post('/carts/add', payload);
};