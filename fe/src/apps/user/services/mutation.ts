import { useMutation, useQueryClient, type UseMutationResult } from "react-query";

import type { IResponse } from "@/shared/types/response.type";

import { cancelMyOrder, createMyOrder } from "./api";
import type { IMyCheckoutPayload, IMyOrder } from "./types";
import { USER_MY_ORDER_DETAIL_QUERY_KEY, USER_MY_ORDERS_QUERY_KEY } from "./query";

export const useCreateMyOrderMutation = (): UseMutationResult<
  IResponse<IMyOrder>,
  unknown,
  IMyCheckoutPayload
> => {
  return useMutation({
    mutationFn: createMyOrder,
  });
};

export const useCancelMyOrderMutation = (): UseMutationResult<
  IResponse<IMyOrder>,
  unknown,
  string
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelMyOrder,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries(USER_MY_ORDERS_QUERY_KEY);
      queryClient.invalidateQueries([...USER_MY_ORDER_DETAIL_QUERY_KEY, id]);
    },
  });
};
