import { Link } from "react-router-dom";

import { BellOutlined, HomeOutlined, SnippetsFilled, UserOutlined } from "@ant-design/icons";

import { ThemeButton } from "@/layouts/header/components/theme-button/index.tsx";

import { useThemeContext } from "@/common/contexts/hooks/use-theme-context";

import useUser from "@/common/users/useUser";
import { LogoutButton } from "@/features/login-page/LogoutUser";

const headerLinkClassName =
  "inline-flex min-h-10 items-center gap-2 rounded-md px-3 text-sm font-medium text-[var(--color-text)] transition hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-brand)]";

export const LandingPageHeader = () => {
  const { user } = useUser();
  const themeContext = useThemeContext();

  const isLoggedIn = !!user;

  if (!themeContext) {
    return null;
  }

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] shadow-[var(--shadow-s)]">
      <div className="mx-auto grid min-h-16 w-full max-w-[1980px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <nav aria-label="Primary navigation" className="flex min-w-0 items-center gap-2">
          <Link className={`${headerLinkClassName} font-semibold`} to="/home">
            <HomeOutlined />
            <span>Home</span>
          </Link>

          {isLoggedIn ? (
            <Link className={headerLinkClassName} to="/book">
              <SnippetsFilled />
              <span>Books</span>
            </Link>
          ) : null}
        </nav>

        <div className="flex justify-center">
          <ThemeButton />
        </div>

        <div className="flex min-w-0 justify-end">
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link
                aria-label="Notifications"
                className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-md text-[var(--color-text-muted)] transition hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-brand)]"
                to="/settings/notifications"
              >
                <BellOutlined />
              </Link>
              <LogoutButton />
            </div>
          ) : (
            <nav aria-label="Account navigation" className="flex items-center gap-2">
              <Link className={headerLinkClassName} to="/auth/login">
                <UserOutlined />
                <span>Sign In</span>
              </Link>
              <Link
                className="inline-flex min-h-10 items-center rounded-md bg-[var(--color-brand)] px-4 text-sm font-semibold text-[var(--color-text-inverse)] transition hover:bg-[var(--color-brand-strong)]"
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
