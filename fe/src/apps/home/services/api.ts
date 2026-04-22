import axiosClient from '@configs/axios';
import { ICart, ICartCount, IUpdateCartItemPayload } from './types';
import type { IResponse, IResponsePagination } from '@/shared/types/response.type';

export const getGioHang = (): Promise<IResponsePagination<ICart>> => {
  return axiosClient.get('/carts')  
}

export const getCartCount = (): Promise<IResponse<ICartCount>> => {
  return axiosClient.get('/carts/count');
};

export const updateCartItem = (
  productId: string,
  payload: IUpdateCartItemPayload
): Promise<IResponse<null>> => {
  return axiosClient.patch(`/carts/update/${productId}`, payload);
};

export const removeCartItem = (productId: string): Promise<IResponse<null>> => {
  return axiosClient.delete(`/carts/remove/${productId}`);
};
