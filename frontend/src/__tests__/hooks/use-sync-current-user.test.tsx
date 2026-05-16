import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/common/consts/local-storage";
import { useSyncCurrentUser } from "@/common/users/useSyncCurrentUser";
import type { TUser } from "@/features/users/types";
import { useFetchUsersQuery } from "@/store/api/users";
import { setIsLoggedIn } from "@/store/reducers/auth";

const dispatch = vi.fn();

vi.mock("react-redux", () => ({
  useDispatch: () => dispatch,
}));

vi.mock("@/store/api/users", () => ({
  useFetchUsersQuery: vi.fn(),
}));

describe("useSyncCurrentUser", () => {
  beforeEach(() => {
    localStorage.clear();
    dispatch.mockClear();
    vi.mocked(useFetchUsersQuery).mockReturnValue({
      data: undefined,
      isError: false,
    } as unknown as ReturnType<typeof useFetchUsersQuery>);
  });

  it("clears auth state when there is no stored session", () => {
    renderHook(() => useSyncCurrentUser());

    expect(useFetchUsersQuery).toHaveBeenCalledWith(undefined, { skip: true });
    expect(dispatch).toHaveBeenCalledWith(setIsLoggedIn({ isLoggedIn: false, user: null }));
  });

  it("stores the current user when a stored session is valid", () => {
    const user: TUser = {
      _id: "user-1",
      email: "reader@booknest.dev",
      firstName: "Reader",
      lastName: "Booker",
      favoriteBookIds: [],
      role: "customer",
    };

    localStorage.setItem(ACCESS_TOKEN, "access-token");
    localStorage.setItem(REFRESH_TOKEN, "refresh-token");
    vi.mocked(useFetchUsersQuery).mockReturnValue({
      data: user,
      isError: false,
    } as unknown as ReturnType<typeof useFetchUsersQuery>);

    renderHook(() => useSyncCurrentUser());

    expect(useFetchUsersQuery).toHaveBeenCalledWith(undefined, { skip: false });
    expect(dispatch).toHaveBeenCalledWith(setIsLoggedIn({ isLoggedIn: true, user }));
  });
});
