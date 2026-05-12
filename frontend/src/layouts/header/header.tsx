import { Layout, Menu } from "antd";

import useUser from "@/common/users/useUser";
import { LogoutButton } from "@/features/login-page/LogoutUser";
import {
  homeMenuItem,
  leftMenuItems,
  middleMenuItems,
  rightMenuItems,
  userMenuItems,
} from "@/layouts/header/consts/menu-items";

const { Header } = Layout;

const menuClassName = "min-w-max shrink-0 border-none bg-transparent";

export const LandingPageHeader = () => {
  const { user } = useUser();

  const isLoggedIn = !!user;

  return (
    <Header className="app-header app-layout-surface sticky top-0 z-20 border-b px-0 shadow-[var(--shadow-s)]">
      <div className="mx-auto grid min-h-16 w-full max-w-[var(--content-max-width)] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex shrink-0 items-center gap-2">
          <Menu className={menuClassName} items={homeMenuItem} mode="horizontal" theme="light" />
          {isLoggedIn ? (
            <Menu className={menuClassName} items={leftMenuItems} mode="horizontal" theme="light" />
          ) : null}
        </div>

        <div className="flex min-w-0 justify-center">
          <Menu className={menuClassName} items={middleMenuItems} mode="horizontal" theme="light" />
        </div>

        <div className="flex shrink-0 items-center justify-end gap-2">
          {isLoggedIn ? (
            <>
              <Menu
                className={menuClassName}
                items={userMenuItems}
                mode="horizontal"
                theme="light"
              />
              <LogoutButton />
            </>
          ) : (
            <Menu
              className={menuClassName}
              items={rightMenuItems}
              mode="horizontal"
              theme="light"
            />
          )}
        </div>
      </div>
    </Header>
  );
};
