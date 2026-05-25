import { HOME_ROUTE } from "@/apps/home/constants";
import { LeftOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Typography } from "antd";
import useAction from "../../hooks/useAction";
import useAuthTransition from "../../hooks/useAuthTransition";
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
  StyledPassword,
  Sub,
} from "../../styled";
import { loginRoute } from "../login/Route";

const { Link } = Typography;

const ChangePasswordPage = () => {
  const { handleChangePassword, isChangePasswordLoading } = useAction();
  const { isExiting, navigateWithTransition } = useAuthTransition();

  const onFinish = (values: any) => {
    handleChangePassword(
      {
        email: values.email,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmNewPassword,
      },
      () => navigateWithTransition(loginRoute.id)
    );
  };

  return (
    <Page $mode="left" $isExiting={isExiting}>
      <LeftPanel $mode="left" $isExiting={isExiting}>
        <AuthTopBar>
          <HomeButton type="default" onClick={() => navigateWithTransition(HOME_ROUTE)}>
            <LeftOutlined />
            Về trang chủ
          </HomeButton>
        </AuthTopBar>

        <Heading level={3}>Đổi mật khẩu</Heading>
        <Sub>Nhập thông tin tài khoản để cập nhật mật khẩu mới.</Sub>

        <Form
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          style={{ width: "100%", maxWidth: "100%" }}
        >
          <Form.Item
            name="email"
            label={<span style={{ fontWeight: 500, fontSize: 13 }}>Email</span>}
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <StyledInput
              prefix={<UserOutlined style={{ color: "#bbb", fontSize: 15 }} />}
              placeholder="Nhập email"
            />
          </Form.Item>

          <Form.Item
            name="oldPassword"
            label={<span style={{ fontWeight: 500, fontSize: 13 }}>Mật khẩu cũ</span>}
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ" }]}
          >
            <StyledPassword
              prefix={<LockOutlined style={{ color: "#bbb", fontSize: 15 }} />}
              placeholder="Nhập mật khẩu cũ"
            />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label={<span style={{ fontWeight: 500, fontSize: 13 }}>Mật khẩu mới</span>}
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới" },
              { min: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
            ]}
          >
            <StyledPassword
              prefix={<LockOutlined style={{ color: "#bbb", fontSize: 15 }} />}
              placeholder="Nhập mật khẩu mới"
            />
          </Form.Item>

          <Form.Item
            name="confirmNewPassword"
            dependencies={["newPassword"]}
            label={<span style={{ fontWeight: 500, fontSize: 13 }}>Xác nhận mật khẩu mới</span>}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu mới" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu xác nhận không khớp"));
                },
              }),
            ]}
          >
            <StyledPassword
              prefix={<LockOutlined style={{ color: "#bbb", fontSize: 15 }} />}
              placeholder="Nhập lại mật khẩu mới"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <LoginButton type="primary" htmlType="submit" block loading={isChangePasswordLoading}>
              CẬP NHẬT MẬT KHẨU
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

export default ChangePasswordPage;
