import { useCallback } from "react";

import { Button, Form, Input, Modal } from "antd";

import { useModalContext } from "@/common/contexts/hooks/use-modal-context";
import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import { TForgotPasswordEmail, TForgotPasswordProps } from "@/types/types";

import { useForgotPasswordMutation } from "@/features/auth/api";

export const ForgotPasswordForm = ({ visible }: TForgotPasswordProps) => {
  const { openNotification } = useNotificationContext();

  const [forgotPassword] = useForgotPasswordMutation();

  const { hideModal } = useModalContext();

  const [form] = Form.useForm();

  const handleSuccess = useCallback(() => {
    openNotification("topRight", "success", "Email has been send follow the instructions", true);
  }, [openNotification]);

  const handleError = useCallback(() => {
    openNotification(
      "topRight",
      "error",
      "Unable to send request. Probably too many requests have been sent in short time. Please check your email address and try again.",
      true,
    );
  }, [openNotification]);

  const handleCancelModal = useCallback(() => {
    hideModal();
    form.resetFields();
  }, [form, hideModal]);

  const handleSendEmail = useCallback(
    async ({ email }: TForgotPasswordEmail) => {
      forgotPassword({
        data: { email },
        onSuccess: handleSuccess,
        onError: handleError,
      });
      handleCancelModal();
    },
    [forgotPassword, handleCancelModal, handleError, handleSuccess],
  );

  return (
    <Modal
      title="Forgot Password"
      open={visible}
      onCancel={handleCancelModal}
      footer={null}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Form form={form} onFinish={handleSendEmail}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email!",
              type: "email",
            },
          ]}
        >
          <Input placeholder="enter your email..." />
        </Form.Item>

        <Form.Item>
          <Button style={{ width: 300, justifyContent: "center" }} type="primary" htmlType="submit">
            Send reset password link
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ForgotPasswordForm;
