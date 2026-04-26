import { Menu } from "antd";
import styled from "styled-components";

export const StyledMenu = styled(Menu)`
  min-width: 0;
  border-bottom: none !important;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  line-height: 1;

  .ant-menu-overflow {
    justify-content: center;
  }

  .ant-menu-item,
  .ant-menu-submenu-title {
    display: flex;
    align-items: center;
    height: 42px;
    padding: 0 12px !important;
    color: var(--text-primary);
    font-size: 14px;
    font-weight: 700;
  }

  .ant-menu-item:hover,
  .ant-menu-submenu-title:hover,
  .ant-menu-item-selected,
  .ant-menu-submenu-selected > .ant-menu-submenu-title {
    color: var(--primary) !important;
  }

  &.ant-menu-horizontal > .ant-menu-item::after,
  &.ant-menu-horizontal > .ant-menu-submenu::after {
    border-bottom: 2px solid var(--secondary) !important;
  }
`;
