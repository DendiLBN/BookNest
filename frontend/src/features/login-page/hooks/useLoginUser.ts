import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import { useLoginUserMutation } from "@/features/auth/api";
import type { TLoginUserRequestBody } from "@/features/auth/types";

export const useLoginUser = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const { openNotification } = useNotificationContext();

  const handleSuccess = () => {
    openNotification("top", "success", `You are logged in successfully! `, true);
  };

  const handleError = () => {
    openNotification(
      "top",
      "error",
      "An error occurred while login!. Please check your password or email.",
      false,
    );
  };

  const submitLogin = ({ email, password }: TLoginUserRequestBody) => {
    loginUser({
      data: { email, password },
      onSuccess: handleSuccess,
      onError: handleError,
    });
  };

  return { submitLogin, loading: isLoading };
};
