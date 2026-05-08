import { ChangeEvent, useRef, useState } from "react";

import { UserOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";

import "@/assets/layouts-styles/sidebar.css";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";
import { useThemeContext } from "@/common/contexts/hooks/use-theme-context";

import { getApiAssetUrl } from "@/common/config/api";
import useUser from "@/common/users/useUser";
import { itemsSideBar } from "@/layouts/side-bar/consts/items-side-bar";
import { useUploadAvatarMutation } from "@/store/api/users";
import { selectIsLoggedIn, setIsLoggedIn } from "@/store/reducers/auth";

const { Sider } = Layout;

export const LandingPageSideBar = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadAvatar, { isLoading: isUploadingAvatar }] = useUploadAvatarMutation();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { user } = useUser();
  const { openNotification } = useNotificationContext();

  const themeContext = useThemeContext();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  if (!user || !themeContext) {
    return null;
  }

  const { isDarkMode } = themeContext;
  const avatarSrc = getApiAssetUrl(user.avatarUrl);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const avatarFormData = new FormData();
    avatarFormData.append("avatar", file);

    try {
      const updatedUser = await uploadAvatar(avatarFormData).unwrap();
      dispatch(setIsLoggedIn({ isLoggedIn: true, user: updatedUser }));
      openNotification("topRight", "success", "Avatar updated successfully.", false);
    } catch {
      openNotification("topRight", "error", "Could not update avatar.", false);
    } finally {
      event.target.value = "";
    }
  };

  return (
    isLoggedIn && (
      <Sider
        className="landing__page-sidebar"
        theme="light"
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        width={200}
        trigger={true}
      >
        <div style={{ textAlign: "center", padding: "5px", marginTop: "15px" }}>
          <button
            aria-label="Change avatar"
            disabled={isUploadingAvatar}
            onClick={handleAvatarClick}
            style={{
              border: "none",
              background: "transparent",
              cursor: isUploadingAvatar ? "progress" : "pointer",
              padding: 0,
            }}
            type="button"
          >
            <Avatar size={64} icon={<UserOutlined />} src={avatarSrc} />
          </button>
          <input
            accept="image/png,image/jpeg,image/webp"
            hidden
            onChange={handleAvatarChange}
            ref={fileInputRef}
            type="file"
          />
          <h3
            style={{
              marginTop: "20px",
              color: isDarkMode ? "#e0e0e0" : "#333333",
            }}
          >
            {user.firstName}
          </h3>
        </div>
        <Menu
          mode="inline"
          style={{ borderInlineEnd: "none" }}
          theme="light"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          items={itemsSideBar}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <div onClick={toggleCollapsed} style={{ cursor: "pointer" }}>
            {collapsed ? "▶" : "◁"}
          </div>
        </div>
      </Sider>
    )
  );
};
