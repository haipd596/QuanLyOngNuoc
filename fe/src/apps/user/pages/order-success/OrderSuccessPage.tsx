import MainLayout from "@/apps/home/components/MainLayout";
import { HOME_ROUTE } from "@/apps/home/constants";
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
            <OrderSuccessDetails />
            <OrderSuccessSummary />
          </SuccessGrid>

          <OrderSuccessSupport />
        </SuccessContent>
      </SuccessViewport>
    </MainLayout>
  );
};

export default OrderSuccessPage;
