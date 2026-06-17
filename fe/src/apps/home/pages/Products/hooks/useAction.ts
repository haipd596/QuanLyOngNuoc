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

  const getCartErrorMessage = (error: any) => {
    const message = String(error?.data?.message || error?.message || "");
    const normalized = message.toLowerCase();

    if (normalized.includes("tồn kho") || normalized.includes("ton kho")) {
      return message;
    }

    return "Số lượng tồn kho không đủ";
  };

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
      onError: (error: any) => {
        showErrorNotify(getCartErrorMessage(error));
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
