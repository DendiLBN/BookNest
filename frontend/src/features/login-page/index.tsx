import { Link } from "react-router-dom";

import { LoadingOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Spin } from "antd";

import "@/assets/layouts-styles/login-styles/login.css";

import ForgotPasswordForm from "@/features/login-page/components/forms/forgot-password-form";

import { useLoginUser } from "@/features/login-page/hooks/useLoginUser";

import { useModalContext } from "@/common/contexts/hooks/use-modal-context";
import { useThemeContext } from "@/common/contexts/hooks/use-theme-context";

import { AUTH_IMAGE_URLS } from "@/features/auth/consts/auth-images";
import type { TLoginUserRequestBody } from "@/features/auth/types";

export const LoginPage = () => {
  const { isModalVisible, showModal } = useModalContext();
  const { fetchBodyLoginUser, loading } = useLoginUser();

  const handleShowModal = () => {
    showModal();
  };

  const themeContext = useThemeContext();

  if (!themeContext) {
    return;
  }

  const { isDarkMode } = themeContext;

  const handleSubmitLogin = (values: TLoginUserRequestBody) => {
    fetchBodyLoginUser(values);
  };

  return (
    <div className="login__container">
      <Form
        name="login"
        initialValues={{
          remember: true,
        }}
        className="login__form"
        style={{
          background: isDarkMode ? "#708090" : "#D3D3D3",
        }}
        onFinish={handleSubmitLogin}
      >
        <h1 className="login__title">Please login!</h1>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Incorrect email! Please try again!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Incorrect password! Please try again!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            autoComplete="on"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item className="login__remember">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Button type="text" onClick={handleShowModal} style={{ marginLeft: "auto" }}>
              Forgot password
            </Button>
            <ForgotPasswordForm visible={isModalVisible} />
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            className="login__submit-button"
            disabled={loading}
            block
            type="primary"
            htmlType="submit"
          >
            {loading ? (
              <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: "#fff" }} spin />} />
            ) : (
              "Log in"
            )}
          </Button>
          or <Link to="/auth/register">Register now!</Link>
        </Form.Item>
      </Form>

      <img className="login__image" src={AUTH_IMAGE_URLS.login} alt="Library reading room" />
    </div>
  );
};
export default LoginPage;
