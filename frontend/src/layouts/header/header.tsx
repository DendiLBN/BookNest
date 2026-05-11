import { Link } from "react-router-dom";

import { BellOutlined, HomeOutlined, SnippetsFilled, UserOutlined } from "@ant-design/icons";

import { ThemeButton } from "@/layouts/header/components/theme-button/index.tsx";

import useUser from "@/common/users/useUser";
import { LogoutButton } from "@/features/login-page/LogoutUser";

const headerLinkClassName =
  "inline-flex min-h-10 items-center gap-2 rounded-md px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-emerald-700";

export const LandingPageHeader = () => {
  const { user } = useUser();

  const isLoggedIn = !!user;

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-[1980px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <nav aria-label="Primary navigation" className="flex min-w-0 items-center gap-2">
          <Link className={`${headerLinkClassName} font-semibold`} to="/home">
            <HomeOutlined />
            <span>BookNest</span>
          </Link>

          {isLoggedIn ? (
            <Link className={headerLinkClassName} to="/book">
              <SnippetsFilled />
              <span>Books</span>
            </Link>
          ) : null}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeButton />

          {isLoggedIn ? (
            <>
              <Link
                aria-label="Notifications"
                className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-md text-slate-600 transition hover:bg-slate-100 hover:text-emerald-700"
                to="/settings/notifications"
              >
                <BellOutlined />
              </Link>
              <LogoutButton />
            </>
          ) : (
            <nav aria-label="Account navigation" className="flex items-center gap-2">
              <Link className={headerLinkClassName} to="/auth/login">
                <UserOutlined />
                <span>Sign In</span>
              </Link>
              <Link
                className="inline-flex min-h-10 items-center rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800"
                to="/auth/register"
              >
                Register
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};
