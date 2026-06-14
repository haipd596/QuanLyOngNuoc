import { useState } from "react";

import { LOCAL_STORAGE_KEYS } from "@/constants";
import useNotification from "@/shared/hooks/useNotification";
import { lcStorage } from "@/shared/utils";
import { canUseCart } from "@/shared/utils/roleAccess";

import { IAddGioHang, ISanPham, useAddToCart } from "../services";

export const useAddToCartAction = () => {
  const { mutate, isLoading } = useAddToCart();
  const { showSuccessNotify, showErrorNotify } = useNotification();
  const [pendingProductId, setPendingProductId] = useState<string | null>(null);

  const addProductToCart = (product: ISanPham, quantity: number = 1) => {
    const currentUser = lcStorage.get<{ role?: string }>(LOCAL_STORAGE_KEYS.user);
    if (!currentUser) {
      showErrorNotify("Vui lòng đăng nhập");
      return;
    }

    if (!canUseCart(currentUser.role)) {
      showErrorNotify("Tài khoản này không được sử dụng giỏ hàng");
      return;
    }

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
