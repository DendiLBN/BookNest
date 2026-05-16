import { Link } from "react-router-dom";

import { HomeOutlined, SnippetsFilled, UserOutlined } from "@ant-design/icons";
import { Layout } from "antd";

import { NotificationCenter } from "@/layouts/header/components/notification-center";
import { ThemeButton } from "@/layouts/header/components/theme-button/index.tsx";

import useUser from "@/common/users/useUser";
import { LogoutButton } from "@/features/login-page/LogoutUser";

const { Header } = Layout;

const headerLinkClassName =
  "inline-flex min-h-10 shrink-0 items-center gap-xs rounded-m px-s text-sm font-semibold text-app-text no-underline transition hover:bg-app-surface-muted hover:text-app-brand";

export const LandingPageHeader = () => {
  const { user } = useUser();

  const isLoggedIn = !!user;

  return (
    <Header className="app-header app-layout-surface sticky top-0 z-20 border-b px-0 shadow-app-s">
      <div className="grid min-h-16 w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-s px-s sm:px-sm lg:px-l 3xl:px-22">
        <nav aria-label="Primary navigation" className="flex shrink-0 items-center gap-xs">
          <Link className={headerLinkClassName} to="/home">
            <HomeOutlined />
            Home
          </Link>
          {isLoggedIn ? (
            <Link className={headerLinkClassName} to="/book">
              <SnippetsFilled />
              Books
            </Link>
          ) : null}
        </nav>

        <div className="flex min-w-0 justify-center">
          <ThemeButton />
        </div>

        <div className="flex shrink-0 items-center justify-end gap-xs">
          {isLoggedIn ? (
            <>
              <NotificationCenter />
              <LogoutButton />
            </>
          ) : (
            <nav aria-label="Account navigation" className="flex shrink-0 items-center gap-xs">
              <Link className={headerLinkClassName} to="/auth/login">
                <UserOutlined />
                Sign In
              </Link>
              <Link className={headerLinkClassName} to="/auth/register">
                <UserOutlined />
                Register
              </Link>
            </nav>
          )}
        </div>
      </div>
    </Header>
  );
};
