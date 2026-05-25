import MainLayout from "@/apps/home/components/MainLayout";
import { HOME_ROUTE } from "@/apps/home/constants";
import { useGioHangQuery } from "@/apps/home/services/query";
import type { ICart } from "@/apps/home/services/types";
import useNotification from "@/shared/hooks/useNotification";
import { Flex, Form } from "antd";
import { useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { ConfirmDialog } from "../../component";
import { USER_ORDER_SUCCESS_ROUTE } from "../../constants";
import { useCreateMyOrderMutation, useUploadMyOrderBillMutation } from "../../services";
import {
  CustomerInfoSection,
  OrderNoteSection,
  OrderSummaryCard,
  PaymentMethodSection,
  ShippingAddressSection,
  ShippingMethodSection,
} from "./components";
import { getShippingFee } from "./shipping";
import {
  LeftColumn,
  PaymentContent,
  PaymentDescription,
  PaymentGrid,
  PaymentHeader,
  PaymentTitle,
  PaymentViewport,
  RightColumn,
} from "./styled";

type LabelValue = {
  value?: string | number;
  label?: string;
};

const toLabel = (input: unknown): string => {
  if (input && typeof input === "object" && "label" in (input as LabelValue)) {
    return String((input as LabelValue).label || "");
  }
  return String(input || "");
};

const toApiPaymentMethod = (method: string): string => {
  const normalized = String(method || "").toLowerCase();
  if (normalized === "bank") return "BANK_TRANSFER";
  if (normalized === "wallet") return "MOMO";
  if (normalized === "cod") return "COD";
  return method;
};

const PaymentPage = () => {
  const [form] = Form.useForm();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const navigate = useNavigate();
  const { showErrorNotify, showSuccessNotify } = useNotification();
  const createOrderMutation = useCreateMyOrderMutation();
  const uploadBillMutation = useUploadMyOrderBillMutation();
  const { data: cartRes } = useGioHangQuery();

  const cart = useMemo<ICart | null>(() => {
    const payload = cartRes?.data;
    if (Array.isArray(payload)) return payload[0] ?? null;
    return payload ?? null;
  }, [cartRes]);

  const handleOpenConfirm = async () => {
    try {
      await form.validateFields();
      setIsConfirmOpen(true);
    } catch {
      setIsConfirmOpen(false);
    }
  };

  const handleConfirm = async () => {
    if (createOrderMutation.isLoading) {
      return;
    }

    setIsConfirmOpen(false);
    const values = form.getFieldsValue();
    const city = toLabel(values.city);
    const ward = toLabel(values.ward);
    const address = values.address ? String(values.address) : "";

    const items = (cart?.items || []).map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));
    const selectedShippingMethod = String(values.shippingMethod || "standard");
    const selectedPaymentMethod = String(values.paymentMethod || "cod");
    const apiPaymentMethod = toApiPaymentMethod(selectedPaymentMethod);
    const billImageUrl =
      selectedPaymentMethod === "bank" ? String(values.billImageUrl || "").trim() : undefined;
    const shippingFee = getShippingFee(
      selectedShippingMethod,
      selectedPaymentMethod,
      items.length > 0
    );

    if (!items.length) {
      showErrorNotify("Giỏ hàng đang trống");
      return;
    }

    if (selectedPaymentMethod === "bank" && !billImageUrl) {
      showErrorNotify("Vui lòng tải ảnh bill chuyển khoản");
      return;
    }

    try {
      const res = await createOrderMutation.mutateAsync({
        fullName: values.fullName,
        phone: values.phone,
        email: values.email,
        address: [address, ward, city].filter(Boolean).join(", "),
        shippingMethod: values.shippingMethod,
        shippingFee,
        paymentMethod: apiPaymentMethod,
        billImageUrl,
        note: values.note,
        items,
      });

      const orderId = res.data?.id;
      if (orderId) {
        localStorage.setItem("latest_user_order_id", orderId);
      }

      showSuccessNotify("Đặt hàng thành công");
      navigate({ to: USER_ORDER_SUCCESS_ROUTE });
    } catch {
      showErrorNotify("Không thể tạo đơn hàng");
    }
  };

  return (
    <MainLayout
      breadcrumb={[
        { label: "Trang chủ", href: HOME_ROUTE },
        { label: "Thanh toán" },
      ]}
    >
      <PaymentViewport>
        <PaymentContent>
          <PaymentHeader>
            <PaymentTitle>Thanh toán</PaymentTitle>
            <PaymentDescription>
              Vui lòng kiểm tra lại thông tin đơn hàng và địa chỉ nhận hàng của bạn.
            </PaymentDescription>
          </PaymentHeader>

          <Form
            form={form}
            layout="vertical"
            initialValues={{
              shippingMethod: "standard",
              paymentMethod: "cod",
            }}
          >
            <PaymentGrid>
              <LeftColumn>
                <Flex vertical gap={24}>
                  <CustomerInfoSection />
                  <ShippingAddressSection />
                  <ShippingMethodSection />
                  <OrderNoteSection />
                </Flex>
              </LeftColumn>

              <RightColumn>
                <Flex vertical gap={24}>
                  <OrderSummaryCard />
                  <PaymentMethodSection
                    onSubmit={handleOpenConfirm}
                    loading={createOrderMutation.isLoading}
                    uploadingBill={uploadBillMutation.isLoading}
                  onUploadBill={async (file) => {
                      const res = await uploadBillMutation.mutateAsync(file);
                      return String(res.data?.path || res.data?.url || "").trim();
                    }}
                  />
                </Flex>
              </RightColumn>
            </PaymentGrid>
          </Form>
        </PaymentContent>
      </PaymentViewport>

      <ConfirmDialog
        open={isConfirmOpen}
        title="Xác nhận đặt hàng"
        description="Bạn xác nhận đặt đơn hàng này chứ?"
        confirmText="Xác nhận"
        loading={createOrderMutation.isLoading}
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirm}
      />
    </MainLayout>
  );
};

export default PaymentPage;
