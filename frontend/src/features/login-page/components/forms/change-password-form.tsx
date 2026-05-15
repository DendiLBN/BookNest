import { Button, Form, Input } from "antd";

import "@/assets/layouts-styles/login-styles/change-password-styles/password.css";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import { useChangePasswordMutation } from "@/features/auth/api";
import {
  createConfirmPasswordRules,
  createPasswordRules,
} from "@/features/auth/consts/password-validation";
import type { TChangePasswordRequestBody } from "@/features/auth/types";

const ChangePasswordForm = () => {
  const [form] = Form.useForm<TChangePasswordRequestBody>();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const { openNotification } = useNotificationContext();

  const handleSuccess = () => {
    form.resetFields();
    openNotification("topRight", "success", "Password changed successfully.", false);
  };

  const handleError = () => {
    openNotification("topRight", "error", "Could not change password.", false);
  };

  const handleSubmit = (values: TChangePasswordRequestBody) => {
    changePassword({
      data: values,
      onSuccess: handleSuccess,
      onError: handleError,
    });
  };

  return (
    <div className="password__container">
      <div className="password__container-form">
        <h1 className="password__title">Change password</h1>
        <p className="password__subtitle">
          Use at least 8 characters and confirm your new password below.
        </p>
        <Form form={form} layout="vertical" size="large" onFinish={handleSubmit}>
          <Form.Item
            name="oldPassword"
            label="Old Password"
            rules={[
              {
                type: "string",
                required: true,
                message: "Please input your old password!",
              },
            ]}
          >
            <Input.Password placeholder="Enter old password" />
          </Form.Item>
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
              Save new password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
