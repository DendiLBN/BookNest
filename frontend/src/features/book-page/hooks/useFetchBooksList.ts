import { useCallback, useMemo } from "react";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";
import { useBooksFormContext } from "@/features/book-page/contexts/hooks/use-form-book-context";

import { useFetchBooksQuery } from "@/features/book-page/api";

type TUseFetchBodyBooksParams = {
  currentPage: number;
  itemsPerPage: number;
};

export const UseFetchBodyBooks = ({ currentPage, itemsPerPage }: TUseFetchBodyBooksParams) => {
  const { setLoading, openNotification } = useNotificationContext();

  const { selectedCategories, bookSearchText, setFetchBookList } = useBooksFormContext();

  const { data: fetchedBooksResponse } = useFetchBooksQuery({
    page: currentPage,
    perPage: itemsPerPage,
    searchString: bookSearchText,
    category: selectedCategories,
  });
  const fetchedBookList = useMemo(() => fetchedBooksResponse?.data ?? [], [fetchedBooksResponse]);

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
    totalItems: fetchedBooksResponse?.totalItems ?? 0,
  };
};
