import type { ChangeEvent, RefObject } from "react";

import { Button } from "antd";

import type { TBook } from "@/features/book-page/types";
import type { TUser } from "@/features/users/types";

const fallbackCoverImage = "/book.png";

type TBookDetailsCoverProps = {
  book: TBook;
  fileInputRef: RefObject<HTMLInputElement>;
  isUploadingCover: boolean;
  user: TUser | null;
  handleCoverChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  openCoverPicker: () => void;
};

export const BookDetailsCover = ({
  book,
  fileInputRef,
  handleCoverChange,
  isUploadingCover,
  openCoverPicker,
  user,
}: TBookDetailsCoverProps) => (
  <div className="flex flex-col gap-xs">
    <img
      src={book.coverImageUrl || book.avatar || fallbackCoverImage}
      alt={book.title}
      className="aspect-2/3 w-full rounded-m border border-app-border bg-app-surface-muted object-cover"
    />
    {user?.role === "admin" ? (
      <>
        <input
          accept="image/png,image/jpeg,image/webp"
          hidden
          onChange={handleCoverChange}
          ref={fileInputRef}
          type="file"
        />
        <Button loading={isUploadingCover} onClick={openCoverPicker}>
          Change cover
        </Button>
      </>
    ) : null}
  </div>
);
