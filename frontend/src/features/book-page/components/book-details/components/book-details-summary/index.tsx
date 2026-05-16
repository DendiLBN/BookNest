import type { ChangeEvent, RefObject } from "react";

import { BookDetailsCover } from "@/features/book-page/components/book-details/components/book-details-cover";
import { BookDetailsMeta } from "@/features/book-page/components/book-details/components/book-details-meta";

import type { TBook } from "@/features/book-page/types";
import type { TUser } from "@/features/users/types";

type TBookDetailsSummaryProps = {
  book: TBook;
  cooldownBookIds: string[];
  favoriteActionLoading: boolean;
  favoriteBookIds: string[];
  fileInputRef: RefObject<HTMLInputElement>;
  isUpdatingCart: boolean;
  isUploadingCover: boolean;
  user: TUser | null;
  handleAddToCart: (bookId: string) => Promise<void>;
  handleCoverChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleToggleFavorite: (bookId: string) => Promise<void>;
  openCoverPicker: () => void;
};

export const BookDetailsSummary = ({
  book,
  cooldownBookIds,
  favoriteActionLoading,
  favoriteBookIds,
  fileInputRef,
  handleAddToCart,
  handleCoverChange,
  handleToggleFavorite,
  isUpdatingCart,
  isUploadingCover,
  openCoverPicker,
  user,
}: TBookDetailsSummaryProps) => (
  <section className="grid gap-l rounded-m border border-app-border bg-app-surface p-m shadow-app-s md:grid-cols-[220px_minmax(0,1fr)]">
    <BookDetailsCover
      book={book}
      fileInputRef={fileInputRef}
      handleCoverChange={handleCoverChange}
      isUploadingCover={isUploadingCover}
      openCoverPicker={openCoverPicker}
      user={user}
    />
    <BookDetailsMeta
      book={book}
      cooldownBookIds={cooldownBookIds}
      favoriteActionLoading={favoriteActionLoading}
      favoriteBookIds={favoriteBookIds}
      handleAddToCart={handleAddToCart}
      handleToggleFavorite={handleToggleFavorite}
      isUpdatingCart={isUpdatingCart}
    />
  </section>
);
