import { HOME_ROUTE } from "@/apps/home/constants";
import { LeftOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Form, Row, Typography } from "antd";
import useAction from "../../hooks/useAction";
import useAuthTransition from "../../hooks/useAuthTransition";
import {
  AuthTopBar,
  BottomRow,
  Heading,
  HomeButton,
  InlineTextGroup,
  LeftPanel,
  LoginButton,
  Page,
  RightPanel,
  StyledInput,
  StyledPassword,
  Sub,
} from "../../styled";
import { loginRoute } from "../login/Route";

const { Link } = Typography;

const RegisterPage = () => {
  const { handleRegister, isRegisterLoading } = useAction();
  const { isExiting, navigateWithTransition } = useAuthTransition();

  const onFinish = (values: any) => {
    const { fullName, email, password, confirmPassword } = values;

    handleRegister(
      { fullName, email, password, confirmPassword },
      () => navigateWithTransition(loginRoute.id)
    );
  };

  return (
    <Page $mode="right" $isExiting={isExiting}>
      <LeftPanel $mode="right" $isExiting={isExiting}>
        <AuthTopBar>
          <HomeButton type="default" onClick={() => navigateWithTransition(HOME_ROUTE)}>
            <LeftOutlined />
            Về trang chủ
          </HomeButton>
        </AuthTopBar>

        <Heading level={3}>Đăng ký</Heading>
        <Sub>Tạo tài khoản mới để bắt đầu sử dụng.</Sub>

        <Form
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          style={{ width: "100%", maxWidth: "100%" }}
        >
          <Form.Item
            style={{ width: "100%" }}
            name="fullName"
            label={<span style={{ fontWeight: 500, fontSize: 13 }}>Họ và tên</span>}
            rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
          >
            <StyledInput
              prefix={<UserOutlined style={{ color: "#bbb", fontSize: 15 }} />}
              placeholder="Nhập họ và tên của bạn"
            />
          </Form.Item>

          <Form.Item
            style={{ width: "100%" }}
            name="email"
            label={<span style={{ fontWeight: 500, fontSize: 13 }}>Email</span>}
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <StyledInput
              prefix={<UserOutlined style={{ color: "#bbb", fontSize: 15 }} />}
              placeholder="Nhập email của bạn"
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                style={{ width: "100%" }}
                name="password"
                label={<span style={{ fontWeight: 500, fontSize: 13 }}>Mật khẩu</span>}
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu" },
                  { min: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
                ]}
              >
                <StyledPassword
                  prefix={<LockOutlined style={{ color: "#bbb", fontSize: 15 }} />}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                style={{ width: "100%" }}
                name="confirmPassword"
                label={<span style={{ fontWeight: 500, fontSize: 13 }}>Xác nhận mật khẩu</span>}
                rules={[
                  { required: true, message: "Vui lòng xác nhận mật khẩu" }
                ]}
              >
                <StyledPassword
                  prefix={<LockOutlined style={{ color: "#bbb", fontSize: 15 }} />}
                  placeholder="Nhập lại mật khẩu"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ marginBottom: 0 }}>
            <LoginButton type="primary" htmlType="submit" block loading={isRegisterLoading}>
              TẠO TÀI KHOẢN
            </LoginButton>
          </Form.Item>
        </Form>

        <BottomRow style={{ justifyContent: "flex-end", marginTop: 16 }}>
          <InlineTextGroup>
            <span>Bạn đã có tài khoản?</span>
            <Link onClick={() => navigateWithTransition(loginRoute.id)}>Đăng nhập</Link>
          </InlineTextGroup>
        </BottomRow>
      </LeftPanel>

      <RightPanel $mode="right" $isExiting={isExiting} />
    </Page>
  );
};

export default RegisterPage;
