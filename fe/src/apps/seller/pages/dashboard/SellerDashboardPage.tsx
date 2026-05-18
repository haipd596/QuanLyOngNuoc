import {
  AppstoreOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  LogoutOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  TruckOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "@tanstack/react-router";
import { LOGIN_ROUTE } from "@/apps/auth/constants";
import { HOME_ROUTE } from "@/apps/home/constants";
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
} from "@/apps/admin/pages/dashboard/styled";

type SellerOrder = {
  key: string;
  code: string;
  customer: string;
  status: "new" | "packing" | "done";
  total: string;
};

const metrics = [
  {
    label: "Đơn mới hôm nay",
    value: "12",
    icon: <ShoppingCartOutlined />,
    tone: "orange",
  },
  {
    label: "Đang đóng gói",
    value: "7",
    icon: <TruckOutlined />,
    tone: "blue",
  },
  {
    label: "Đã hoàn tất",
    value: "32",
    icon: <CheckCircleOutlined />,
    tone: "green",
  },
  {
    label: "Chờ xác nhận",
    value: "5",
    icon: <ClockCircleOutlined />,
    tone: "red",
  },
];

const menuItems = [
  { label: "Tổng quan", icon: <AppstoreOutlined />, active: true },
  { label: "Đơn bán", icon: <ShoppingCartOutlined /> },
  { label: "Sản phẩm", icon: <ShopOutlined /> },
  { label: "Giao hàng", icon: <TruckOutlined /> },
  { label: "Báo cáo", icon: <BarChartOutlined /> },
];

const orders: SellerOrder[] = [
  {
    key: "1",
    code: "DH-2026-0021",
    customer: "Phạm Quốc Huy",
    status: "new",
    total: "3.250.000 đ",
  },
  {
    key: "2",
    code: "DH-2026-0020",
    customer: "Cửa hàng Minh An",
    status: "packing",
    total: "6.480.000 đ",
  },
  {
    key: "3",
    code: "DH-2026-0019",
    customer: "Lê Thị Hương",
    status: "done",
    total: "980.000 đ",
  },
];

const statusText: Record<SellerOrder["status"], string> = {
  new: "Đơn mới",
  packing: "Đang đóng gói",
  done: "Hoàn tất",
};

const statusColor: Record<SellerOrder["status"], string> = {
  new: "gold",
  packing: "blue",
  done: "green",
};

const columns: ColumnsType<SellerOrder> = [
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
    render: (status: SellerOrder["status"]) => (
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

const SellerDashboardPage = () => {
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
              <strong>{user?.fullName || "Nhân viên bán hàng"}</strong>
              <span>{user?.email || "seller@ongnuocviet.vn"}</span>
            </UserMeta>
          </UserBox>
        </SidebarFooter>
      </Sidebar>

      <Main>
        <Header>
          <HeaderText>
            <PageTitle>Trang bán hàng</PageTitle>
            <p>Theo dõi đơn bán, xử lý đóng gói và cập nhật trạng thái giao hàng.</p>
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
              <PanelTitle>Đơn bán cần theo dõi</PanelTitle>
              <StatusDot>
                <span />
                Dữ liệu mẫu
              </StatusDot>
            </PanelHeader>
            <TableWrap>
              <Table columns={columns} dataSource={orders} pagination={false} />
            </TableWrap>
          </Panel>
        </Content>
      </Main>
    </AdminLayout>
  );
};

export default SellerDashboardPage;
