import { Form, Typography } from "antd";
import { useNavigate } from "@tanstack/react-router";
import { HOME_ROUTE } from "@/apps/home/constants";
import { LOCAL_STORAGE_KEYS } from "@/constants";
import { lcStorage } from "@/shared/utils";
import { forgotPasswordRoute } from "../forgot-password/Route";
import { registerRoute } from "../register/Route";
import {
  AuthTopBar,
  BottomRow,
  Divider,
  GoogleButton,
  Heading,
  HomeButton,
  LeftPanel,
  LoginButton,
  Page,
  RightPanel,
  StyledInput,
  StyledPassword,
  Sub,
} from "../../styled";
import {
  GoogleCircleFilled,
  LeftOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import useAction from "../../hooks/useAction";
import useAuthTransition from "../../hooks/useAuthTransition";
import { ROLE_ROUTE_MAP } from "../../constants";

const { Link } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const { handleLogin, handleGoogleRedirect, isLoading } = useAction();
  const { isExiting, navigateWithTransition } = useAuthTransition();

  const onFinish = async (values: any) => {
    handleLogin(values, () => {
      const user = lcStorage.get(LOCAL_STORAGE_KEYS.user);
      const redirectRoute = ROLE_ROUTE_MAP[user?.role] || HOME_ROUTE;
      navigate({ to: redirectRoute });
    });
  };

  return (
    <Page $mode="left" $isExiting={isExiting}>
      <LeftPanel $mode="left" $isExiting={isExiting}>
        <AuthTopBar>
          <HomeButton
            type="default"
            onClick={() => navigateWithTransition(HOME_ROUTE)}
          >
            <LeftOutlined />
            Về trang chủ
          </HomeButton>
        </AuthTopBar>

        <Heading level={3}>Đăng nhập</Heading>
        <Sub>Chào mừng trở lại! Vui lòng đăng nhập để tiếp tục.</Sub>

        <Form
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          style={{ width: "100%" }}
        >
          <Form.Item
            name="email"
            label={<span style={{ fontWeight: 500, fontSize: 13 }}>Tài khoản</span>}
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <StyledInput
              prefix={<UserOutlined style={{ color: "#bbb" }} />}
              placeholder="Nhập email của bạn"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={<span style={{ fontWeight: 500, fontSize: 13 }}>Mật khẩu</span>}
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <StyledPassword
              prefix={<LockOutlined style={{ color: "#bbb" }} />}
              placeholder="Nhập mật khẩu"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <LoginButton
              type="primary"
              htmlType="submit"
              block
              loading={isLoading}
            >
              ĐĂNG NHẬP
            </LoginButton>
          </Form.Item>
        </Form>

        <Divider>hoặc</Divider>

        <GoogleButton onClick={handleGoogleRedirect}>
          <GoogleCircleFilled />
          Đăng nhập với Google
        </GoogleButton>

        <BottomRow>
          <Link
            onClick={() =>
              navigateWithTransition(forgotPasswordRoute.id)
            }
          >
            Quên mật khẩu?
          </Link>
          <Link
            onClick={() =>
              navigateWithTransition(registerRoute.id)
            }
          >
            Tạo tài khoản
          </Link>
        </BottomRow>
      </LeftPanel>

      <RightPanel $mode="left" $isExiting={isExiting} />
    </Page>
  );
};

export default LoginPage;