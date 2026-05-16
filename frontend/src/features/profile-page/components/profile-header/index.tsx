import type { ChangeEvent, RefObject } from "react";

import { AvatarUploadButton } from "@/features/users/components/avatar-upload-button";

type TProfileHeaderProps = {
  avatarSrc?: string;
  email: string;
  fileInputRef: RefObject<HTMLInputElement>;
  firstName: string;
  handleAvatarChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isUploadingAvatar: boolean;
  openAvatarPicker: () => void;
};

export const ProfileHeader = ({
  avatarSrc,
  email,
  fileInputRef,
  firstName,
  handleAvatarChange,
  isUploadingAvatar,
  openAvatarPicker,
}: TProfileHeaderProps) => (
  <section className="grid gap-s rounded-l border border-app-border bg-app-surface p-s shadow-app-s md:grid-cols-[auto_minmax(0,1fr)] md:items-center md:p-m">
    <div className="flex justify-center">
      <AvatarUploadButton
        avatarSrc={avatarSrc}
        isUploading={isUploadingAvatar}
        onClick={openAvatarPicker}
      />
      <input
        accept="image/png,image/jpeg,image/webp"
        hidden
        onChange={handleAvatarChange}
        ref={fileInputRef}
        type="file"
      />
    </div>

    <div className="min-w-0">
      <p className="m-0 text-xs font-bold text-app-brand uppercase">Profile</p>
      <h1 className="mt-xs mb-1 truncate text-2xl font-bold text-app-text">{firstName}</h1>
      <p className="m-0 truncate text-app-text-muted">{email}</p>
    </div>
  </section>
);
