import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import ChangePasswordForm from "./change-password-form";

describe("ChangePasswordForm", () => {
  it("renders password fields and submit button", () => {
    render(<ChangePasswordForm />);

    expect(screen.getByLabelText(/old password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^new password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm new password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save new password/i })).toBeEnabled();
  });

  it("shows a validation message when confirmation does not match", async () => {
    render(<ChangePasswordForm />);

    await userEvent.type(screen.getByLabelText(/^new password/i), "password123");
    await userEvent.type(screen.getByLabelText(/confirm new password/i), "different123");
    await userEvent.click(screen.getByRole("button", { name: /save new password/i }));

    expect(await screen.findByText(/the two passwords do not match/i)).toBeInTheDocument();
  });
});
