import { Link } from "react-router-dom";

import { BookOutlined, HeartFilled, LockOutlined } from "@ant-design/icons";

import { AvatarUploadButton } from "@/features/users/components/avatar-upload-button";

import { useAvatarUpload } from "@/features/users/hooks/useAvatarUpload";

import { getApiAssetUrl } from "@/common/config/api";
import useUser from "@/common/users/useUser";

export const ProfileView = () => {
  const { user } = useUser();
  const { fileInputRef, handleAvatarChange, isUploadingAvatar, openAvatarPicker } =
    useAvatarUpload();

  if (!user) {
    return null;
  }

  const favoriteBooksCount = user.favoriteBookIds.length;
  const avatarSrc = getApiAssetUrl(user.avatarUrl);

  return (
    <div className="flex flex-col gap-l">
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
          <h1 className="mt-xs mb-1 truncate text-2xl font-bold text-app-text">{user.firstName}</h1>
          <p className="m-0 truncate text-app-text-muted">{user.email}</p>
        </div>
      </section>

      <section className="grid gap-s md:grid-cols-3">
        <article className="rounded-l border border-app-border bg-app-surface p-s shadow-app-s">
          <HeartFilled className="text-xl text-app-brand" />
          <strong className="mt-xs block text-2xl text-app-text">{favoriteBooksCount}</strong>
          <p className="m-0 text-app-text-muted">Favorite books</p>
        </article>
        <article className="rounded-l border border-app-border bg-app-surface p-s shadow-app-s">
          <BookOutlined className="text-xl text-app-accent" />
          <strong className="mt-xs block text-2xl text-app-text">Active</strong>
          <p className="m-0 text-app-text-muted">Account status</p>
        </article>
        <article className="rounded-l border border-app-border bg-app-surface p-s shadow-app-s">
          <LockOutlined className="text-xl text-app-warning" />
          <strong className="mt-xs block text-2xl text-app-text">Protected</strong>
          <p className="m-0 text-app-text-muted">Password access</p>
        </article>
      </section>

      <section className="grid gap-s lg:grid-cols-2">
        <article className="rounded-l border border-app-border bg-app-surface p-s shadow-app-s">
          <h2 className="mt-0 mb-xs text-lg font-bold text-app-text">Reading profile</h2>
          <p className="mt-0 text-app-text-muted">
            Keep your favorite books close and return to saved titles from one place.
          </p>
          <Link
            className="font-semibold text-app-accent no-underline hover:underline"
            to="/favorites"
          >
            Open favorites
          </Link>
        </article>

        <article className="rounded-l border border-app-border bg-app-surface p-s shadow-app-s">
          <h2 className="mt-0 mb-xs text-lg font-bold text-app-text">Account security</h2>
          <p className="mt-0 text-app-text-muted">
            Refresh your password regularly and keep your account protected.
          </p>
          <Link
            className="font-semibold text-app-accent no-underline hover:underline"
            to="/auth/change-password"
          >
            Change password
          </Link>
        </article>
      </section>
    </div>
  );
};
