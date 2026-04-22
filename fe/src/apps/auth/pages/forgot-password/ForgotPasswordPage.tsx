import { HOME_ROUTE } from "@/apps/home/constants";
import { Form, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import useAuthTransition from "../../hooks/useAuthTransition";
import { loginRoute } from "../login/Route";
import {
  AuthTopBar,
  BottomRow,
  Heading,
  HomeButton,
  LeftPanel,
  LoginButton,
  Page,
  RightPanel,
  StyledInput,
  Sub,
} from "../../styled";

const { Link } = Typography;

const ForgotPasswordPage = () => {
  const { isExiting, navigateWithTransition } = useAuthTransition();

  const onFinish = (values: any) => {
    console.log("Forgot password payload:", values);
    navigateWithTransition(loginRoute.id);
  };

  return (
    <Page $mode="left" $isExiting={isExiting}>
      <LeftPanel $mode="left" $isExiting={isExiting}>
        <AuthTopBar>
          <HomeButton type="default" onClick={() => navigateWithTransition(HOME_ROUTE)}>
            <LeftOutlined />Về trang chủ
          </HomeButton>
        </AuthTopBar>

        <Heading level={3}>Khôi phục mật khẩu</Heading>
        <Sub>Nhập email của bạn để nhận đường dẫn đặt lại mật khẩu.</Sub>

        <Form
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          style={{ width: "100%", maxWidth: "100%" }}
        >
          <Form.Item
            style={{ width: "100%" }}
            name="email"
            label={<span style={{ fontWeight: 500, fontSize: 13 }}>Email</span>}
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <StyledInput placeholder="Nhập email của bạn" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <LoginButton type="primary" htmlType="submit" block>
              GỬI LIÊN KẾT PHỤC HỒI
            </LoginButton>
          </Form.Item>
        </Form>

        <BottomRow style={{ justifyContent: "flex-start", marginTop: 16 }}>
          <Link onClick={() => navigateWithTransition(loginRoute.id)}>
            <LeftOutlined /> Quay lại đăng nhập
          </Link>
        </BottomRow>
      </LeftPanel>

      <RightPanel $mode="left" $isExiting={isExiting} />
    </Page>
  );
};

export default ForgotPasswordPage;
