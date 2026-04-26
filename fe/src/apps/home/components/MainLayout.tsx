import { Layout } from "antd";
import AppBreadcrumb from "./AppBreadcrumb";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";

const { Content } = Layout;

interface Props {
  children: React.ReactNode;
  breadcrumb?: { label: string; href?: string }[];
}

const MainLayout = ({ children, breadcrumb }: Props) => {
  return (
    <Layout>
      <AppHeader />
      <div style={{ marginTop: "84px" }}>
        {breadcrumb && <AppBreadcrumb items={breadcrumb} />}
        <Content style={{ background: "#fff" }}>{children}</Content>
      </div>
      <AppFooter />
    </Layout>
  );
};

export default MainLayout;
