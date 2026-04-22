import { CloseOutlined } from "@ant-design/icons";
import { LOGIN_ROUTE } from "@/apps/auth/constants";
import { USER_PAYMENT_ROUTE } from "@/apps/user/constants";
import { LOCAL_STORAGE_KEYS } from "@/constants";
import BaseModal from "@/shared/components/modals";
import useNotification from "@/shared/hooks/useNotification";
import { lcStorage } from "@/shared/utils";
import { useNavigate } from "@tanstack/react-router";
import { Button, Flex, Spin } from "antd";
import { useMemo, useState } from "react";

import {
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from "../services/mutation";
import { useGioHangQuery } from "../services/query";
import type { ICart } from "../services/types";
import {
  CheckoutButton,
  EmptyText,
  ItemDivider,
  ItemMeta,
  ItemName,
  ItemPrice,
  ItemTotal,
  ItemTotalLabel,
  ItemTotalRow,
  ItemTopRow,
  OrderItemCard,
  OrderList,
  OrderModalBody,
  ProductImage,
  QuantityButton,
  QuantityControl,
  QuantitySection,
  QuantityValue,
  RemoveItemButton,
  SummaryCard,
  SummaryLabel,
  SummaryTotal,
  SummaryValue,
} from "./styles/OrderModalStyled";

type OrderModalProps = {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
};

type TOrderItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  image: string;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);

const OrderModal = ({ open, onClose, onCheckout }: OrderModalProps) => {
  const navigate = useNavigate();
  const { showErrorNotify } = useNotification();
  const [pendingProductId, setPendingProductId] = useState<string | null>(null);

  const currentUser = lcStorage.get(LOCAL_STORAGE_KEYS.user);

  const { data, isLoading } = useGioHangQuery({
    enabled: open && !!currentUser,
  });

  const updateCartItemMutation = useUpdateCartItemMutation();
  const removeCartItemMutation = useRemoveCartItemMutation();

  const cart = useMemo<ICart | null>(() => {
    const payload = data?.data;

    if (Array.isArray(payload)) {
      return payload[0] ?? null;
    }

    return payload ?? null;
  }, [data]);

  const items = useMemo<TOrderItem[]>(() => {
    if (!cart?.items) return [];

    return cart.items.map((item) => {
      const product = item.product;

      const image =
        product.images?.find((i) => i.isMain)?.imageUrl ||
        product.images?.[0]?.imageUrl ||
        "https://via.placeholder.com/80";

      return {
        id: item.id,
        productId: item.productId,
        name: product.name,
        price: Number(product.salePrice) || 0,
        quantity: item.quantity,
        unit: product.unit,
        image,
      };
    });
  }, [cart]);

  const totalQuantity = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const isMutatingCart =
    updateCartItemMutation.isLoading || removeCartItemMutation.isLoading;

  const handleRemoveItem = (productId: string) => {
    setPendingProductId(productId);

    removeCartItemMutation.mutate(productId, {
      onError: () => {
        showErrorNotify("Không thể xóa sản phẩm khỏi giỏ hàng");
        setPendingProductId(null);
      },
      onSuccess: () => {
        setPendingProductId(null);
      },
    });
  };

  const handleQuantityChange = (item: TOrderItem, delta: number) => {
    const nextQuantity = item.quantity + delta;

    if (nextQuantity <= 0) {
      handleRemoveItem(item.productId);
      return;
    }

    setPendingProductId(item.productId);

    updateCartItemMutation.mutate(
      {
        productId: item.productId,
        payload: {
          quantity: nextQuantity,
        },
      },
      {
        onError: () => {
          showErrorNotify("Không thể cập nhật số lượng sản phẩm");
          setPendingProductId(null);
        },
        onSuccess: () => {
          setPendingProductId(null);
        },
      }
    );
  };

  const handleCheckout = () => {
    if (!currentUser) {
      showErrorNotify("Vui lòng đăng nhập");
      return;
    }

    onClose();
    onCheckout();
    navigate({ to: USER_PAYMENT_ROUTE });
  };

  return (
    <BaseModal
      open={open}
      onCancel={onClose}
      hideModal={onClose}
      title="Giỏ hàng"
      width={700}
      footer={null}
    >
      <OrderModalBody>
        {!currentUser ? (
          <Flex
            vertical
            gap={16}
            align="center"
            justify="center"
            style={{ minHeight: 300 }}
          >
            <EmptyText>
              Vui lòng đăng nhập để hiển thị danh sách đơn hàng
            </EmptyText>
            <Button
              type="primary"
              size="large"
              onClick={() => navigate({ to: LOGIN_ROUTE })}
            >
              Đi đến trang đăng nhập
            </Button>
          </Flex>
        ) : isLoading ? (
          <Flex justify="center" align="center" style={{ minHeight: 300 }}>
            <Spin />
          </Flex>
        ) : items.length > 0 ? (
          <>
            <OrderList>
              {items.map((item) => {
                const isPending = isMutatingCart && pendingProductId === item.productId;

                return (
                  <OrderItemCard key={item.id}>
                    <ItemTopRow>
                      <ProductImage src={item.image} alt={item.name} />

                      <Flex vertical flex={1} style={{ minWidth: 240 }} gap={6}>
                        <ItemName level={5}>{item.name}</ItemName>
                        <ItemMeta>{item.unit}</ItemMeta>
                        <ItemPrice>{formatCurrency(item.price)}</ItemPrice>
                      </Flex>

                      <RemoveItemButton
                        aria-label={`Xóa ${item.name}`}
                        icon={<CloseOutlined />}
                        onClick={() => handleRemoveItem(item.productId)}
                        disabled={isPending}
                      />
                    </ItemTopRow>

                    <ItemDivider />

                    <Flex
                      justify="space-between"
                      align="center"
                      gap={16}
                      wrap="wrap"
                    >
                      <QuantitySection>
                        <QuantityControl>
                          <QuantityButton
                            type="primary"
                            onClick={() => handleQuantityChange(item, -1)}
                            disabled={isPending}
                          >
                            -
                          </QuantityButton>

                          <QuantityValue>{item.quantity}</QuantityValue>

                          <QuantityButton
                            type="primary"
                            onClick={() => handleQuantityChange(item, 1)}
                            disabled={isPending}
                          >
                            +
                          </QuantityButton>
                        </QuantityControl>
                      </QuantitySection>

                      <ItemTotalRow>
                        <ItemTotalLabel>Tổng tiền:</ItemTotalLabel>
                        <ItemTotal>
                          {formatCurrency(item.price * item.quantity)}
                        </ItemTotal>
                      </ItemTotalRow>
                    </Flex>
                  </OrderItemCard>
                );
              })}
            </OrderList>

            <SummaryCard>
              <Flex justify="space-between">
                <SummaryLabel>Số lượng sản phẩm</SummaryLabel>
                <SummaryValue>{totalQuantity}</SummaryValue>
              </Flex>

              <Flex justify="space-between">
                <SummaryTotal>Tổng thanh toán</SummaryTotal>
                <SummaryTotal>{formatCurrency(totalPrice)}</SummaryTotal>
              </Flex>
            </SummaryCard>

            <CheckoutButton size="large" onClick={handleCheckout}>
              Thanh toán
            </CheckoutButton>
          </>
        ) : (
          <EmptyText>Chưa có sản phẩm nào trong giỏ hàng.</EmptyText>
        )}
      </OrderModalBody>
    </BaseModal>
  );
};

export default OrderModal;
