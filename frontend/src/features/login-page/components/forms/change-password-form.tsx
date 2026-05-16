import { Button, Form, Input } from "antd";

import "@/assets/layouts-styles/login-styles/change-password-styles/password.css";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import {
  createConfirmPasswordRules,
  createPasswordRules,
} from "@/features/auth/consts/password-validation";
import type { TChangePasswordRequestBody } from "@/features/auth/types";
import { useChangePasswordMutation } from "@/store/api/auth";

type TChangePasswordFormProps = {
  embedded?: boolean;
};

const ChangePasswordForm = ({ embedded = false }: TChangePasswordFormProps) => {
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

  const formContent = (
    <>
      {embedded ? (
        <h2 className="mt-0 mb-xs text-lg font-bold text-app-text">Change password</h2>
      ) : (
        <h1 className="password__title">Change password</h1>
      )}
      <p className={embedded ? "mt-0 text-app-text-muted" : "password__subtitle"}>
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
        <Form.Item className={embedded ? "mb-0" : "password__button-wrap"}>
          <Button disabled={isLoading} loading={isLoading} block type="primary" htmlType="submit">
            Save new password
          </Button>
        </Form.Item>
      </Form>
    </>
  );

  return embedded ? (
    formContent
  ) : (
    <div className="password__container">
      <div className="password__container-form">{formContent}</div>
    </div>
  );
};

export default ChangePasswordForm;
