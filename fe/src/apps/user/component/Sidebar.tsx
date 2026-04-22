import {
  CustomerServiceOutlined,
  EnvironmentOutlined,
  HistoryOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Space } from "antd";
import type { MenuProps } from "antd";
import { USER_MENU_KEYS } from "../constants";
import {
  SidebarInner,
  SidebarLabel,
  SidebarMenu,
  SidebarWrap,
  SupportButton,
  SupportCard,
  SupportLabel,
  SupportTitle,
} from "./styled";

export type UserSidebarItem = NonNullable<MenuProps["items"]>[number];

export interface UserSidebarProps {
  collapsed?: boolean;
  items?: MenuProps["items"];
  selectedKey?: string;
  userName?: string;
  userEmail?: string;
  onNavigate?: (key: string) => void;
}

const defaultItems: MenuProps["items"] = [
  {
    key: USER_MENU_KEYS.PROFILE,
    icon: <UserOutlined />,
    label: "Thông tin cá nhân",
  },
  {
    key: USER_MENU_KEYS.ORDER_HISTORY,
    icon: <HistoryOutlined />,
    label: "Lịch sử đơn hàng",
  },
  {
    key: USER_MENU_KEYS.SAVED_ADDRESSES,
    icon: <EnvironmentOutlined />,
    label: "Địa chỉ đã lưu",
  },
  {
    key: USER_MENU_KEYS.ORDER_PENDING,
    icon: <ProfileOutlined />,
    label: "Đơn hàng đang xử lý",
  },
  {
    type: "divider",
  },
  {
    key: USER_MENU_KEYS.LOGOUT,
    icon: <LogoutOutlined />,
    label: "Đăng xuất",
    danger: true,
  },
];

const UserSidebar = ({
  collapsed = false,
  items = defaultItems,
  selectedKey = USER_MENU_KEYS.PROFILE,
  onNavigate,
}: UserSidebarProps) => {
  return (
    <SidebarWrap
      width={280}
      collapsedWidth={88}
      collapsed={collapsed}
      theme="light"
      trigger={null}
      style={{ height: "100%", background: "#fff" }}
    >
      <SidebarInner>
        {!collapsed && <SidebarLabel>Quản lý tài khoản</SidebarLabel>}

        <SidebarMenu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={items}
          onClick={({ key }) => onNavigate?.(String(key))}
        />

        {!collapsed && (
          <SupportCard>
            <Space
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                color: "rgba(255,255,255,0.12)",
                fontSize: 24,
              }}
            >
              <CustomerServiceOutlined />
              <UserOutlined />
            </Space>
            <SupportLabel>Hỗ trợ kỹ thuật</SupportLabel>
            <SupportTitle>Cần tư vấn vật tư công trình?</SupportTitle>
            <SupportButton type="primary">Gọi ngay: 1900 1234</SupportButton>
          </SupportCard>
        )}
      </SidebarInner>
    </SidebarWrap>
  );
};

export default UserSidebar;
