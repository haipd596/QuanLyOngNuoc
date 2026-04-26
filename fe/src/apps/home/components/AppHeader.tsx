import {
  DownOutlined,
  IdcardOutlined,
  LogoutOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import logo from "@/assets/icons/logo.png";
import { LOGIN_ROUTE } from "@/apps/auth/constants";
import { USER_PROFILE_ROUTE } from "@/apps/user/constants";
import { LOCAL_STORAGE_KEYS } from "@/constants";
import useNotification from "@/shared/hooks/useNotification";
import { lcStorage } from "@/shared/utils";
import tokenManager from "@/shared/utils/tokenManager";
import { useNavigate } from "@tanstack/react-router";
import { Badge, Col, Dropdown, Drawer } from "antd";
import { useState } from "react";

import { publicNavigationItems } from "../constants/navigation";
import { useCartCountQuery } from "../services/query";
import AppNavbar from "./AppNavBar";
import OrderModal from "./OrderModal";
import {
  Account,
  AccountText,
  Brand,
  Cart,
  HeaderOverlayStyle,
  Logo,
  LogoWrapper,
  MobileMenuButton,
  MobileNavButton,
  MobileNavList,
  NavWrap,
  Right,
  StyledRow,
  Wrapper,
} from "./styles/HeaderStyled";

const AppHeader = () => {
  const navigate = useNavigate();
  const { showSuccessNotify } = useNotification();
  const [currentUser, setCurrentUser] = useState(
    lcStorage.get<{ fullName?: string }>(LOCAL_STORAGE_KEYS.user),
  );
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const fullName = currentUser?.fullName?.trim();

  const { data: cartCountResponse } = useCartCountQuery({
    enabled: !!currentUser,
  });

  const cartCount = currentUser ? (cartCountResponse?.data?.count ?? 0) : 0;

  const goTo = (to: string) => {
    navigate({ to });
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    tokenManager.removeAccessToken();
    tokenManager.removeRefreshToken();
    lcStorage.delete(LOCAL_STORAGE_KEYS.user);
    setCurrentUser(undefined);
    showSuccessNotify("Đăng xuất thành công");
    navigate({ to: LOGIN_ROUTE });
  };

  const accountContent = (
    <Account onClick={!fullName ? () => navigate({ to: LOGIN_ROUTE }) : undefined}>
      <UserOutlined style={{ fontSize: 24 }} />
      <AccountText>
        <span className="main">{fullName || "Đăng nhập"}</span>
        {!fullName && <span className="sub">Tài khoản của tôi</span>}
      </AccountText>
      {fullName && <DownOutlined style={{ fontSize: 12, color: "#667085" }} />}
    </Account>
  );

  return (
    <Wrapper>
      <HeaderOverlayStyle />
      <StyledRow align="middle" justify="space-between" wrap={false}>
        <Col flex="260px">
          <LogoWrapper onClick={() => goTo("/")}>
            <Logo src={logo} alt="Điện nước ONV" />
            <Brand>
              <span>ĐIỆN NƯỚC</span>
              <strong>ONV</strong>
            </Brand>
          </LogoWrapper>
        </Col>

        <Col flex="auto">
          <NavWrap>
            <AppNavbar />
          </NavWrap>
        </Col>

        <Col flex="260px">
          <Right>
            {fullName ? (
              <Dropdown
                placement="bottomRight"
                overlayClassName="header-account-dropdown"
                overlayStyle={{ zIndex: 2000 }}
                menu={{
                  items: [
                    {
                      key: "profile",
                      label: "Thông tin cá nhân",
                      icon: <IdcardOutlined />,
                    },
                    {
                      key: "logout",
                      label: "Đăng xuất",
                      icon: <LogoutOutlined />,
                    },
                  ],
                  onClick: ({ key }) => {
                    if (key === "profile") navigate({ to: USER_PROFILE_ROUTE });
                    if (key === "logout") handleLogout();
                  },
                }}
                trigger={["click"]}
              >
                {accountContent}
              </Dropdown>
            ) : (
              accountContent
            )}

            <Cart onClick={() => setIsOrderModalOpen(true)} aria-label="Giỏ hàng">
              <Badge count={cartCount}>
                <ShoppingCartOutlined style={{ fontSize: 25 }} />
              </Badge>
              <span>Giỏ hàng</span>
            </Cart>

            <MobileMenuButton
              aria-label="Mở menu"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <MenuOutlined />
            </MobileMenuButton>
          </Right>
        </Col>
      </StyledRow>

      <Drawer
        title="Điện nước ONV"
        placement="right"
        width={320}
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      >
        <MobileNavList>
          {publicNavigationItems.map((item) => (
            <MobileNavButton key={item.key} onClick={() => goTo(item.key)}>
              {item.label}
            </MobileNavButton>
          ))}
        </MobileNavList>
      </Drawer>

      <OrderModal
        open={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        onCheckout={() => {}}
      />
    </Wrapper>
  );
};

export default AppHeader;
