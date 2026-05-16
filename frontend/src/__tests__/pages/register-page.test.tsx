import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ThemeContext } from "@/common/contexts/theme-context";

import RegisterPage from "@/features/register-page";

const submitRegistration = vi.fn();

vi.mock("@/features/register-page/hooks/useRegistrationUser", () => ({
  useRegistrationUser: () => ({
    loading: false,
    submitRegistration,
  }),
}));

const renderRegisterPage = () =>
  render(
    <ThemeContext.Provider
      value={{
        isDarkMode: false,
        handleToggleTheme: vi.fn(),
        previous: "dark",
      }}
    >
      <RegisterPage />
    </ThemeContext.Provider>,
  );

describe("RegisterPage", () => {
  it("submits only backend registration fields", async () => {
    renderRegisterPage();

    await userEvent.type(screen.getByPlaceholderText("Email"), "reader@booknest.dev");
    await userEvent.type(screen.getByPlaceholderText("Password"), "password123");
    await userEvent.type(screen.getByPlaceholderText("Confirm Password"), "password123");
    await userEvent.type(screen.getByPlaceholderText("First Name"), "Reader");
    await userEvent.type(screen.getByPlaceholderText("Last Name"), "Booker");
    await userEvent.click(screen.getByRole("button", { name: /create account/i }));

    expect(submitRegistration).toHaveBeenCalledWith({
      email: "reader@booknest.dev",
      password: "password123",
      firstName: "Reader",
      lastName: "Booker",
    });
  });
});
