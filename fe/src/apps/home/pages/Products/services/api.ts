import axiosClient from '@configs/axios';
import {
  IAddGioHang,
  ISanPham,
  type ICategoryProductCount,
  type IDanhMuc,
  type TFilter,
} from './types';
import { stringtifyQuery } from '@/shared/utils';
import type { IResponse, IResponsePagination } from '@/shared/types/response.type';

const normalizeListParams = (params: TFilter): TFilter => {
  const { page, pageSize, Page, PageSize, ...rest } = params;

  return {
    ...rest,
    Page: Page ?? page,
    PageSize: PageSize ?? pageSize,
  };
};

export const getDanhMuc = (params: TFilter): Promise<IResponsePagination<IDanhMuc>> => {
  const query = stringtifyQuery(normalizeListParams(params));
  return axiosClient.get(`/categories?${query}`)  
}

export const getSanPham = (params: TFilter): Promise<IResponsePagination<ISanPham>> => {
  const query = stringtifyQuery(normalizeListParams(params));
  return axiosClient.get(`/products?${query}`)  
}

export const getSanPhamDetail = (id: string): Promise<IResponse<ISanPham>> => {
  return axiosClient.get(`/products/${id}`);
};

export const getCategoryProductCounts = (): Promise<ICategoryProductCount[]> => {
  return axiosClient.get('/categories/product-counts');
};

export const addToCart = (payload: IAddGioHang) => {
  return axiosClient.post('/carts/add', payload);
};
