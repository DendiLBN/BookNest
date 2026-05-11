import { useLocation, useNavigate } from "react-router-dom";

import { Button, Result } from "antd";

import type { TOnSuccessRegisterProps } from "@/features/auth/types";

export const OnSuccessRegister = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { firstName, email }: TOnSuccessRegisterProps = location.state;

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
