import axiosClient from "@configs/axios";

import type { IResponse, IResponsePagination } from "@/shared/types/response.type";

import type { IMyCheckoutPayload, IMyOrder, IUserMe } from "./types";

export const getMyProfile = (): Promise<IResponse<IUserMe>> => {
  return axiosClient.get("/auth/me");
};

export const createMyOrder = (
  payload: IMyCheckoutPayload
): Promise<IResponse<IMyOrder>> => {
  return axiosClient.post("/sales-orders/my-checkout", payload);
};

export const getMyOrders = (
  params?: { Page?: number; PageSize?: number }
): Promise<IResponsePagination<IMyOrder>> => {
  return axiosClient.get("/sales-orders/my-orders", { params });
};

export const getMyOrderById = (id: string): Promise<IResponse<IMyOrder>> => {
  return axiosClient.get(`/sales-orders/my-orders/${id}`);
};

export const cancelMyOrder = (id: string): Promise<IResponse<IMyOrder>> => {
  return axiosClient.post(`/sales-orders/my-orders/${id}/cancel`);
};
