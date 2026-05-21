import { useMutation, useQueryClient, type UseMutationResult } from "react-query";

import type { IResponse } from "@/shared/types/response.type";

import { cancelMyOrder, createMyOrder, updateMyProfile } from "./api";
import type { ICancelMyOrderPayload, IMyCheckoutPayload, IMyOrder, IUpdateMyProfilePayload, IUserMe } from "./types";
import { USER_ME_QUERY_KEY, USER_MY_ORDER_DETAIL_QUERY_KEY, USER_MY_ORDERS_QUERY_KEY } from "./query";
import { CART_COUNT_QUERY_KEY, CART_QUERY_KEY } from "@/apps/home/services/query";

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
