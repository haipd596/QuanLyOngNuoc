import { Divider, Empty, Form, Spin } from "antd";
import { useMemo } from "react";

import { useGioHangQuery } from "@/apps/home/services/query";
import type { ICart } from "@/apps/home/services/types";

import { SHIPPING_METHOD_FEES } from "../shipping";
import {
  PriceRow,
  SummaryCard,
  SummaryImage,
  SummaryItem,
  SummaryItemContent,
  SummaryItemPrice,
  SummaryItemQuantity,
  SummaryItemTitle,
  SummaryTitle,
  TotalPrice,
  TotalRow,
} from "../styled";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);

const OrderSummaryCard = () => {
  const form = Form.useFormInstance();
  const shippingMethod = Form.useWatch("shippingMethod", form);
  const { data, isLoading } = useGioHangQuery();

  const cart = useMemo<ICart | null>(() => {
    const payload = data?.data;

    if (Array.isArray(payload)) {
      return payload[0] ?? null;
    }

    return payload ?? null;
  }, [data]);

  const items = useMemo(() => {
    if (!cart?.items) return [];

    return cart.items.map((item) => {
      const product = item.product;
      const image =
        product.images?.find((i) => i.isMain)?.imageUrl ||
        product.images?.[0]?.imageUrl ||
        "https://via.placeholder.com/80";

      return {
        id: item.id,
        name: product.name,
        price: Number(product.salePrice) || 0,
        quantity: item.quantity,
        image,
      };
    });
  }, [cart]);

  const subTotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const shippingFee =
    items.length > 0
      ? SHIPPING_METHOD_FEES[shippingMethod as keyof typeof SHIPPING_METHOD_FEES] ??
        SHIPPING_METHOD_FEES.standard
      : 0;

  const total = subTotal + shippingFee;

  return (
    <SummaryCard bordered={false}>
      <SummaryTitle>Tóm tắt đơn hàng</SummaryTitle>

      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "24px 0" }}>
          <Spin />
        </div>
      ) : items.length === 0 ? (
        <Empty description="Chưa có sản phẩm trong giỏ hàng" />
      ) : (
        <>
          {items.map((item) => (
            <SummaryItem key={item.id}>
              <SummaryImage src={item.image} alt={item.name} />
              <SummaryItemContent>
                <SummaryItemTitle>{item.name}</SummaryItemTitle>
                <SummaryItemPrice>{formatCurrency(item.price)}</SummaryItemPrice>
              </SummaryItemContent>
              <SummaryItemQuantity>x{item.quantity}</SummaryItemQuantity>
            </SummaryItem>
          ))}

          <Divider />

          <PriceRow>
            <span>Tạm tính</span>
            <span>{formatCurrency(subTotal)}</span>
          </PriceRow>
          <PriceRow>
            <span>Phí vận chuyển</span>
            <span>{formatCurrency(shippingFee)}</span>
          </PriceRow>
          <TotalRow>
            <span>Tổng cộng</span>
            <TotalPrice>{formatCurrency(total)}</TotalPrice>
          </TotalRow>
        </>
      )}
    </SummaryCard>
  );
};

export default OrderSummaryCard;
