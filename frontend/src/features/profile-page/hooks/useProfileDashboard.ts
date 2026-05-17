import { useDeleteAccount } from "@/features/profile-page/hooks/useDeleteAccount";
import { useProfileForm } from "@/features/profile-page/hooks/useProfileForm";
import { useAvatarUpload } from "@/features/users/hooks/useAvatarUpload";

import { getApiAssetUrl } from "@/common/config/api";
import useUser from "@/common/users/useUser";

export const useProfileDashboard = () => {
  const { user } = useUser();
  const { fileInputRef, handleAvatarChange, isUploadingAvatar, openAvatarPicker } =
    useAvatarUpload();
  const { errors, handleFieldChange, handleSubmit, isUpdatingProfile, values } = useProfileForm({
    user,
  });
  const { handleDeleteAccount, isDeletingAccount } = useDeleteAccount();

  if (!user) {
    return null;
  }

  return {
    dangerZoneProps: {
      handleDeleteAccount,
      isDeletingAccount,
    },
    detailsFormProps: {
      errors,
      handleFieldChange,
      handleSubmit,
      isUpdatingProfile,
      values,
    },
    headerProps: {
      avatarSrc: getApiAssetUrl(user.avatarUrl),
      email: user.email,
      fileInputRef,
      firstName: user.firstName,
      handleAvatarChange,
      isUploadingAvatar,
      openAvatarPicker,
    },
    statsProps: {
      favoriteBooksCount: user.favoriteBookIds?.length ?? 0,
    },
  };
};
