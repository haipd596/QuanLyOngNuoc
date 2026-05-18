import {
  AlertOutlined,
  AppstoreOutlined,
  BarChartOutlined,
  LogoutOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "@tanstack/react-router";
import { HOME_ROUTE } from "@/apps/home/constants";
import { LOGIN_ROUTE } from "@/apps/auth/constants";
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
  MetricCard,
  MetricGrid,
  MetricIcon,
  MetricLabel,
  MetricValue,
  PageTitle,
  Panel,
  PanelHeader,
  PanelTitle,
  Sidebar,
  SidebarFooter,
  SidebarNav,
  StatusDot,
  TableWrap,
  UserBox,
  UserMeta,
} from "./styled";

type RecentOrder = {
  key: string;
  code: string;
  customer: string;
  status: "pending" | "confirmed" | "shipping";
  total: string;
};

const metrics = [
  {
    label: "Đơn chờ xử lý",
    value: "18",
    icon: <ShoppingCartOutlined />,
    tone: "orange",
  },
  {
    label: "Sản phẩm trong kho",
    value: "1.248",
    icon: <ShopOutlined />,
    tone: "blue",
  },
  {
    label: "Khách hàng",
    value: "356",
    icon: <TeamOutlined />,
    tone: "green",
  },
  {
    label: "Cảnh báo tồn kho",
    value: "9",
    icon: <AlertOutlined />,
    tone: "red",
  },
];

const menuItems = [
  { label: "Tổng quan", icon: <AppstoreOutlined />, active: true },
  { label: "Đơn hàng", icon: <ShoppingCartOutlined /> },
  { label: "Sản phẩm", icon: <ShopOutlined /> },
  { label: "Khách hàng", icon: <TeamOutlined /> },
  { label: "Báo cáo", icon: <BarChartOutlined /> },
];

const recentOrders: RecentOrder[] = [
  {
    key: "1",
    code: "DH-2026-0018",
    customer: "Nguyễn Văn Minh",
    status: "pending",
    total: "2.450.000 đ",
  },
  {
    key: "2",
    code: "DH-2026-0017",
    customer: "Công ty Hưng Phát",
    status: "confirmed",
    total: "8.120.000 đ",
  },
  {
    key: "3",
    code: "DH-2026-0016",
    customer: "Trần Thị Lan",
    status: "shipping",
    total: "1.780.000 đ",
  },
];

const statusText: Record<RecentOrder["status"], string> = {
  pending: "Chờ xử lý",
  confirmed: "Đã xác nhận",
  shipping: "Đang giao",
};

const statusColor: Record<RecentOrder["status"], string> = {
  pending: "gold",
  confirmed: "green",
  shipping: "blue",
};

const columns: ColumnsType<RecentOrder> = [
  {
    title: "Mã đơn",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Khách hàng",
    dataIndex: "customer",
    key: "customer",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (status: RecentOrder["status"]) => (
      <Tag color={statusColor[status]}>{statusText[status]}</Tag>
    ),
  },
  {
    title: "Tổng tiền",
    dataIndex: "total",
    key: "total",
    align: "right",
  },
];

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const user = lcStorage.get<{ fullName?: string; email?: string }>(
    LOCAL_STORAGE_KEYS.user,
  );

  const handleLogout = () => {
    lcStorage.delete(LOCAL_STORAGE_KEYS.accessToken);
    lcStorage.delete(LOCAL_STORAGE_KEYS.refreshToken);
    lcStorage.delete(LOCAL_STORAGE_KEYS.user);
    navigate({ to: LOGIN_ROUTE });
  };

  return (
    <AdminLayout>
      <Sidebar>
        <Brand>
          <ShopOutlined />
          <span>Ống Nước Việt</span>
        </Brand>

        <SidebarNav>
          {menuItems.map((item) => (
            <MenuButton key={item.label} type="button" $active={item.active}>
              {item.icon}
              <span>{item.label}</span>
            </MenuButton>
          ))}
        </SidebarNav>

        <SidebarFooter>
          <UserBox>
            <UserOutlined />
            <UserMeta>
              <strong>{user?.fullName || "Quản trị viên"}</strong>
              <span>{user?.email || "admin@ongnuocviet.vn"}</span>
            </UserMeta>
          </UserBox>
        </SidebarFooter>
      </Sidebar>

      <Main>
        <Header>
          <HeaderText>
            <PageTitle>Trang quản trị</PageTitle>
            <p>Quản lý đơn hàng, tồn kho, khách hàng và báo cáo vận hành.</p>
          </HeaderText>

          <HeaderActions>
            <Button onClick={() => navigate({ to: HOME_ROUTE })}>
              Về trang chủ
            </Button>
            <Button icon={<LogoutOutlined />} onClick={handleLogout}>
              Đăng xuất
            </Button>
          </HeaderActions>
        </Header>

        <Content>
          <MetricGrid>
            {metrics.map((metric) => (
              <MetricCard key={metric.label}>
                <MetricIcon $tone={metric.tone}>{metric.icon}</MetricIcon>
                <div>
                  <MetricLabel>{metric.label}</MetricLabel>
                  <MetricValue>{metric.value}</MetricValue>
                </div>
              </MetricCard>
            ))}
          </MetricGrid>

          <Panel>
            <PanelHeader>
              <PanelTitle>Đơn hàng gần đây</PanelTitle>
              <StatusDot>
                <span />
                Dữ liệu mẫu
              </StatusDot>
            </PanelHeader>
            <TableWrap>
              <Table
                columns={columns}
                dataSource={recentOrders}
                pagination={false}
              />
            </TableWrap>
          </Panel>
        </Content>
      </Main>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
