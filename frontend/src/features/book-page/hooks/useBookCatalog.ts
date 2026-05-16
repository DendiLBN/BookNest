import { usePagination } from "@/common/hooks/pagination/usePagination";
import { useBookCart } from "@/features/book-page/hooks/useBookCart";
import { useBookFavorites } from "@/features/book-page/hooks/useBookFavorites";
import { useBookSelection } from "@/features/book-page/hooks/useBookSelection";
import { useDeleteAsArrayBooks } from "@/features/book-page/hooks/useDeleteAsArrayBooks";
import { useBooksList } from "@/features/book-page/hooks/useFetchBooksList";

import { useBooksFormContext } from "@/features/book-page/contexts/hooks/use-form-book-context";

import useUser from "@/common/users/useUser";
import { createBookTableColumns } from "@/features/book-page/consts/book-table-columns";

export const useBookCatalog = () => {
  const { currentPage, handleChangePagination, itemsPerPage } = usePagination();
  const { user } = useUser();
  const { bookList, isFetching, totalItems } = useBooksList({
    currentPage,
    itemsPerPage,
  });
  const { handleDeleteArray } = useDeleteAsArrayBooks();
  const {
    bookSearchText,
    selectedBookRowKeys,
    selectedCategories,
    setBookSearchText,
    setSelectedBookRowKeys,
    setSelectedCategories,
  } = useBooksFormContext();
  const { rowSelection } = useBookSelection({
    selectedBookRowKeys,
    setSelectedBookRowKeys,
  });
  const { cooldownBookIds, favoriteActionLoading, favoriteBookIds, handleToggleFavorite } =
    useBookFavorites();
  const { handleAddToCart, isUpdatingCart } = useBookCart();

  const isAdmin = user?.role === "admin";

  return {
    contentProps: {
      bookList,
      bookTableColumns: createBookTableColumns({
        favoriteBookIds,
        favoriteActionLoading,
        onToggleFavorite: handleToggleFavorite,
      }),
      cooldownBookIds,
      currentPage,
      favoriteActionLoading,
      favoriteBookIds,
      handleAddToCart,
      handleChangePagination,
      handleToggleFavorite,
      isAdmin,
      isFetching,
      isUpdatingCart,
      itemsPerPage,
      rowSelection,
      totalItems,
    },
    headerProps: {
      bookList,
      favoriteBookIds,
      isAdmin,
      selectedBookRowKeys,
    },
    toolbarProps: {
      bookSearchText,
      handleDeleteArray,
      isAdmin,
      isFetching,
      selectedBookRowKeys,
      selectedCategories,
      setBookSearchText,
      setSelectedCategories,
    },
  };
};
