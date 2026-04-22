import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import MainLayout from "@/apps/home/components/MainLayout";
import { LOGIN_ROUTE } from "@/apps/auth/constants";
import { LOCAL_STORAGE_KEYS } from "@/constants";
import useNotification from "@/shared/hooks/useNotification";
import { lcStorage } from "@/shared/utils";
import tokenManager from "@/shared/utils/tokenManager";
import { ConfirmDialog, UserSidebar } from "../../component";
import {
  USER_MENU_KEYS,
  USER_PROFILE_ROUTE,
} from "../../constants";
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
  OrderHeader,
  DeliveryStatus,
  ProductsList,
  JourneyHistory,
  OrderInfo,
  PaymentSummary,
  BenefitSection,
} from "./components";
import { Flex } from "antd";

const OrderPendingPage = () => {
  const navigate = useNavigate();
  const { showSuccessNotify } = useNotification();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

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

  return (
    <MainLayout>
      <HistoryViewport>
        <HistoryLayout>
          <UserSidebar
            selectedKey={USER_MENU_KEYS.ORDER_PENDING}
            onNavigate={handleSidebarNavigate}
          />

          <HistoryLayout>
            <HistoryContent>
              <HistoryContainer>
                <OrderHeader
                  orderNumber="ONV-2024-8892"
                  orderDate="24 tháng 05, 2024"
                  orderTime="14:30"
                />

                <DeliveryStatus />

                <HistoryGrid>
                  <LeftColumn>
                    <Flex vertical gap={24}>
                      <ProductsList
                        products={[
                          {
                            id: "1",
                            image:
                              "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=200&q=80",
                            name: "Ống nhựa PVC Tiền Phong Class 3 - Φ114x3.2mm",
                            code: "TP-PVC-114-C3",
                            quantity: "05 ống",
                            price: "1.250.000đ",
                            warranty: "Bảo hành 12 tháng",
                          },
                          {
                            id: "2",
                            image:
                              "https://images.unsplash.com/photo-1581092919535-7146ff1a5906?auto=format&fit=crop&w=200&q=80",
                            name: "CB Tự Động Panasonic 2P 40A 6kA",
                            code: "PAN-CB-40A",
                            quantity: "02 cái",
                            price: "345.000đ",
                            warranty: "Tem chống giả",
                          },
                          {
                            id: "3",
                            image:
                              "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=200&q=80",
                            name: "Van bi đồng tay gạt MIHA - DN25",
                            code: "MIHA-VAN-25",
                            quantity: "01 cái",
                            price: "480.000đ",
                            warranty: "Tiêu chuẩn BS",
                          },
                        ]}
                        totalCount={3}
                      />

                      <JourneyHistory
                        items={[
                          {
                            time: "Hôm nay 09:00",
                            title: "Đang vận chuyển",
                            description:
                              "Kiện hàng đã rời kho phân phối tại Quận 12, TP.HCM",
                          },
                          {
                            time: "24/05 16:15",
                            title: "Xác nhận đơn hàng",
                            description:
                              "Nhân viên kho đã kiểm tra và đóng gói sản phẩm",
                          },
                          {
                            time: "24/05 14:30",
                            title: "Đã đặt hàng",
                            description:
                              "Hệ thống ghi nhận đơn hàng thành công qua ví MoMo",
                          },
                        ]}
                      />
                    </Flex>
                  </LeftColumn>

                  <RightColumn>
                    <Flex vertical gap={24}>
                      <OrderInfo
                        recipientName="Nguyễn Văn Kiến Trúc"
                        phone="090 * * * * 888"
                        address="456 Đường Lê Lợi, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh"
                        note="Giao trong giờ hành chính, gọi trước 30 phút. Công trình đang thi công tầng 3."
                      />

                      <PaymentSummary
                        subtotal="2.075.000đ"
                        shippingFee="150.000đ"
                        discount="-103.750đ"
                        total="2.121.250đ"
                      />

                      <BenefitSection points={2121} />
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
