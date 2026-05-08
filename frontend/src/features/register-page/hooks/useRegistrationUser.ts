import { useNavigate } from "react-router-dom";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import { TRegisterUserResponse } from "@/types/api/auth-user";
import { TRegisterUserRequestBody } from "@/types/types";

import { useRegisterUserMutation } from "@/features/auth/api";

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

  const RegistrationUserData = async ({
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
    }).unwrap();
  };

  return { RegistrationUserData, loading: isLoading };
};
