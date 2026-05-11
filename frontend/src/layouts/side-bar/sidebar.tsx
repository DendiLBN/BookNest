import { type ChangeEvent, useRef, useState } from "react";

import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";
import { useThemeContext } from "@/common/contexts/hooks/use-theme-context";

import { getApiAssetUrl } from "@/common/config/api";
import useUser from "@/common/users/useUser";
import { useUploadAvatarMutation } from "@/features/users/api";
import { itemsSideBar } from "@/layouts/side-bar/consts/items-side-bar";
import { selectIsLoggedIn, setIsLoggedIn } from "@/store/reducers/auth";

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
    setCollapsed((currentCollapsed) => !currentCollapsed);
  };

  if (!isLoggedIn || !user || !themeContext) {
    return null;
  }

  const { isDarkMode } = themeContext;
  const avatarSrc = getApiAssetUrl(user.avatarUrl);
  const shellClassName = isDarkMode
    ? "border-slate-800 bg-slate-950 text-slate-100"
    : "border-slate-200 bg-white text-slate-950";

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
    <aside
      className={`relative hidden min-h-[calc(100vh-64px)] shrink-0 border-r transition-[width] duration-200 md:block ${
        collapsed ? "w-20" : "w-64"
      } ${shellClassName}`}
    >
      <div className="flex flex-col items-center gap-3 border-b border-inherit px-3 py-5">
        <button
          aria-label="Change avatar"
          className="rounded-full transition hover:opacity-80 focus:ring-2 focus:ring-emerald-600/30 focus:outline-none disabled:cursor-progress"
          disabled={isUploadingAvatar}
          onClick={handleAvatarClick}
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
        {collapsed ? null : <h3 className="m-0 text-sm font-semibold">{user.firstName}</h3>}
      </div>

      <Menu
        className="border-0"
        defaultOpenKeys={collapsed ? [] : ["profile", "settings"]}
        defaultSelectedKeys={["dashboard"]}
        inlineCollapsed={collapsed}
        items={itemsSideBar}
        mode="inline"
        theme={isDarkMode ? "dark" : "light"}
      />

      <button
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute right-3 bottom-5 inline-flex min-h-9 min-w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100"
        onClick={toggleCollapsed}
        type="button"
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </button>
    </aside>
  );
};
