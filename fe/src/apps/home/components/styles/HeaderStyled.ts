import { Row } from "antd";
import styled, { createGlobalStyle } from "styled-components";

export const HeaderOverlayStyle = createGlobalStyle`
  .header-account-dropdown .ant-dropdown-menu {
    border-radius: 8px;
    box-shadow: 0 16px 42px rgba(15, 23, 42, 0.14);
  }
`;

export const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-secondary);
  box-shadow: 0 8px 28px rgba(15, 23, 42, 0.06);
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  min-width: 0;
`;

export const Logo = styled.img`
  width: 52px;
  height: 52px;
  object-fit: contain;
`;

export const Brand = styled.span`
  display: flex;
  flex-direction: column;
  color: var(--primary);
  font-size: 13px;
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: 0;

  strong {
    color: var(--secondary);
    font-size: 22px;
    letter-spacing: 0;
  }
`;

export const NavWrap = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  padding: 0 20px;
`;

export const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
`;

export const Account = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: var(--text-primary);
  min-width: 0;

  &:hover {
    color: var(--primary);
  }
`;

export const AccountText = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;

  .main {
    font-size: 14px;
    font-weight: 700;
    line-height: 1.2;
    white-space: nowrap;
  }

  .sub {
    font-size: 12px;
    color: var(--text-secondary);
    white-space: nowrap;
  }

  @media (max-width: 960px) {
    display: none;
  }
`;

export const Cart = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  border: 1px solid var(--border-secondary);
  border-radius: 8px;
  background: #fff;
  color: var(--primary);
  height: 40px;
  padding: 0 12px;
  font-weight: 700;

  &:hover {
    border-color: var(--primary);
    background: var(--bg-surface-low);
  }

  span {
    font-size: 14px;
  }

  @media (max-width: 720px) {
    span:not(.ant-badge) {
      display: none;
    }
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid var(--border-secondary);
  background: #fff;
  color: var(--primary);
  cursor: pointer;

  @media (max-width: 860px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;

export const MobileNavList = styled.div`
  display: grid;
  gap: 8px;
`;

export const MobileNavButton = styled.button`
  width: 100%;
  min-height: 46px;
  border: 1px solid var(--border-secondary);
  border-radius: 8px;
  background: #fff;
  color: var(--text-primary);
  font-size: 15px;
  font-weight: 800;
  text-align: left;
  padding: 0 14px;
  cursor: pointer;

  &:hover {
    color: var(--primary);
    border-color: var(--primary);
    background: var(--bg-surface-low);
  }
`;

export const StyledRow = styled(Row)`
  height: 84px;
  align-items: center;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;

  @media (max-width: 860px) {
    ${NavWrap} {
      display: none;
    }
  }

  @media (max-width: 560px) {
    padding: 0 14px;

    ${Logo} {
      width: 44px;
      height: 44px;
    }
  }
`;
