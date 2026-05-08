import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import { TLoginUserRequestBody } from "@/types/types";

import { useLoginUserMutation } from "@/features/auth/api";
import { useFetchUsersQuery } from "@/features/users/api";

export const useLoginUser = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const { refetch } = useFetchUsersQuery(undefined, { skip: true });

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

  const fetchBodyLoginUser = async ({ email, password }: TLoginUserRequestBody) => {
    loginUser({
      data: { email, password },
      onSuccess: handleSuccess,
      onError: handleError,
    });
  };

  return { fetchBodyLoginUser, refetch, loading: isLoading };
};
