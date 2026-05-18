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
import { useCreateMyOrderMutation } from "../../services";
import {
  CustomerInfoSection,
  OrderNoteSection,
  OrderSummaryCard,
  PaymentMethodSection,
  ShippingAddressSection,
  ShippingMethodSection,
} from "./components";
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

const PaymentPage = () => {
  const [form] = Form.useForm();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const navigate = useNavigate();
  const { showErrorNotify, showSuccessNotify } = useNotification();
  const createOrderMutation = useCreateMyOrderMutation();
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
    setIsConfirmOpen(false);
    const values = form.getFieldsValue();
    const city = values.city ? String(values.city) : "";
    const ward = values.ward ? String(values.ward) : "";
    const address = values.address ? String(values.address) : "";

    const items = (cart?.items || []).map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    if (!items.length) {
      showErrorNotify("Gi? hàng dang tr?ng");
      return;
    }

    try {
      const res = await createOrderMutation.mutateAsync({
        fullName: values.fullName,
        phone: values.phone,
        email: values.email,
        address: [address, ward, city].filter(Boolean).join(", "),
        shippingMethod: values.shippingMethod,
        paymentMethod: values.paymentMethod,
        note: values.note,
        items,
      });

      const orderId = res.data?.id;
      if (orderId) {
        localStorage.setItem("latest_user_order_id", orderId);
      }

      showSuccessNotify("Ð?t hàng thành công");
      navigate({ to: USER_ORDER_SUCCESS_ROUTE });
    } catch {
      showErrorNotify("Không th? t?o don hàng");
    }
  };

  return (
    <MainLayout
      breadcrumb={[
        { label: "Trang ch?", href: HOME_ROUTE },
        { label: "Thanh toán" },
      ]}
    >
      <PaymentViewport>
        <PaymentContent>
          <PaymentHeader>
            <PaymentTitle>Thanh toán</PaymentTitle>
            <PaymentDescription>
              Vui lòng ki?m tra l?i thông tin don hàng và d?a ch? nh?n hàng c?a b?n.
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
                  <PaymentMethodSection onSubmit={handleOpenConfirm} />
                </Flex>
              </RightColumn>
            </PaymentGrid>
          </Form>
        </PaymentContent>
      </PaymentViewport>

      <ConfirmDialog
        open={isConfirmOpen}
        title="Xác nh?n d?t hàng"
        description="B?n xác nh?n d?t don hàng này ch??"
        confirmText="Xác nh?n"
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirm}
      />
    </MainLayout>
  );
};

export default PaymentPage;
