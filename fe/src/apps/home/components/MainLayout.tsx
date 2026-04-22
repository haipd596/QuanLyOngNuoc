import { Layout } from "antd";
import { useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import AppBreadcrumb from "./AppBreadcrumb";
import AppFooter from "./AppFooter";

const { Content } = Layout;

interface Props {
  children: React.ReactNode;
  breadcrumb?: { label: string; href?: string }[];
}

const MainLayout = ({ children, breadcrumb }: Props) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hasScrolled = window.scrollY > 0;
      setIsScrolled(hasScrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Layout>
      <AppHeader />
      <div style={{ marginTop: "84px" }}>
        {breadcrumb && <AppBreadcrumb items={breadcrumb} />}
        <Content style={{ background: "#fff" }}>{children}</Content>
      </div>

      <div style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        background: "rgba(0,0,0,0.6)",
        color: "#fff",
        borderRadius: 4,
        padding: "4px 8px",
        fontSize: 12,
        zIndex: 999,
      }}>
        Scroll Y: {window.scrollY.toFixed(0)} – scrolled: {isScrolled ? "yes" : "no"}
      </div>

      <AppFooter />
    </Layout>
  );
};

export default MainLayout;
