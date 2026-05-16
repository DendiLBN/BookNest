import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

import {
  createConfirmPasswordRules,
  createPasswordRules,
} from "@/features/auth/consts/password-validation";
import initialRegisterValues from "@/features/register-page/consts/register-state-values";
import type { TRegisterFormValues } from "@/features/register-page/types";

type TRegisterFormProps = {
  isDarkMode: boolean;
  loading: boolean;
  onFinish: (values: TRegisterFormValues) => void;
};

export const RegisterForm = ({ isDarkMode, loading, onFinish }: TRegisterFormProps) => (
  <Form
    name="register"
    initialValues={initialRegisterValues}
    className={`register__form border border-app-border shadow-app-s ${
      isDarkMode ? "bg-app-surface-muted" : "bg-app-surface"
    }`}
    onFinish={onFinish}
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
  >
    <h1 className="register__title">Enter your details </h1>

    <Form.Item
      label="E-mail"
      name="email"
      rules={[
        { type: "email", message: "The input is not a valid E-mail!" },
        { required: true, message: "Please input your E-mail!" },
      ]}
    >
      <Input prefix={<MailOutlined />} placeholder="Email" autoComplete="username" />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={createPasswordRules("Please input your password!")}
      hasFeedback
    >
      <Input.Password
        prefix={<LockOutlined />}
        placeholder="Password"
        autoComplete="new-password"
      />
    </Form.Item>

    <Form.Item
      label="Confirm Password"
      name="confirmPassword"
      dependencies={["password"]}
      hasFeedback
      rules={createConfirmPasswordRules({
        fieldName: "password",
        requiredMessage: "Please confirm your password!",
        mismatchMessage: "The passwords do not match!",
      })}
    >
      <Input.Password
        prefix={<LockOutlined />}
        placeholder="Confirm Password"
        autoComplete="new-password"
      />
    </Form.Item>

    <Form.Item
      label="First Name"
      name="firstName"
      rules={[
        { required: true, message: "Please input your First Name!" },
        {
          min: 5,
          message: "Please must be at least 5 characters!",
        },
      ]}
    >
      <Input prefix={<UserOutlined />} placeholder="First Name" />
    </Form.Item>

    <Form.Item
      label="Last Name"
      name="lastName"
      rules={[
        { required: true, message: "Please input your Last Name!" },
        {
          min: 5,
          message: "Please must be at least 5 characters!",
        },
      ]}
    >
      <Input prefix={<UserOutlined />} placeholder="Last Name" />
    </Form.Item>

    <Form.Item wrapperCol={{ span: 14, offset: 6 }}>
      <Button
        className="register__submit-button"
        disabled={loading}
        loading={loading}
        type="primary"
        htmlType="submit"
      >
        Create account
      </Button>
    </Form.Item>
  </Form>
);
