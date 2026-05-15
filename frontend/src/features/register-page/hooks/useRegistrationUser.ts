import { useNavigate } from "react-router-dom";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import { useRegisterUserMutation } from "@/features/auth/api";
import type { TRegisterUserRequestBody, TRegisterUserResponse } from "@/features/auth/types";

export const useRegistrationUser = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const { openNotification } = useNotificationContext();

  const navigate = useNavigate();

  const handleSuccess = (data: TRegisterUserResponse) => {
    navigate("/success", {
      state: { firstName: data.firstName, email: data.email },
    });
  };

  const handleError = () => {
    openNotification(
      "topRight",
      "error",
      "An error occurred while registering user. Please try again later.",
      false,
    );
  };

  const submitRegistration = ({
    email,
    password,
    firstName,
    lastName,
  }: TRegisterUserRequestBody) => {
    registerUser({
      data: {
        firstName,
        lastName,
        email,
        password,
      },
      onSuccess: handleSuccess,
      onError: handleError,
    });
  };

  return { submitRegistration, loading: isLoading };
};
