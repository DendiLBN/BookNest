import { MemoryRouter } from "react-router-dom";

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ProfileView } from "@/features/profile-page";

vi.mock("@/common/users/useUser", () => ({
  default: () => ({
    user: {
      _id: "user-1",
      email: "reader@booknest.dev",
      firstName: "Reader",
      lastName: "Booker",
      favoriteBookIds: ["book-1", "book-2"],
      avatarUrl: "/uploads/avatars/reader.png",
    },
  }),
}));

vi.mock("@/features/users/hooks/useAvatarUpload", () => ({
  useAvatarUpload: () => ({
    fileInputRef: { current: null },
    handleAvatarChange: vi.fn(),
    isUploadingAvatar: false,
    openAvatarPicker: vi.fn(),
  }),
}));

vi.mock("@/features/profile-page/hooks/useProfileForm", () => ({
  useProfileForm: () => ({
    values: {
      email: "reader@booknest.dev",
      firstName: "Reader",
      lastName: "Booker",
    },
    isUpdatingProfile: false,
    handleFieldChange: vi.fn(),
    handleSubmit: vi.fn(),
  }),
}));

describe("ProfileView", () => {
  it("renders account details, favorite count, and profile actions", () => {
    render(
      <MemoryRouter>
        <ProfileView />
      </MemoryRouter>,
    );

    expect(screen.getByText("Reader")).toBeInTheDocument();
    expect(screen.getByText("reader@booknest.dev")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Reader")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Booker")).toBeInTheDocument();
    expect(screen.getByDisplayValue("reader@booknest.dev")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /open favorites/i })).toHaveAttribute(
      "href",
      "/favorites",
    );
    expect(screen.getByRole("link", { name: /change password/i })).toHaveAttribute(
      "href",
      "/auth/change-password",
    );
  });
});
