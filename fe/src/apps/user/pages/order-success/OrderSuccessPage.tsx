import MainLayout from "@/apps/home/components/MainLayout";
import { HOME_ROUTE } from "@/apps/home/constants";
import { useMemo } from "react";
import { useMyOrderByIdQuery, useMyOrdersQuery } from "../../services";
import {
  SuccessContent,
  SuccessGrid,
  SuccessViewport,
} from "./styled";
import {
  OrderSuccessDetails,
  OrderSuccessHeader,
  OrderSuccessSummary,
  OrderSuccessSupport,
} from "./components";

const OrderSuccessPage = () => {
  const latestOrderId = localStorage.getItem("latest_user_order_id") || undefined;
  const { data: ordersRes } = useMyOrdersQuery({ Page: 1, PageSize: 10 });

  const fallbackOrderId = ordersRes?.data?.[0]?.id;
  const activeOrderId = latestOrderId || fallbackOrderId;

  const { data: orderRes, isLoading } = useMyOrderByIdQuery(activeOrderId);

  const order = useMemo(() => orderRes?.data, [orderRes]);

  return (
    <MainLayout
      breadcrumb={[
        { label: "Trang chủ", href: HOME_ROUTE },
        { label: "Đặt hàng thành công" },
      ]}
    >
      <SuccessViewport>
        <SuccessContent>
          <OrderSuccessHeader />

          <SuccessGrid>
            <OrderSuccessDetails order={order} loading={isLoading} />
            <OrderSuccessSummary order={order} />
          </SuccessGrid>

          <OrderSuccessSupport />
        </SuccessContent>
      </SuccessViewport>
    </MainLayout>
  );
};

export default OrderSuccessPage;
