import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import ChangePasswordForm from "@/features/login-page/components/forms/change-password-form";

vi.mock("@/common/contexts/hooks/use-notification-context", () => ({
  useNotificationContext: () => ({
    openNotification: vi.fn(),
  }),
}));

vi.mock("@/store/api/auth", () => ({
  useChangePasswordMutation: () => [vi.fn(), { isLoading: false }],
}));

describe("ChangePasswordForm behavior", () => {
  it("accepts matching passwords inside the configured length range", async () => {
    render(<ChangePasswordForm />);

    await userEvent.type(screen.getByLabelText(/old password/i), "old-password");
    await userEvent.type(screen.getByLabelText(/^new password/i), "password123");
    await userEvent.type(screen.getByLabelText(/confirm new password/i), "password123");
    await userEvent.click(screen.getByRole("button", { name: /save new password/i }));

    expect(screen.queryByText(/the two passwords do not match/i)).not.toBeInTheDocument();
  });

  it("rejects a 100 character new password because max length is 32", async () => {
    render(<ChangePasswordForm />);
    const longPassword = "a".repeat(100);

    fireEvent.change(screen.getByLabelText(/old password/i), {
      target: { value: "old-password" },
    });
    fireEvent.change(screen.getByLabelText(/^new password/i), {
      target: { value: longPassword },
    });
    fireEvent.change(screen.getByLabelText(/confirm new password/i), {
      target: { value: longPassword },
    });
    await userEvent.click(screen.getByRole("button", { name: /save new password/i }));

    expect(await screen.findByText(/please input your new password/i)).toBeInTheDocument();
  });
});
