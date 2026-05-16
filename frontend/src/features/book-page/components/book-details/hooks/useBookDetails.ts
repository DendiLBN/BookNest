import { useBookCart } from "@/features/book-page/hooks/useBookCart";
import { useBookCoverUpload } from "@/features/book-page/hooks/useBookCoverUpload";
import { useBookFavorites } from "@/features/book-page/hooks/useBookFavorites";

import useUser from "@/common/users/useUser";
import { useFetchBookByIdQuery } from "@/store/api/books";

export const useBookDetails = (bookId: string) => {
  const { handleAddToCart, isUpdatingCart } = useBookCart();
  const { user } = useUser();
  const { fileInputRef, handleCoverChange, isUploadingCover, openCoverPicker } =
    useBookCoverUpload(bookId);
  const { cooldownBookIds, favoriteActionLoading, favoriteBookIds, handleToggleFavorite } =
    useBookFavorites();
  const {
    data: book,
    isError,
    isFetching,
  } = useFetchBookByIdQuery(bookId, {
    skip: !bookId,
  });

  return {
    book,
    cooldownBookIds,
    favoriteActionLoading,
    favoriteBookIds,
    fileInputRef,
    handleAddToCart,
    handleCoverChange,
    handleToggleFavorite,
    isError,
    isFetching,
    isUpdatingCart,
    isUploadingCover,
    openCoverPicker,
    user,
  };
};
