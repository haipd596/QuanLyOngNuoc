import MainLayout from "@/apps/home/components/MainLayout";
import { HOME_ROUTE } from "@/apps/home/constants";
import { Flex, Form } from "antd";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { ConfirmDialog } from "../../component";
import { USER_ORDER_SUCCESS_ROUTE } from "../../constants";
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

  const handleOpenConfirm = async () => {
    try {
      await form.validateFields();
      setIsConfirmOpen(true);
    } catch {
      setIsConfirmOpen(false);
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
              Vui lòng kiểm tra lại thông tin đơn hàng và địa chỉ nhận hàng của
              bạn.
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
        title="Xác nhận đặt hàng"
        description="Bạn xác nhận đặt đơn hàng này chứ?"
        confirmText="Xác nhận"
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          setIsConfirmOpen(false);
          navigate({ to: USER_ORDER_SUCCESS_ROUTE });
        }}
      />
    </MainLayout>
  );
};

export default PaymentPage;
