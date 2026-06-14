import axiosClient from "@/configs/axios";
import type { IResponse, IResponsePagination } from "@/shared/types/response.type";

type QueryParams = {
  Page?: number;
  PageSize?: number;
  Keyword?: string;
} & Record<string, unknown>;

export type AdminProductInput = {
  sku: string;
  name: string;
  slug: string;
  categoryId: string;
  hotYN?: boolean;
  unit: string;
  importPrice: number;
  salePrice: number;
  stockQuantity?: number;
  minStockLevel?: number;
  description?: string;
  imageUrls?: string[];
};

export type AdminMoveStockInput = {
  productId: string;
  type: "IMPORT" | "EXPORT" | "ADJUST";
  quantity: number;
  note?: string;
  createdById?: string;
};

export type AdminCategoryInput = {
  name: string;
  slug: string;
  description?: string;
};

export type AdminCustomerInput = {
  fullName: string;
  phone?: string;
  email?: string;
  address?: string;
  note?: string;
};

export type AdminUserInput = {
  fullName: string;
  email: string;
  password?: string;
  phone?: string;
  roleId?: string;
  status?: string;
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

export const getInventorySummary = (params: QueryParams = {}) =>
  axiosClient.get<IResponsePagination<any>>("/inventory/summary", { params });

export const getInventoryMovements = (params: QueryParams = {}) =>
  axiosClient.get<IResponsePagination<any>>("/inventory/movements", { params });

export const moveInventoryStock = (payload: AdminMoveStockInput) =>
  axiosClient.post<IResponse<any>>("/inventory/move", payload);

export const getProducts = (params: QueryParams = {}) =>
  axiosClient.get<IResponsePagination<any>>("/products", { params });
export const getProductById = (id: string) =>
  axiosClient.get<IResponse<any>>(`/products/${id}`);

export const createProduct = (payload: AdminProductInput) =>
  axiosClient.post<IResponse<any>>("/products", payload);
export const updateProduct = (id: string, payload: Partial<AdminProductInput>) =>
  axiosClient.patch<IResponse<any>>(`/products/${id}`, payload);
export const deleteProduct = (id: string) =>
  axiosClient.delete<IResponse<any>>(`/products/${id}`);

export const uploadProductImage = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return axiosClient.post<IResponse<{ url: string; filename: string; path: string }>>(
    "/products/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
};

export const getCategories = (params: QueryParams = {}) =>
  axiosClient.get<IResponsePagination<any>>("/categories", { params });
export const getCategoryById = (id: string) =>
  axiosClient.get<IResponse<any>>(`/categories/${id}`);

export const createCategory = (payload: AdminCategoryInput) =>
  axiosClient.post<IResponse<any>>("/categories", payload);
export const updateCategory = (id: string, payload: Partial<AdminCategoryInput>) =>
  axiosClient.patch<IResponse<any>>(`/categories/${id}`, payload);
export const deleteCategory = (id: string, force = false) =>
  axiosClient.delete<IResponse<any>>(`/categories/${id}`, {
    params: force ? { force: true } : undefined,
  });

export const getCustomers = (params: QueryParams = {}) =>
  axiosClient.get<IResponsePagination<any>>("/customers", { params });
export const getCustomerById = (id: string) =>
  axiosClient.get<IResponse<any>>(`/customers/${id}`);

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

export const getUsers = (params: QueryParams = {}) =>
  axiosClient.get<IResponsePagination<any>>("/users", { params });
export const getUserById = (id: string) =>
  axiosClient.get<IResponse<any>>(`/users/${id}`);

export const createUser = (payload: AdminUserInput) =>
  axiosClient.post<IResponse<any>>("/users", payload);

export const updateUser = (id: string, payload: Partial<AdminUserInput>) =>
  axiosClient.patch<IResponse<any>>(`/users/${id}`, payload);

export const deleteUser = (id: string) =>
  axiosClient.delete<IResponse<any>>(`/users/${id}`);

export const getRoles = (params: QueryParams = {}) =>
  axiosClient.get<IResponsePagination<any>>("/roles", { params });
