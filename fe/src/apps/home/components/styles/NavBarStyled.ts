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
    padding: 0 8px !important;
    color: #2f2f2f;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  .ant-menu-item:hover,
  .ant-menu-submenu-title:hover {
    color: #ba8b2d !important;
  }

  .ant-menu-item-selected,
  .ant-menu-submenu-selected > .ant-menu-submenu-title {
    color: #ba8b2d !important;
  }

  &.ant-menu-horizontal > .ant-menu-item::after,
  &.ant-menu-horizontal > .ant-menu-submenu::after {
    border-bottom: none !important;
  }

  .ant-menu-sub {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 14px 34px rgba(30, 24, 15, 0.12);
    padding: 8px;
  }

  .ant-menu-sub .ant-menu-item {
    height: auto;
    padding: 10px 14px !important;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    text-transform: none;
    letter-spacing: 0;
  }

  .ant-menu-sub .ant-menu-item:hover {
    background: #f7f1e5;
    color: #ba8b2d !important;
  }
`;
