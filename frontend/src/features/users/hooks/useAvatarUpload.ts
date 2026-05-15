import { type ChangeEvent, useRef } from "react";

import { useDispatch } from "react-redux";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import {
  ALLOWED_AVATAR_MIME_TYPES,
  MAX_AVATAR_FILE_SIZE_BYTES,
} from "@/features/users/consts/avatar-upload";
import { useUploadAvatarMutation } from "@/store/api/users";
import { setIsLoggedIn } from "@/store/reducers/auth";

export const useAvatarUpload = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadAvatar, { isLoading }] = useUploadAvatarMutation();
  const dispatch = useDispatch();
  const { openNotification } = useNotificationContext();

  const openAvatarPicker = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      if (!ALLOWED_AVATAR_MIME_TYPES.includes(file.type)) {
        openNotification("topRight", "error", "Avatar must be a JPG, PNG, or WEBP image.", false);
        return;
      }

      if (file.size > MAX_AVATAR_FILE_SIZE_BYTES) {
        openNotification("topRight", "error", "Avatar must be 2 MB or smaller.", false);
        return;
      }

      const avatarFormData = new FormData();
      avatarFormData.append("avatar", file);

      const updatedUser = await uploadAvatar(avatarFormData).unwrap();
      dispatch(setIsLoggedIn({ isLoggedIn: true, user: updatedUser }));
      openNotification("topRight", "success", "Avatar updated successfully.", false);
    } catch {
      openNotification("topRight", "error", "Could not update avatar.", false);
    } finally {
      event.target.value = "";
    }
  };

  return {
    fileInputRef,
    isUploadingAvatar: isLoading,
    handleAvatarChange,
    openAvatarPicker,
  };
};
