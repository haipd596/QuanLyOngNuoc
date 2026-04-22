import { Form } from "antd";
import { useState } from "react";
import MainLayout from "@/apps/home/components/MainLayout";
import { LOGIN_ROUTE } from "@/apps/auth/constants";
import { ConfirmDialog, UserSidebar } from "../../component";
import {
  USER_MENU_KEYS,
  USER_ORDER_PENDING_ROUTE,
} from "../../constants";
import { LOCAL_STORAGE_KEYS } from "@/constants";
import useNotification from "@/shared/hooks/useNotification";
import { lcStorage } from "@/shared/utils";
import tokenManager from "@/shared/utils/tokenManager";
import { useNavigate } from "@tanstack/react-router";
import {
  ProfileBasicForm,
  ProfileInsights,
  RecentOrders,
} from "./components";
import {
  HeadingBlock,
  PageDescription,
  PageTitle,
  PageViewport,
  ProfileContainer,
  UserPageContent,
  UserPageLayout,
} from "./styled";

type UserSectionKey =
  | typeof USER_MENU_KEYS.PROFILE
  | typeof USER_MENU_KEYS.ORDER_HISTORY
  | typeof USER_MENU_KEYS.SAVED_ADDRESSES
  | typeof USER_MENU_KEYS.ORDER_PENDING;

const ProfilePage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { showSuccessNotify } = useNotification();
  const [selectedKey, setSelectedKey] = useState<UserSectionKey>(USER_MENU_KEYS.PROFILE);
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

    if (key === USER_MENU_KEYS.ORDER_PENDING) {
      setSelectedKey(key as UserSectionKey);
      navigate({ to: USER_ORDER_PENDING_ROUTE }); 
      return;
    }

    setSelectedKey(key as UserSectionKey);

    const target = document.getElementById(`user-section-${key}`);
    if (!target) {
      return;
    }

    const headerOffset = 110;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  return (
    <MainLayout>
      <PageViewport>
        <UserPageLayout>
          <UserSidebar
            selectedKey={selectedKey}
            onNavigate={handleSidebarNavigate}
          />

          <UserPageLayout>
            <UserPageContent>
              <ProfileContainer>
                <HeadingBlock>
                  <PageTitle>Thông tin cá nhân</PageTitle>
                  <PageDescription>
                    Cập nhật thông tin chi tiết của bạn để có trải nghiệm mua sắm và
                    hỗ trợ kỹ thuật tốt nhất từ Ống Nước Việt.
                  </PageDescription>
                </HeadingBlock>

                <div id={`user-section-${USER_MENU_KEYS.PROFILE}`} style={{ scrollMarginTop: 120 }}>
                  <ProfileBasicForm form={form} />
                </div>

                <div
                  id={`user-section-${USER_MENU_KEYS.ORDER_HISTORY}`}
                  style={{ scrollMarginTop: 120 }}
                >
                  <RecentOrders />
                </div>

                <div
                  id={`user-section-${USER_MENU_KEYS.SAVED_ADDRESSES}`}
                  style={{ scrollMarginTop: 120 }}
                >
                  <ProfileInsights />
                </div>
              </ProfileContainer>
            </UserPageContent>
          </UserPageLayout>
        </UserPageLayout>
      </PageViewport>

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

export default ProfilePage;
