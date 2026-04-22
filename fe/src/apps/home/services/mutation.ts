import { useMutation, useQueryClient } from "react-query";

import { removeCartItem, updateCartItem } from "./api";
import { CART_COUNT_QUERY_KEY, CART_QUERY_KEY } from "./query";
import type { IUpdateCartItemPayload } from "./types";

export const useUpdateCartItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({
      productId,
      payload,
    }: {
      productId: string;
      payload: IUpdateCartItemPayload;
    }) => updateCartItem(productId, payload),
    {
      onSuccess: async () => {
        await Promise.all([
          queryClient.invalidateQueries(CART_QUERY_KEY),
          queryClient.invalidateQueries(CART_COUNT_QUERY_KEY),
        ]);
      },
    }
  );
};

export const useRemoveCartItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation((productId: string) => removeCartItem(productId), {
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries(CART_QUERY_KEY),
        queryClient.invalidateQueries(CART_COUNT_QUERY_KEY),
      ]);
    },
  });
};
