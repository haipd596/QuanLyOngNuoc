export const SHIPPING_METHOD_FEES: Record<string, number> = {
  standard: 25000,
  express: 55000,
};

const FREE_SHIPPING_PAYMENT_METHODS = new Set(["bank", "wallet"]);

export const getShippingFee = (
  shippingMethod: string,
  paymentMethod: string,
  hasItems: boolean
) => {
  if (!hasItems) return 0;
  if (FREE_SHIPPING_PAYMENT_METHODS.has(paymentMethod)) return 0;

  return (
    SHIPPING_METHOD_FEES[shippingMethod as keyof typeof SHIPPING_METHOD_FEES] ??
    SHIPPING_METHOD_FEES.standard
  );
};
