import { useMemo, useState } from "react";
import { Button, Flex, Form, Input, Select, Space } from "antd";
import { useNavigate } from "@tanstack/react-router";

import MainLayout from "@/apps/home/components/MainLayout";
import { LOGIN_ROUTE } from "@/apps/auth/constants";
import { LOCAL_STORAGE_KEYS } from "@/constants";
import useNotification from "@/shared/hooks/useNotification";
import { lcStorage } from "@/shared/utils";
import tokenManager from "@/shared/utils/tokenManager";
import { ORDER_STATUS_LABEL_MAP } from "@/apps/admin/constants/status";
import BaseModal from "@/shared/components/modals";
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

const resolveImageUrl = (imageUrl?: string) => {
  if (!imageUrl) return "https://via.placeholder.com/80";
  if (/^https?:\/\//i.test(imageUrl)) return imageUrl;

  const baseUrl = import.meta.env.VITE_API_URL as string | undefined;
  if (!baseUrl) return imageUrl;

  try {
    const origin = new URL(baseUrl).origin;
    return `${origin}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
  } catch {
    return imageUrl;
  }
};

const OrderPendingPage = () => {
  const navigate = useNavigate();
  const { showSuccessNotify, showErrorNotify } = useNotification();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelForm] = Form.useForm<{ reason: string }>();
  const [selectedOrderId, setSelectedOrderId] = useState<string | undefined>(
    localStorage.getItem("latest_user_order_id") || undefined,
  );

  const { data: ordersRes } = useMyOrdersQuery({ Page: 1, PageSize: 100 });
  const orders = ordersRes?.data || [];
  const fallbackOrderId = orders[0]?.id;
  const activeOrderId = selectedOrderId || fallbackOrderId;

  const { data: orderRes, refetch } = useMyOrderByIdQuery(activeOrderId);
  const cancelMutation = useCancelMyOrderMutation();

  const order = orderRes?.data;

  const handleLogout = () => {
    tokenManager.removeAccessToken();
    tokenManager.removeRefreshToken();
    lcStorage.delete(LOCAL_STORAGE_KEYS.user);
    showSuccessNotify("Đăng xuất thành công");
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
      image: resolveImageUrl(
        item.product?.images?.find((i) => i.isMain)?.imageUrl || item.product?.images?.[0]?.imageUrl,
      ),
      name: item.product?.name || "Sản phẩm",
      code: item.product?.sku || "N/A",
      quantity: `${item.quantity}`,
      price: formatCurrency(item.subtotal),
      warranty: "",
    }));
  }, [order]);

  const orderOptions = useMemo(
    () =>
      orders.map((item) => ({
        value: item.id,
        label: `${item.orderCode} - ${
          ORDER_STATUS_LABEL_MAP[item.orderStatus] || item.orderStatus
        } - ${new Date(item.createdAt).toLocaleString("vi-VN")}`,
      })),
    [orders],
  );

  const canCancel = ["PENDING", "CONFIRMED"].includes(order?.orderStatus || "");

  return (
    <MainLayout>
      <HistoryViewport>
        <HistoryLayout>
          <UserSidebar selectedKey={USER_MENU_KEYS.ORDER_PENDING} onNavigate={handleSidebarNavigate} />

          <HistoryLayout>
            <HistoryContent>
              <HistoryContainer>
                <Select
                  style={{ width: "100%", maxWidth: 760 }}
                  placeholder="Chọn đơn hàng để xem chi tiết"
                  options={orderOptions}
                  value={activeOrderId}
                  onChange={(value) => {
                    setSelectedOrderId(value);
                    localStorage.setItem("latest_user_order_id", value);
                  }}
                />

                <OrderHeader
                  orderNumber={order?.orderCode || "N/A"}
                  orderDate={order ? new Date(order.createdAt).toLocaleDateString("vi-VN") : "--"}
                  orderTime={order ? new Date(order.createdAt).toLocaleTimeString("vi-VN") : "--"}
                />

                <DeliveryStatus orderStatus={order?.orderStatus} />

                <HistoryGrid>
                  <LeftColumn>
                    <Flex vertical gap={24}>
                      <ProductsList products={products} totalCount={products.length} />

                      <JourneyHistory
                        items={[
                          {
                            time: order ? new Date(order.createdAt).toLocaleString("vi-VN") : "",
                            title: `Trạng thái: ${
                              ORDER_STATUS_LABEL_MAP[order?.orderStatus || ""] || order?.orderStatus || "Chờ xử lý"
                            }`,
                            description: "Đơn hàng đang được xử lý.",
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
                        itemCount={products.length}
                      />

                      {canCancel && (
                        <button
                          style={{
                            padding: 10,
                            borderRadius: 8,
                            border: "1px solid var(--primary)",
                            color: "var(--primary)",
                            background: "#fff",
                            cursor: "pointer",
                          }}
                          onClick={() => setIsCancelModalOpen(true)}
                        >
                          Hủy đơn hàng
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

      <BaseModal
        title="Lý do hủy đơn hàng"
        open={isCancelModalOpen}
        onCancel={() => {
          setIsCancelModalOpen(false);
          cancelForm.resetFields();
        }}
        width={640}
        destroyOnClose
        footer={
          <Space size={12}>
            <Button
              onClick={() => {
                setIsCancelModalOpen(false);
                cancelForm.resetFields();
              }}
            >
              Đóng
            </Button>
            <Button
              type="primary"
              danger
              loading={cancelMutation.isLoading}
              onClick={async () => {
                try {
                  const values = await cancelForm.validateFields();
                  if (!order?.id) return;
                  await cancelMutation.mutateAsync({ id: order.id, reason: values.reason });
                  showSuccessNotify("Đã hủy đơn hàng");
                  setIsCancelModalOpen(false);
                  cancelForm.resetFields();
                  await refetch();
                } catch {
                  if (!cancelForm.getFieldValue("reason")) {
                    return;
                  }
                  showErrorNotify("Không thể hủy đơn hàng");
                }
              }}
            >
              Xác nhận hủy
            </Button>
          </Space>
        }
      >
        <Form form={cancelForm} layout="vertical" style={{ paddingTop: 4 }}>
          <Form.Item
            name="reason"
            label="Vui lòng nhập lý do"
            style={{ width: "100%", marginBottom: 0 }}
            rules={[
              { required: true, message: "Vui lòng nhập lý do hủy đơn" },
              { max: 500, message: "Lý do tối đa 500 ký tự" },
            ]}
          >
            <Input.TextArea
              placeholder="Ví dụ: Tôi muốn đổi sản phẩm khác"
              maxLength={500}
              style={{ resize: "none" }}
            />
          </Form.Item>
        </Form>
      </BaseModal>
    </MainLayout>
  );
};

export default OrderPendingPage;
