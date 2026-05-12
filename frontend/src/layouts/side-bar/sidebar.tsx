import { type ChangeEvent, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import {
  CameraOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
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
  const { pathname } = useLocation();

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
  const menuTheme = isDarkMode ? "dark" : "light";
  const selectedMenuKey = pathname.startsWith("/book")
    ? "books"
    : pathname.startsWith("/favorites")
      ? "favorites"
      : pathname.startsWith("/auth/change-password")
        ? "change-password"
        : "dashboard";

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
      className={`app-sidebar app-layout-surface relative hidden min-h-[calc(100vh-64px)] shrink-0 border-r transition-[width] duration-200 md:block ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="m-3 flex flex-col items-center gap-3 overflow-hidden rounded-lg border border-app-border bg-[linear-gradient(180deg,var(--color-surface-muted),var(--color-surface))] px-3 py-5 shadow-app-s">
        <button
          aria-label="Change avatar"
          className="group relative rounded-full transition hover:opacity-90 focus:ring-2 focus:ring-app-brand/30 focus:outline-none disabled:cursor-progress"
          disabled={isUploadingAvatar}
          onClick={handleAvatarClick}
          type="button"
        >
          <Avatar
            className="border border-app-border bg-app-accent-soft text-app-accent"
            size={64}
            icon={<UserOutlined />}
            src={avatarSrc}
          />
          <span className="absolute right-0 bottom-0 grid h-6 w-6 place-items-center rounded-full border border-app-border bg-app-surface text-xs text-app-brand shadow-sm">
            <CameraOutlined />
          </span>
        </button>
        <input
          accept="image/png,image/jpeg,image/webp"
          hidden
          onChange={handleAvatarChange}
          ref={fileInputRef}
          type="file"
        />
        {collapsed ? null : (
          <div className="min-w-0 text-center">
            <h3 className="m-0 truncate text-sm font-semibold text-app-text">{user.firstName}</h3>
            <p className="m-0 mt-1 truncate text-xs text-app-text-muted">{user.email}</p>
          </div>
        )}
      </div>

      <Menu
        className="border-0 px-2"
        defaultOpenKeys={collapsed ? [] : ["profile", "settings"]}
        inlineCollapsed={collapsed}
        items={itemsSideBar}
        mode="inline"
        selectedKeys={[selectedMenuKey]}
        theme={menuTheme}
      />

      <button
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute right-3 bottom-5 inline-flex min-h-9 min-w-9 items-center justify-center rounded-md border border-app-border bg-app-surface text-app-text shadow-sm transition hover:bg-app-surface-muted hover:text-app-brand"
        onClick={toggleCollapsed}
        type="button"
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </button>
    </aside>
  );
};
