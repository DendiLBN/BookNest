import { useNavigate } from "react-router-dom";

import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import { useLogOutUserMutation } from "@/features/auth/api";

export const LogoutButton: React.FC = () => {
  const { openNotification } = useNotificationContext();

  const navigate = useNavigate();

  const [logOutUser] = useLogOutUserMutation();

  const handleSuccess = () => {
    openNotification("topRight", "success", "Logged out successfully!", true);
    navigate("/auth/login");
  };

  const handleError = () => {
    openNotification("topRight", "error", "An error occurred while logging out.", false);
  };

  const handleLogout = async () => {
    try {
      await logOutUser({
        onSuccess: handleSuccess,
        onError: handleError,
      }).unwrap();
    } catch {
      // Mutation callbacks already surface the user-facing error.
    }
  };

  return (
    <Button
      style={{
        minHeight: "40px",
        borderColor: "var(--color-border)",
        background: "var(--color-surface)",
        color: "var(--color-text)",
      }}
      icon={<LogoutOutlined />}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};
