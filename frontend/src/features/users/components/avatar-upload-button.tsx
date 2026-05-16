import { CameraOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

type TAvatarUploadButtonProps = {
  avatarSrc?: string;
  isUploading: boolean;
  onClick: () => void;
};

export const AvatarUploadButton = ({
  avatarSrc,
  isUploading,
  onClick,
}: TAvatarUploadButtonProps) => (
  <button
    aria-label="Change avatar"
    className="group relative rounded-full transition hover:opacity-90 focus:ring-2 focus:ring-app-brand/30 focus:outline-none disabled:cursor-progress"
    disabled={isUploading}
    onClick={onClick}
    type="button"
  >
    <Avatar
      className="border border-app-border bg-app-accent-soft text-app-accent"
      size={64}
      icon={<UserOutlined />}
      src={avatarSrc}
    />
    <span className="absolute right-0 bottom-0 grid h-6 w-6 place-items-center rounded-full border border-app-border bg-app-surface text-xs text-app-brand shadow-sm">
      <CameraOutlined />
    </span>
  </button>
);
