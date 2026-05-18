import { useQuery, type UseQueryOptions, type UseQueryResult } from "react-query";

import type { IResponse } from "@/shared/types/response.type";

import { getMyOrderById, getMyOrders, getMyProfile } from "./api";
import type { IMyOrder, IUserMe } from "./types";
import type { IResponsePagination } from "@/shared/types/response.type";

export const USER_ME_QUERY_KEY = ["user-me"];
export const USER_MY_ORDERS_QUERY_KEY = ["user-my-orders"];
export const USER_MY_ORDER_DETAIL_QUERY_KEY = ["user-my-order-detail"];

export const useMyProfileQuery = (
  options?: UseQueryOptions<IResponse<IUserMe>>
): UseQueryResult<IResponse<IUserMe>> => {
  return useQuery({
    queryKey: USER_ME_QUERY_KEY,
    queryFn: () => getMyProfile(),
    ...options,
  });
};

export const useMyOrdersQuery = (
  params?: { Page?: number; PageSize?: number },
  options?: UseQueryOptions<IResponsePagination<IMyOrder>>
): UseQueryResult<IResponsePagination<IMyOrder>> => {
  return useQuery({
    queryKey: [...USER_MY_ORDERS_QUERY_KEY, params?.Page, params?.PageSize],
    queryFn: () => getMyOrders(params),
    ...options,
  });
};

export const useMyOrderByIdQuery = (
  id?: string,
  options?: UseQueryOptions<IResponse<IMyOrder>>
): UseQueryResult<IResponse<IMyOrder>> => {
  return useQuery({
    queryKey: [...USER_MY_ORDER_DETAIL_QUERY_KEY, id],
    queryFn: () => getMyOrderById(id as string),
    enabled: !!id,
    ...options,
  });
};
