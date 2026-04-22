import { Button, Layout, Menu } from "antd";
import styled from "styled-components";

const { Sider } = Layout;

export const SidebarWrap = styled(Sider)`
  background: #fff !important;

  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

export const SidebarInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
  padding: 1.6rem 1rem 1.2rem;
`;

export const SidebarLabel = styled.p`
  margin: 0 0 0.2rem;
  color: #b6becb;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

export const SidebarMenu = styled(Menu)`
  border-inline-end: 0 !important;
  background: transparent !important;

  .ant-menu-item,
  .ant-menu-item-danger {
    height: 54px;
    margin: 0 0 0.5rem !important;
    border-radius: 16px;
    color: #68788f;
    font-size: 1.5rem;
    font-weight: 700;
    display: flex;
    align-items: center;
  }

  .ant-menu-item .ant-menu-item-icon,
  .ant-menu-item-danger .ant-menu-item-icon,
  .ant-menu-item .ant-menu-title-content,
  .ant-menu-item-danger .ant-menu-title-content {
    color: inherit;
  }

  .ant-menu-item .ant-menu-item-icon,
  .ant-menu-item-danger .ant-menu-item-icon {
    font-size: 1.5rem;
  }

  .ant-menu-item-selected {
    background: #0b2e59 !important;
    color: #fff !important;
    box-shadow: 0 14px 24px rgba(11, 46, 89, 0.18);
  }

  .ant-menu-item-selected .ant-menu-item-icon,
  .ant-menu-item-selected .ant-menu-title-content {
    color: #fff !important;
  }

  .ant-menu-item-divider {
    margin: 0.7rem 0 0.95rem !important;
    background: #dfe5ee;
  }

  .ant-menu-item-danger {
    color: #d92d20 !important;
  }
`;

export const SupportCard = styled.div`
  margin-top: auto;
  padding: 2rem;
  border-radius: 20px;
  background: linear-gradient(180deg, #0b2e59 0%, #0a2647 100%);
  color: #fff;
  position: relative;
  overflow: hidden;
`;

export const SupportLabel = styled.p`
  margin: 0 0 0.55rem;
  color: rgba(255, 255, 255, 0.72);
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

export const SupportTitle = styled.h4`
  margin: 0 0 1rem;
  color: #fff;
  font-size: 1.35rem;
  font-weight: 800;
  line-height: 1.25;
`;

export const SupportButton = styled(Button)`
  height: 34px;
  padding-inline: 0.95rem;
  border: 0;
  border-radius: 10px;
  background: #c67c2d !important;
  color: #fff !important;
  font-size: 1.2rem;
  font-weight: 800;
  box-shadow: none;
`;
