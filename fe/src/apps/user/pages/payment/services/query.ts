import { useQuery, type UseQueryOptions, type UseQueryResult } from "react-query";

import type { IResponsePagination } from "@/shared/types/response.type";

import { getPublicProvinces, getPublicWards } from "./api";
import type { IProvince, IWard } from "./types";

export const PAYMENT_PROVINCES_QUERY_KEY = ["payment-provinces"];
export const PAYMENT_WARDS_QUERY_KEY = ["payment-wards"];

export const usePublicProvincesQuery = (
  options?: UseQueryOptions<IResponsePagination<IProvince>>
): UseQueryResult<IResponsePagination<IProvince>> => {
  return useQuery({
    queryKey: PAYMENT_PROVINCES_QUERY_KEY,
    queryFn: () => getPublicProvinces(),
    ...options,
  });
};

export const usePublicWardsQuery = (
  provinceId?: number,
  options?: UseQueryOptions<IResponsePagination<IWard>>
): UseQueryResult<IResponsePagination<IWard>> => {
  return useQuery({
    queryKey: [...PAYMENT_WARDS_QUERY_KEY, provinceId],
    queryFn: () => getPublicWards(provinceId as number),
    enabled: Boolean(provinceId),
    ...options,
  });
};
