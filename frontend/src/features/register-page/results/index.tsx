import { useLocation, useNavigate } from "react-router-dom";

import { Button, Result } from "antd";

import type { TRegistrationSuccessState } from "@/features/register-page/types";

export const OnSuccessRegister = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const registrationState = location.state as TRegistrationSuccessState | null;

  if (!registrationState) {
    return (
      <Result
        status="info"
        title="Registration completed"
        subTitle="You can now log in with your account."
        extra={[
          <Button
            type="primary"
            onClick={() => navigate("/auth/login", { replace: true })}
            key="login"
          >
            Go to login page!
          </Button>,
        ]}
      />
    );
  }

  const { firstName, email } = registrationState;

  const handleLoginRedirect = () => {
    navigate("/auth/login", { replace: true });
  };

  return (
    <Result
      status="success"
      title={`Your account has been created successfully! This is your email: ${email}`}
      subTitle={`Welcome ${firstName}! You can now log in.`}
      extra={[
        <Button type="primary" onClick={handleLoginRedirect} key="console">
          Go to login page!
        </Button>,
      ]}
    />
  );
};

export default OnSuccessRegister;
