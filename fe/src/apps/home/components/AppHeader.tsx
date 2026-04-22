import {
  DownOutlined,
  IdcardOutlined,
  LogoutOutlined,
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
import { Badge, Col, Dropdown } from "antd";
import { useState } from "react";

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
  NavWrap,
  Right,
  StyledRow,
  Wrapper,
} from "./styles/HeaderStyled";

const AppHeader = () => {
  const navigate = useNavigate();
  const { showSuccessNotify } = useNotification();
  const [currentUser, setCurrentUser] = useState(
    lcStorage.get<{ fullName?: string }>(LOCAL_STORAGE_KEYS.user)
  );
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const fullName = currentUser?.fullName?.trim();

  const { data: cartCountResponse } = useCartCountQuery({
    enabled: !!currentUser,
  });

  const cartCount = currentUser ? (cartCountResponse?.data?.count ?? 0) : 0;

  const handleLogout = () => {
    tokenManager.removeAccessToken();
    tokenManager.removeRefreshToken();
    lcStorage.delete(LOCAL_STORAGE_KEYS.user);
    setCurrentUser(undefined);
    showSuccessNotify("Đăng xuất thành công");
    navigate({ to: LOGIN_ROUTE });
  };

  const accountContent = (
    <Account
      style={{ cursor: "pointer" }}
      onClick={!fullName ? () => navigate({ to: LOGIN_ROUTE }) : undefined}
    >
      <UserOutlined style={{ fontSize: 30 }} />
      <AccountText>
        <span className="main">{fullName || "Đăng nhập / Đăng ký"}</span>
        {!fullName && <span className="sub">Tài khoản của tôi</span>}
      </AccountText>
      {fullName && <DownOutlined style={{ fontSize: 12, color: "#666" }} />}
    </Account>
  );

  return (
    <Wrapper>
      <HeaderOverlayStyle />
      <StyledRow align="middle" justify="space-between">
        <Col span={4}>
          <LogoWrapper>
            <Logo src={logo} />
            <Brand>ĐIỆN NƯỚC ONV</Brand>
          </LogoWrapper>
        </Col>

        <Col span={14}>
          <NavWrap>
            <AppNavbar />
          </NavWrap>
        </Col>

        <Col span={6}>
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
                    if (key === "profile") {
                      navigate({ to: USER_PROFILE_ROUTE });
                    }

                    if (key === "logout") {
                      handleLogout();
                    }
                  },
                }}
                trigger={["click"]}
              >
                {accountContent}
              </Dropdown>
            ) : (
              accountContent
            )}

            <Cart onClick={() => setIsOrderModalOpen(true)}>
              <Badge count={cartCount}>
                <ShoppingCartOutlined style={{ fontSize: 30 }} />
              </Badge>
              <span style={{ fontSize: 18 }}>Giỏ hàng</span>
            </Cart>
          </Right>
        </Col>
      </StyledRow>

      <OrderModal
        open={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        onCheckout={() => {}}
      />
    </Wrapper>
  );
};

export default AppHeader;
