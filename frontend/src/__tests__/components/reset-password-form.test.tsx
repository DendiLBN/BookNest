import { MemoryRouter } from "react-router-dom";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ResetPasswordForm from "@/features/login-page/components/forms/reset-password-form";

const resetPassword = vi.fn();
const openNotification = vi.fn();

vi.mock("@/common/contexts/hooks/use-notification-context", () => ({
  useNotificationContext: () => ({
    openNotification,
  }),
}));

vi.mock("@/store/api/auth", () => ({
  useResetPasswordMutation: () => [resetPassword, { isLoading: false }],
}));

const renderResetPasswordForm = (initialEntry = "/auth/reset-password?token=reset-token") =>
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <ResetPasswordForm />
    </MemoryRouter>,
  );

describe("ResetPasswordForm", () => {
  beforeEach(() => {
    resetPassword.mockClear();
    openNotification.mockClear();
  });

  it("submits the token and new password from the reset link", async () => {
    renderResetPasswordForm();

    await userEvent.type(screen.getByLabelText(/^new password/i), "password123");
    await userEvent.type(screen.getByLabelText(/confirm new password/i), "password123");
    await userEvent.click(screen.getByRole("button", { name: /reset password/i }));

    expect(resetPassword).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {
          token: "reset-token",
          newPassword: "password123",
        },
      }),
    );
  });

  it("shows an error when the reset token is missing", async () => {
    renderResetPasswordForm("/auth/reset-password");

    await userEvent.type(screen.getByLabelText(/^new password/i), "password123");
    await userEvent.type(screen.getByLabelText(/confirm new password/i), "password123");
    await userEvent.click(screen.getByRole("button", { name: /reset password/i }));

    expect(openNotification).toHaveBeenCalledWith(
      "topRight",
      "error",
      "Reset token is missing.",
      false,
    );
    expect(resetPassword).not.toHaveBeenCalled();
  });
});
