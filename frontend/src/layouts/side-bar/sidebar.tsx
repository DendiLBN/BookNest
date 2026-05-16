import { useState } from "react";
import { useLocation } from "react-router-dom";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useSelector } from "react-redux";

import { AvatarUploadButton } from "@/features/users/components/avatar-upload-button";

import { useAvatarUpload } from "@/features/users/hooks/useAvatarUpload";

import { useThemeContext } from "@/common/contexts/hooks/use-theme-context";

import { getApiAssetUrl } from "@/common/config/api";
import useUser from "@/common/users/useUser";
import { itemsSideBar } from "@/layouts/side-bar/consts/items-side-bar";
import { selectIsLoggedIn } from "@/store/reducers/auth";

export const LandingPageSideBar = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { pathname } = useLocation();
  const { fileInputRef, handleAvatarChange, isUploadingAvatar, openAvatarPicker } =
    useAvatarUpload();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { user } = useUser();

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
    : pathname.startsWith("/cart")
      ? "cart"
      : pathname.startsWith("/favorites")
        ? "favorites"
        : pathname.startsWith("/profile")
          ? "profile-overview"
          : "dashboard";

  return (
    <aside
      className={`app-sidebar app-layout-surface relative hidden min-h-[calc(100vh-64px)] shrink-0 border-r transition-[width] duration-200 md:block ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="m-3 flex flex-col items-center gap-3 overflow-hidden rounded-lg border border-app-border bg-[linear-gradient(180deg,var(--color-surface-muted),var(--color-surface))] px-3 py-5 shadow-app-s">
        <AvatarUploadButton
          avatarSrc={avatarSrc}
          isUploading={isUploadingAvatar}
          onClick={openAvatarPicker}
        />
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
        defaultOpenKeys={collapsed ? [] : ["profile"]}
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
