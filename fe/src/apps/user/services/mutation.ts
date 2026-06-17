import { useMutation, useQueryClient, type UseMutationResult } from "react-query";

import type { IResponse } from "@/shared/types/response.type";

import { cancelMyOrder, createMyOrder, updateMyProfile, uploadMyOrderBill } from "./api";
import type { ICancelMyOrderPayload, IMyCheckoutPayload, IMyOrder, IUpdateMyProfilePayload, IUserMe } from "./types";
import { USER_ME_QUERY_KEY, USER_MY_ORDER_DETAIL_QUERY_KEY, USER_MY_ORDERS_QUERY_KEY } from "./query";
import { CART_COUNT_QUERY_KEY, CART_QUERY_KEY } from "@/apps/home/services/query";
import {
  CATEGORY_PRODUCT_COUNTS_QUERY_KEY,
  PRODUCT_DETAIL_QUERY_KEY,
  PRODUCT_LIST_QUERY_KEY,
} from "@/apps/home/pages/Products/services";

export const useCreateMyOrderMutation = (): UseMutationResult<
  IResponse<IMyOrder>,
  unknown,
  IMyCheckoutPayload
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMyOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(USER_MY_ORDERS_QUERY_KEY);
      queryClient.invalidateQueries(CART_QUERY_KEY);
      queryClient.invalidateQueries(CART_COUNT_QUERY_KEY);
      queryClient.invalidateQueries(PRODUCT_LIST_QUERY_KEY);
      queryClient.invalidateQueries(PRODUCT_DETAIL_QUERY_KEY);
      queryClient.invalidateQueries(CATEGORY_PRODUCT_COUNTS_QUERY_KEY);
    },
  });
};

export const useCancelMyOrderMutation = (): UseMutationResult<
  IResponse<IMyOrder>,
  unknown,
  ICancelMyOrderPayload
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelMyOrder,
    onSuccess: (_, payload) => {
      queryClient.invalidateQueries(USER_MY_ORDERS_QUERY_KEY);
      queryClient.invalidateQueries([...USER_MY_ORDER_DETAIL_QUERY_KEY, payload.id]);
    },
  });
};

export const useUpdateMyProfileMutation = (): UseMutationResult<
  IResponse<IUserMe>,
  unknown,
  IUpdateMyProfilePayload
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMyProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(USER_ME_QUERY_KEY);
    },
  });
};

export const useUploadMyOrderBillMutation = (): UseMutationResult<
  IResponse<{ url: string; path: string; filename: string }>,
  unknown,
  File
> => {
  return useMutation({
    mutationFn: uploadMyOrderBill,
  });
};
