import { useNavigate } from "react-router-dom";

import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import { useLogOutUserMutation } from "@/store/api/auth";

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
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Button
      style={{ padding: "31px", borderRadius: "0px" }}
      icon={<LogoutOutlined />}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};
