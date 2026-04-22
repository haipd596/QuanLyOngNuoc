import { useEffect, useRef } from "react";
import { Button, Spin, Typography } from "antd";
import { useNavigate } from "@tanstack/react-router";
import { HOME_ROUTE } from "@/apps/home/constants";
import { loginRoute } from "../login/Route";
import useAction from "../../hooks/useAction";
import { AuthTopBar, HomeButton, LeftPanel, Page, RightPanel } from "../../styled";

const { Title, Text } = Typography;

const GoogleCallbackPage = () => {
  const navigate = useNavigate();
  const { handleGoogleCallback } = useAction();
  const hasRequestedRef = useRef(false);
  const code = new URLSearchParams(window.location.search).get("code");

  useEffect(() => {
    if (!code || hasRequestedRef.current) {
      return;
    }

    hasRequestedRef.current = true;
    handleGoogleCallback(code, () => {
      navigate({ to: HOME_ROUTE });
    });
  }, [code, handleGoogleCallback, navigate]);

  return (
    <Page>
      <LeftPanel style={{ alignItems: "center", textAlign: "center" }}>
        <AuthTopBar>
          <HomeButton type="default" onClick={() => navigate({ to: HOME_ROUTE })}>
            Về trang chủ
          </HomeButton>
        </AuthTopBar>

        <Title level={3} style={{ marginBottom: 12 }}>
          Đang xử lý đăng nhập Google
        </Title>

        {code ? (
          <>
            <Spin size="large" />
            <Text style={{ marginTop: 20, color: "#666" }}>
              Hệ thống đang nhận mã xác thực từ Google và đăng nhập cho bạn.
            </Text>
          </>
        ) : (
          <>
            <Text style={{ marginBottom: 20, color: "#666" }}>
              Không tìm thấy `code` trả về từ Google. Hãy bắt đầu lại từ nút đăng nhập Google.
            </Text>
            <Button type="primary" onClick={() => navigate({ to: loginRoute.id })}>
              Quay lại đăng nhập
            </Button>
          </>
        )}
      </LeftPanel>
      <RightPanel />
    </Page>
  );
};

export default GoogleCallbackPage;
