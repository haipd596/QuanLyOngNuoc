import {
  AppstoreOutlined,
  BarChartOutlined,
  BellOutlined,
  HomeOutlined,
  LogoutOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Space } from "antd";
import { Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { LOGIN_ROUTE } from "@/apps/auth/constants";
import {
  ADMIN_CUSTOMERS_ROUTE,
  ADMIN_DASHBOARD_ROUTE,
  ADMIN_ORDERS_ROUTE,
  ADMIN_PRODUCTS_ROUTE,
  ADMIN_REPORTS_ROUTE,
} from "@/apps/admin/constants";
import { HOME_ROUTE } from "@/apps/home/constants";
import { getMyProfile } from "@/apps/user/services/api";
import { LOCAL_STORAGE_KEYS } from "@/constants";
import { lcStorage } from "@/shared/utils";
import {
  AdminLayout,
  Brand,
  Content,
  Header,
  HeaderActions,
  HeaderText,
  Main,
  MenuButton,
  PageTitle,
  Sidebar,
  SidebarFooter,
  SidebarNav,
  UserBox,
  UserMeta,
} from "../dashboard/styled";

const menuItems = [
  { key: "overview", label: "Tổng quan", icon: <AppstoreOutlined />, to: ADMIN_DASHBOARD_ROUTE },
  { key: "orders", label: "Đơn hàng", icon: <ShoppingCartOutlined />, to: ADMIN_ORDERS_ROUTE },
  { key: "products", label: "Sản phẩm", icon: <ShopOutlined />, to: ADMIN_PRODUCTS_ROUTE },
  { key: "customers", label: "Khách hàng", icon: <TeamOutlined />, to: ADMIN_CUSTOMERS_ROUTE },
  { key: "reports", label: "Báo cáo", icon: <BarChartOutlined />, to: ADMIN_REPORTS_ROUTE },
];

const getActiveMenu = (pathname: string) => {
  if (pathname.startsWith(ADMIN_ORDERS_ROUTE)) return "orders";
  if (pathname.startsWith(ADMIN_PRODUCTS_ROUTE)) return "products";
  if (pathname.startsWith(ADMIN_CUSTOMERS_ROUTE)) return "customers";
  if (pathname.startsWith(ADMIN_REPORTS_ROUTE)) return "reports";
  return "overview";
};

const AdminLayoutPage = () => {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const localUser = lcStorage.get<{ fullName?: string; email?: string }>(LOCAL_STORAGE_KEYS.user);
  const [me, setMe] = useState<{ fullName?: string; email?: string } | null>(null);
  const activeMenu = getActiveMenu(pathname);

  useEffect(() => {
    const loadMe = async () => {
      try {
        const res: any = await getMyProfile();
        setMe({
          fullName: res?.data?.fullName,
          email: res?.data?.email,
        });
      } catch {
        setMe(null);
      }
    };

    void loadMe();
  }, []);

  const userDisplay = useMemo(
    () => ({
      fullName: me?.fullName || localUser?.fullName || "Quản trị viên",
      email: me?.email || localUser?.email || "admin@ongnuocviet.vn",
    }),
    [me?.email, me?.fullName, localUser?.email, localUser?.fullName],
  );

  const handleLogout = () => {
    lcStorage.delete(LOCAL_STORAGE_KEYS.accessToken);
    lcStorage.delete(LOCAL_STORAGE_KEYS.refreshToken);
    lcStorage.delete(LOCAL_STORAGE_KEYS.user);
    navigate({ to: LOGIN_ROUTE });
  };

  const dropdownItems = [
    {
      key: "user",
      label: (
        <div style={{ minWidth: 180 }}>
          <strong style={{ display: "block" }}>{userDisplay.fullName}</strong>
          <span style={{ color: "#667085", fontSize: 12 }}>{userDisplay.email}</span>
        </div>
      ),
      disabled: true,
    },
    { type: "divider" as const },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      onClick: handleLogout,
    },
  ];

  return (
    <AdminLayout>
      <Sidebar>
        <Brand><ShopOutlined /><span>Ống Nước Việt</span></Brand>
        <SidebarNav>
          {menuItems.map((item) => (
            <MenuButton key={item.key} type="button" $active={activeMenu === item.key} onClick={() => navigate({ to: item.to })}>
              {item.icon}<span>{item.label}</span>
            </MenuButton>
          ))}
        </SidebarNav>
        <SidebarFooter>
          <UserBox><UserOutlined /><UserMeta><strong>{userDisplay.fullName}</strong><span>{userDisplay.email}</span></UserMeta></UserBox>
        </SidebarFooter>
      </Sidebar>
      <Main>
        <Header>
          <HeaderText><PageTitle>Trang quản trị</PageTitle><p>Quản lý đơn hàng, tồn kho, khách hàng và báo cáo vận hành.</p></HeaderText>
          <HeaderActions>
            <Button type="text" aria-label="Về trang chủ" icon={<HomeOutlined />} onClick={() => navigate({ to: HOME_ROUTE })} />
            <Button type="text" aria-label="Thông báo" icon={<BellOutlined />} />
            <Dropdown menu={{ items: dropdownItems }} trigger={["click"]} placement="bottomRight">
              <Button type="text" aria-label="Tài khoản">
                <Space size={8}>
                  <Avatar size={30} icon={<UserOutlined />} />
                  <span>{userDisplay.fullName}</span>
                </Space>
              </Button>
            </Dropdown>
          </HeaderActions>
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Main>
    </AdminLayout>
  );
};

export default AdminLayoutPage;
