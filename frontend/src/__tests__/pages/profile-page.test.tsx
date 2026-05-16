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
    errors: {},
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

vi.mock("@/features/profile-page/hooks/useDeleteAccount", () => ({
  useDeleteAccount: () => ({
    isDeletingAccount: false,
    handleDeleteAccount: vi.fn(),
  }),
}));

vi.mock("@/features/login-page/components/forms/change-password-form", () => ({
  default: () => <div>Embedded change password form</div>,
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
    expect(screen.getByText("Embedded change password form")).toBeInTheDocument();
  });
});
