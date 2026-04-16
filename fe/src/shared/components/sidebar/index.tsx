import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useLocation } from "@tanstack/react-router";
import { Button, Menu } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { SidebarWrapper } from "./styled";
import type { SidebarProps } from "./types";
import useHandle from "./useHandle";

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggle,
  menuItems,
  title = "",
}) => {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const { findParents, handleMenuClick, renderCollapsedMenuItem } = useHandle();
  const initializedRef = useRef(false);

  useEffect(() => {
    // if (initializedRef.current) return;

    const currentPath = location.pathname + location.search;
    const parentKeys = findParents(menuItems, currentPath) || [];

    setSelectedKeys(parentKeys);
    setOpenKeys(parentKeys.slice(0, -1));

    initializedRef.current = true;
  }, [menuItems, location.pathname, location.search]);

  return (
    <SidebarWrapper collapsed={collapsed}>
      <div className="sidebar-header">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggle}
          className="collapse-btn"
        />
        {!collapsed && <div className="sidebar-header-title">{title}</div>}
      </div>

      {collapsed ? (
        <div className="collapsed-icons">
          {menuItems?.map(renderCollapsedMenuItem)}
        </div>
      ) : (
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={(keys) => setOpenKeys(keys as string[])}
          items={menuItems as any}
          onClick={(e) => handleMenuClick(e as any)}
          className="sidebar-menu"
        />
      )}
    </SidebarWrapper>
  );
};
export default Sidebar;
