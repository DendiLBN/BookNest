import { Button, Form, Input } from "antd";
import "@/assets/layouts-styles/login-styles/change-password-styles/password.css";

const ChangePasswordForm = () => {
  return (
    <div className="password__container">
      <div className="password__container-form">
        <h1 className="password__title">Change password</h1>
        <p className="password__subtitle">
          Use at least 8 characters and confirm your new password below.
        </p>
        <Form layout="vertical" size="large">
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
            rules={[
              {
                required: true,
                message: "Please input your new password!",
                min: 8,
                max: 32,
              },
            ]}
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm New Password"
            dependencies={["newPassword"]}
            rules={[
              {
                required: true,
                message: "Please confirm your new password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!"),
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Repeat new password" />
          </Form.Item>
          <Form.Item className="password__button-wrap">
            <Button disabled={false} block type="primary" htmlType="submit">
              Save new password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
