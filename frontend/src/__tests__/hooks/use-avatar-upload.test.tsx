import type { ChangeEvent } from "react";

import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useAvatarUpload } from "@/features/users/hooks/useAvatarUpload";

const dispatch = vi.fn();
const openNotification = vi.fn();
const uploadAvatar = vi.fn();

vi.mock("react-redux", () => ({
  useDispatch: () => dispatch,
}));

vi.mock("@/common/contexts/hooks/use-notification-context", () => ({
  useNotificationContext: () => ({
    openNotification,
  }),
}));

vi.mock("@/store/api/users", () => ({
  useUploadAvatarMutation: () => [uploadAvatar, { isLoading: false }],
}));

const createFileChangeEvent = (file: File) =>
  ({
    target: {
      files: [file],
      value: "avatar",
    },
  }) as unknown as ChangeEvent<HTMLInputElement>;

describe("useAvatarUpload", () => {
  beforeEach(() => {
    dispatch.mockClear();
    openNotification.mockClear();
    uploadAvatar.mockReset();
  });

  it("rejects unsupported avatar mime types before upload", async () => {
    const { result } = renderHook(() => useAvatarUpload());
    const file = new File(["script"], "avatar.svg", { type: "image/svg+xml" });

    await act(async () => {
      await result.current.handleAvatarChange(createFileChangeEvent(file));
    });

    expect(uploadAvatar).not.toHaveBeenCalled();
    expect(openNotification).toHaveBeenCalledWith(
      "topRight",
      "error",
      "Avatar must be a JPG, PNG, or WEBP image.",
      false,
    );
  });

  it("rejects avatars larger than two megabytes before upload", async () => {
    const { result } = renderHook(() => useAvatarUpload());
    const file = new File([new Uint8Array(2 * 1024 * 1024 + 1)], "avatar.png", {
      type: "image/png",
    });

    await act(async () => {
      await result.current.handleAvatarChange(createFileChangeEvent(file));
    });

    expect(uploadAvatar).not.toHaveBeenCalled();
    expect(openNotification).toHaveBeenCalledWith(
      "topRight",
      "error",
      "Avatar must be 2 MB or smaller.",
      false,
    );
  });
});
