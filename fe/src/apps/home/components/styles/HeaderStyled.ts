import { Row } from "antd";
import styled, { createGlobalStyle } from "styled-components";

export const HeaderOverlayStyle = createGlobalStyle`
  .header-account-dropdown,
  .header-account-dropdown *,
  .ant-menu-submenu-popup,
  .ant-menu-submenu-popup * {
  }

  .header-account-dropdown .ant-dropdown-menu,
  .header-account-dropdown .ant-dropdown-menu-item,
  .header-account-dropdown .ant-dropdown-menu-title-content,
  .header-account-dropdown .ant-dropdown-menu-item-icon,
  .ant-menu-submenu-popup .ant-menu,
  .ant-menu-submenu-popup .ant-menu-item,
  .ant-menu-submenu-popup .ant-menu-title-content,
  .ant-menu-submenu-popup .ant-menu-submenu-title,
  .ant-menu-submenu-popup .ant-menu-item-group-title {
  }
`;

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #eee5d3;
  box-shadow: 0 10px 30px rgba(34, 27, 16, 0.06);
`;

export const HeaderHeight = styled.div`
  height: 84px;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Logo = styled.img`
  width: 54px;
  height: 54px;
  object-fit: contain;
`;

export const Brand = styled.span`
  font-size: 17px;
  font-weight: 700;
  line-height: 1.15;
  color: #1f1f1f;
`;

export const NavWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  padding: 0 24px;
`;

export const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 24px;
`;

export const Account = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

export const AccountText = styled.div`
  display: flex;
  flex-direction: column;

  .main {
    font-size: 18px;
    font-weight: 500;
    color: #1f1f1f;
  }

  .sub {
    font-size: 15px;
    color: #666;
  }
`;

export const Cart = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

export const StyledRow = styled(Row)`
  padding: 0 4.5rem;
  height: 84px;
  align-items: center;
`;
