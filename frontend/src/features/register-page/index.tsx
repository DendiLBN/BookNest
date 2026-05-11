import { useContext } from "react";

import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Select } from "antd";

import "@/assets/layouts-styles/register-styles/register.css";

import { useRegistrationUser } from "@/features/register-page/hooks/useRegistrationUser";

import { ThemeContext } from "@/common/contexts/theme-context";

import { TRegisterUserRequestBody } from "@/types/types";

import { AUTH_IMAGE_URLS } from "@/features/auth/consts/auth-images";
import initialRegisterValues from "@/features/register-page/consts/register-state-values";

const { Option } = Select;

export const RegisterPage = () => {
  const RegistrationUser = useRegistrationUser();
  const themeContext = useContext(ThemeContext);

  if (!RegistrationUser || !themeContext) {
    return;
  }

  const { isDarkMode } = themeContext;

  const { RegistrationUserData } = RegistrationUser;

  const handleSubmitRegister = (values: TRegisterUserRequestBody) => {
    RegistrationUserData(values);
  };

  return (
    <div className="register__container">
      {" "}
      <img className="register__image" src={AUTH_IMAGE_URLS.register} alt="Books on a shelf" />
      <Form
        name="register"
        initialValues={initialRegisterValues}
        style={{
          background: isDarkMode ? "#708090" : "#D3D3D3",
        }}
        className="register__form"
        onFinish={handleSubmitRegister}
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
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 8, message: "Password must be at least 8 characters!" },
          ]}
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
          name="confirm-password"
          dependencies={["new-password"]}
          hasFeedback
          rules={[
            { required: true, message: "Please confirm your password!" },
            { min: 8, message: "Password must be at least 8 characters!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("The passwords do not match!"));
              },
            }),
          ]}
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

        <Form.Item
          label="Gender"
          name="gender"
          rules={[
            {
              required: true,
              message: "Please select your gender!",
            },
          ]}
        >
          <Select placeholder="Select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 14, offset: 6 }}
          className="register__agreement-checkbox"
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 14, offset: 6 }}>
          {" "}
          <Button className="register__submit-button" type="primary" htmlType="submit">
            click here to register account!
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default RegisterPage;
