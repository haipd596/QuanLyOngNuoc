import { useMemo, useState } from "react";
import { Flex } from "antd";
import { useNavigate } from "@tanstack/react-router";

import MainLayout from "@/apps/home/components/MainLayout";
import { LOGIN_ROUTE } from "@/apps/auth/constants";
import { LOCAL_STORAGE_KEYS } from "@/constants";
import useNotification from "@/shared/hooks/useNotification";
import { lcStorage } from "@/shared/utils";
import tokenManager from "@/shared/utils/tokenManager";
import { ConfirmDialog, UserSidebar } from "../../component";
import { USER_MENU_KEYS, USER_PROFILE_ROUTE } from "../../constants";
import { useCancelMyOrderMutation, useMyOrderByIdQuery, useMyOrdersQuery } from "../../services";
import {
  HistoryContainer,
  HistoryContent,
  HistoryGrid,
  HistoryLayout,
  HistoryViewport,
  LeftColumn,
  RightColumn,
} from "./styled";
import {
  BenefitSection,
  DeliveryStatus,
  JourneyHistory,
  OrderHeader,
  OrderInfo,
  PaymentSummary,
  ProductsList,
} from "./components";

const formatCurrency = (v: string | number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(Number(v || 0));

const OrderPendingPage = () => {
  const navigate = useNavigate();
  const { showSuccessNotify, showErrorNotify } = useNotification();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const latestOrderId = localStorage.getItem("latest_user_order_id") || undefined;
  const { data: ordersRes } = useMyOrdersQuery({ Page: 1, PageSize: 10 });
  const fallbackOrderId = ordersRes?.data?.[0]?.id;
  const activeOrderId = latestOrderId || fallbackOrderId;

  const { data: orderRes, refetch } = useMyOrderByIdQuery(activeOrderId);
  const cancelMutation = useCancelMyOrderMutation();

  const order = orderRes?.data;

  const handleLogout = () => {
    tokenManager.removeAccessToken();
    tokenManager.removeRefreshToken();
    lcStorage.delete(LOCAL_STORAGE_KEYS.user);
    showSuccessNotify("Ðang xu?t thành công");
    navigate({ to: LOGIN_ROUTE });
  };

  const handleSidebarNavigate = (key: string) => {
    if (key === USER_MENU_KEYS.LOGOUT) {
      setIsLogoutDialogOpen(true);
      return;
    }
    if (key === USER_MENU_KEYS.PROFILE) {
      navigate({ to: USER_PROFILE_ROUTE });
    }
  };

  const products = useMemo(() => {
    if (!order?.items) return [];
    return order.items.map((item) => ({
      id: item.id,
      image:
        item.product?.images?.find((i) => i.isMain)?.imageUrl ||
        item.product?.images?.[0]?.imageUrl ||
        "https://via.placeholder.com/80",
      name: item.product?.name || "S?n ph?m",
      code: item.product?.sku || "N/A",
      quantity: `${item.quantity}`,
      price: formatCurrency(item.subtotal),
      warranty: "",
    }));
  }, [order]);

  const canCancel = ["PENDING", "CONFIRMED"].includes(order?.orderStatus || "");

  return (
    <MainLayout>
      <HistoryViewport>
        <HistoryLayout>
          <UserSidebar selectedKey={USER_MENU_KEYS.ORDER_PENDING} onNavigate={handleSidebarNavigate} />

          <HistoryLayout>
            <HistoryContent>
              <HistoryContainer>
                <OrderHeader
                  orderNumber={order?.orderCode || "N/A"}
                  orderDate={order ? new Date(order.createdAt).toLocaleDateString("vi-VN") : "--"}
                  orderTime={order ? new Date(order.createdAt).toLocaleTimeString("vi-VN") : "--"}
                />

                <DeliveryStatus />

                <HistoryGrid>
                  <LeftColumn>
                    <Flex vertical gap={24}>
                      <ProductsList products={products} totalCount={products.length} />

                      <JourneyHistory
                        items={[
                          {
                            time: order ? new Date(order.createdAt).toLocaleString("vi-VN") : "",
                            title: `Tr?ng thái: ${order?.orderStatus || "PENDING"}`,
                            description: "Ðon hàng dang du?c x? lý.",
                          },
                        ]}
                      />
                    </Flex>
                  </LeftColumn>

                  <RightColumn>
                    <Flex vertical gap={24}>
                      <OrderInfo
                        recipientName={order?.customer?.fullName || order?.guestName || "Khách hàng"}
                        phone={order?.customer?.phone || order?.guestPhone || ""}
                        address={order?.customer?.address || order?.guestAddress || ""}
                        note={order?.note || "Không có ghi chú"}
                      />

                      <PaymentSummary
                        subtotal={formatCurrency(order?.totalAmount || 0)}
                        shippingFee={formatCurrency(order?.shippingFee || 0)}
                        discount={`-${formatCurrency(order?.discountAmount || 0)}`}
                        total={formatCurrency(order?.finalAmount || 0)}
                      />

                      {canCancel && (
                        <button
                          style={{ padding: 10, borderRadius: 8, border: "1px solid var(--primary)", color: "var(--primary)", background: "#fff", cursor: "pointer" }}
                          onClick={async () => {
                            if (!order?.id) return;
                            try {
                              await cancelMutation.mutateAsync(order.id);
                              showSuccessNotify("Ðã h?y don hàng");
                              await refetch();
                            } catch {
                              showErrorNotify("Không th? h?y don hàng");
                            }
                          }}
                        >
                          H?y don hàng
                        </button>
                      )}

                      <BenefitSection points={Math.floor(Number(order?.finalAmount || 0) / 1000)} />
                    </Flex>
                  </RightColumn>
                </HistoryGrid>
              </HistoryContainer>
            </HistoryContent>
          </HistoryLayout>
        </HistoryLayout>
      </HistoryViewport>

      <ConfirmDialog
        open={isLogoutDialogOpen}
        onCancel={() => setIsLogoutDialogOpen(false)}
        onConfirm={() => {
          setIsLogoutDialogOpen(false);
          handleLogout();
        }}
      />
    </MainLayout>
  );
};

export default OrderPendingPage;
