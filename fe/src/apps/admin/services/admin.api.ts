import axiosClient from "@/configs/axios";
import type { IResponse, IResponsePagination } from "@/shared/types/response.type";

type QueryParams = {
  Page?: number;
  PageSize?: number;
  Keyword?: string;
};

export type AdminProductInput = {
  sku: string;
  name: string;
  slug: string;
  unit: string;
  importPrice: number;
  salePrice: number;
  stockQuantity?: number;
  minStockLevel?: number;
  description?: string;
};

export type AdminCustomerInput = {
  fullName: string;
  phone?: string;
  email?: string;
  address?: string;
  note?: string;
};

export const getAdminDashboard = () =>
  axiosClient.get<IResponse<any>>("/reports/dashboard");

export const getSalesOverview = (from?: string, to?: string) =>
  axiosClient.get<IResponse<any>>("/reports/sales-overview", { params: { from, to } });
export const getRevenueTrend = (days = 7) =>
  axiosClient.get<IResponse<any>>("/reports/revenue-trend", { params: { days } });
export const getOrderStatusSummary = (days = 30) =>
  axiosClient.get<IResponse<any>>("/reports/order-status-summary", { params: { days } });

export const getInventoryAudit = (params: QueryParams = {}) =>
  axiosClient.get<IResponse<any>>("/reports/inventory-audit", { params });

export const getProducts = (params: QueryParams = {}) =>
  axiosClient.get<IResponsePagination<any>>("/products", { params });

export const createProduct = (payload: AdminProductInput) =>
  axiosClient.post<IResponse<any>>("/products", payload);
export const updateProduct = (id: string, payload: Partial<AdminProductInput>) =>
  axiosClient.patch<IResponse<any>>(`/products/${id}`, payload);
export const deleteProduct = (id: string) =>
  axiosClient.delete<IResponse<any>>(`/products/${id}`);

export const getCustomers = (params: QueryParams = {}) =>
  axiosClient.get<IResponsePagination<any>>("/customers", { params });

export const createCustomer = (payload: AdminCustomerInput) =>
  axiosClient.post<IResponse<any>>("/customers", payload);
export const updateCustomer = (id: string, payload: Partial<AdminCustomerInput>) =>
  axiosClient.patch<IResponse<any>>(`/customers/${id}`, payload);
export const deleteCustomer = (id: string) =>
  axiosClient.delete<IResponse<any>>(`/customers/${id}`);

export const getSalesOrders = (params: QueryParams = {}) =>
  axiosClient.get<IResponsePagination<any>>("/sales-orders", { params });

export const updateOrderStatus = (id: string, orderStatus: string) =>
  axiosClient.patch<IResponse<any>>(`/sales-orders/${id}/status`, { orderStatus });
