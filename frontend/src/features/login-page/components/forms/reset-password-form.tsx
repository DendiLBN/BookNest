import { useNavigate, useSearchParams } from "react-router-dom";

import { Button, Form, Input } from "antd";

import "@/assets/layouts-styles/login-styles/change-password-styles/password.css";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import {
  createConfirmPasswordRules,
  createPasswordRules,
} from "@/features/auth/consts/password-validation";
import type { TResetPasswordRequestBody } from "@/features/auth/types";
import { useResetPasswordMutation } from "@/store/api/auth";

type TResetPasswordFormValues = {
  newPassword: string;
  confirmPassword: string;
};

const ResetPasswordForm = () => {
  const [form] = Form.useForm<TResetPasswordFormValues>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const { openNotification } = useNotificationContext();
  const token = searchParams.get("token");

  const handleSuccess = () => {
    form.resetFields();
    openNotification("topRight", "success", "Password reset successfully.", false);
    navigate("/auth/login");
  };

  const handleError = () => {
    openNotification("topRight", "error", "Could not reset password.", false);
  };

  const handleSubmit = ({ newPassword }: TResetPasswordFormValues) => {
    if (!token) {
      openNotification("topRight", "error", "Reset token is missing.", false);
      return;
    }

    const data: TResetPasswordRequestBody = {
      token,
      newPassword,
    };

    resetPassword({
      data,
      onSuccess: handleSuccess,
      onError: handleError,
    });
  };

  return (
    <div className="password__container">
      <div className="password__container-form">
        <h1 className="password__title">Reset password</h1>
        <p className="password__subtitle">Choose a new password for your account.</p>
        <Form form={form} layout="vertical" size="large" onFinish={handleSubmit}>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={createPasswordRules("Please input your new password!")}
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm New Password"
            dependencies={["newPassword"]}
            rules={createConfirmPasswordRules({
              fieldName: "newPassword",
              requiredMessage: "Please confirm your new password!",
              mismatchMessage: "The two passwords do not match!",
            })}
          >
            <Input.Password placeholder="Repeat new password" />
          </Form.Item>
          <Form.Item className="password__button-wrap">
            <Button disabled={isLoading} loading={isLoading} block type="primary" htmlType="submit">
              Reset password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
