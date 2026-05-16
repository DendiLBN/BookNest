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
  const { submitLogin, loading } = useLoginUser();

  const handleShowModal = () => {
    showModal();
  };

  const themeContext = useThemeContext();

  if (!themeContext) {
    return null;
  }

  const { isDarkMode } = themeContext;

  const handleSubmitLogin = (values: TLoginUserRequestBody) => {
    submitLogin(values);
  };

  return (
    <div className="login__container">
      <Form
        name="login"
        initialValues={{
          remember: true,
        }}
        className={`login__form border border-app-border shadow-app-s ${
          isDarkMode ? "bg-app-surface-muted" : "bg-app-surface"
        }`}
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
          <div className="flex w-full items-center justify-between">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Button className="ml-auto" type="text" onClick={handleShowModal}>
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
