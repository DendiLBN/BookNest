import { useCallback } from "react";

import { UsePagination } from "@/common/hooks/pagination/usePagination";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";
import { useBooksFormContext } from "@/features/book-page/contexts/hooks/use-form-book-context";

import { useFetchBooksQuery } from "@/store/api/books";

export const UseFetchBodyBooks = () => {
  const { setLoading, openNotification } = useNotificationContext();

  const { currentPage, itemsPerPage } = UsePagination();

  const { selectedCategories, bookSearchText, setFetchBookList } = useBooksFormContext();

  const { data: fetchedBookList = [] } = useFetchBooksQuery({
    page: currentPage,
    perPage: itemsPerPage,
    searchString: bookSearchText,
    category: selectedCategories,
  });

  const fetchBooksList = useCallback(async () => {
    setLoading(true);
    try {
      setFetchBookList(fetchedBookList);
      setLoading(false);
    } catch {
      openNotification(
        "topRight",
        "error",
        "An error occurred while fetching books! Please refresh the page.",
        false,
      );
    }
  }, [setLoading, setFetchBookList, fetchedBookList, openNotification]);

  return {
    fetchBooksList,
    currentPage,
    itemsPerPage,
  };
};
