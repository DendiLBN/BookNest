import type { ReactNode } from "react";

import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, it, vi } from "vitest";

import { useProfileForm } from "@/features/profile-page/hooks/useProfileForm";

import type { TUser } from "@/features/users/types";
import { authReducer } from "@/store/reducers/auth";

const updateProfile = vi.fn();
const openNotification = vi.fn();

vi.mock("@/store/api/users", () => ({
  useUpdateProfileMutation: () => [updateProfile, { isLoading: false }],
}));

vi.mock("@/common/contexts/hooks/use-notification-context", () => ({
  useNotificationContext: () => ({ openNotification }),
}));

const user: TUser = {
  _id: "user-1",
  email: "reader@booknest.dev",
  firstName: "Reader",
  lastName: "Booker",
  favoriteBookIds: [],
};

describe("useProfileForm", () => {
  it("updates the authenticated user after a successful save", async () => {
    const updatedUser = {
      ...user,
      email: "updated@booknest.dev",
    };
    updateProfile.mockReturnValue({
      unwrap: vi.fn().mockResolvedValue(updatedUser),
    });

    const store = configureStore({
      reducer: {
        authReducer: authReducer.reducer,
      },
      preloadedState: {
        authReducer: {
          isLoggedIn: true,
          user,
        },
      },
    });
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );
    const { result } = renderHook(() => useProfileForm({ user }), { wrapper });

    act(() => {
      result.current.handleFieldChange("email", updatedUser.email);
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(updateProfile).toHaveBeenCalledWith({
      email: updatedUser.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
    expect(store.getState().authReducer.user).toEqual(updatedUser);
    expect(openNotification).toHaveBeenCalledWith("topRight", "success", "Profile updated.", false);
  });
});
