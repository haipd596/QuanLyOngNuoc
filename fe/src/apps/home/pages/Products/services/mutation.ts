import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";

import {
  CART_COUNT_QUERY_KEY,
  CART_QUERY_KEY,
} from "@/apps/home/services/query";

import { addToCart } from "./api";
import type { IAddGioHang } from "./types";

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IAddGioHang) => addToCart(payload),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries(CART_QUERY_KEY),
        queryClient.invalidateQueries(CART_COUNT_QUERY_KEY),
      ]);

      message.success("Đã thêm vào giỏ hàng");
    },

    onError: () => {
      message.error("Thêm vào giỏ thất bại");
    },
  });
};
