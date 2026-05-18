import axiosClient from "@/configs/axios";
import type { IResponse, IResponsePagination } from "@/shared/types/response.type";

type QueryParams = {
  Page?: number;
  PageSize?: number;
  Keyword?: string;
};

export const getSellerDashboard = () => axiosClient.get<IResponse<any>>("/reports/dashboard");
export const getSellerRevenueTrend = (days = 7) =>
  axiosClient.get<IResponse<any>>("/reports/revenue-trend", { params: { days } });
export const getSellerOrders = (params: QueryParams = {}) =>
  axiosClient.get<IResponsePagination<any>>("/sales-orders", { params });
export const updateSellerOrderStatus = (id: string, orderStatus: string) =>
  axiosClient.patch<IResponse<any>>(`/sales-orders/${id}/status`, { orderStatus });

export const getSellerProducts = (params: QueryParams = {}) =>
  axiosClient.get<IResponsePagination<any>>("/products", { params });

export const getInventorySummary = (params: QueryParams = {}) =>
  axiosClient.get<IResponsePagination<any>>("/inventory/summary", { params });

export const getSalesOverview = (from?: string, to?: string) =>
  axiosClient.get<IResponse<any>>("/reports/sales-overview", { params: { from, to } });
