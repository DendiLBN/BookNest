import { useNavigate } from "react-router-dom";

import { Modal } from "antd";
import { useDispatch } from "react-redux";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import { removeTokens } from "@/common/utils/removeTokens";
import { useDeleteAccountMutation } from "@/store/api/users";
import { logOutUser } from "@/store/reducers/auth";

export const useDeleteAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openNotification } = useNotificationContext();
  const [deleteAccount, { isLoading: isDeletingAccount }] = useDeleteAccountMutation();

  const handleDeleteAccount = () => {
    Modal.confirm({
      title: "Delete account",
      content: "This action cannot be undone.",
      okText: "Delete account",
      okButtonProps: { danger: true },
      cancelText: "Cancel",
      async onOk() {
        try {
          await deleteAccount().unwrap();
          removeTokens();
          dispatch(logOutUser());
          navigate("/auth/login", { replace: true });
        } catch {
          openNotification("topRight", "error", "Could not delete account.", false);
        }
      },
    });
  };

  return {
    isDeletingAccount,
    handleDeleteAccount,
  };
};
