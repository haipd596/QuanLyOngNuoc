import { useState } from "react";

import useNotification from "@/shared/hooks/useNotification";

import { IAddGioHang, ISanPham, useAddToCart } from "../services";

export const useAddToCartAction = () => {
  const { mutate, isLoading } = useAddToCart();
  const { showSuccessNotify, showErrorNotify } = useNotification();
  const [pendingProductId, setPendingProductId] = useState<string | null>(null);

  const addProductToCart = (product: ISanPham, quantity: number = 1) => {
    const payload: IAddGioHang = {
      productId: product.id,
      quantity,
    };

    setPendingProductId(product.id);

    mutate(payload, {
      onSuccess: () => {
        showSuccessNotify(`Đã thêm "${product.name}" vào giỏ hàng`);
        setPendingProductId(null);
      },
      onError: () => {
        showErrorNotify("Không thể thêm vào giỏ hàng");
        setPendingProductId(null);
      },
    });
  };

  return {
    addProductToCart,
    isAdding: isLoading,
    pendingProductId,
  };
};
