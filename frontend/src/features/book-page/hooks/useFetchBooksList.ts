import { useMemo } from "react";

import { useBooksFormContext } from "@/features/book-page/contexts/hooks/use-form-book-context";

import { useFetchBooksQuery } from "@/features/book-page/api";

type TUseBooksListParams = {
  currentPage: number;
  itemsPerPage: number;
};

export const useBooksList = ({ currentPage, itemsPerPage }: TUseBooksListParams) => {
  const { selectedCategories, bookSearchText } = useBooksFormContext();

  const { data: fetchedBooksResponse, isFetching } = useFetchBooksQuery({
    page: currentPage,
    perPage: itemsPerPage,
    searchString: bookSearchText,
    category: selectedCategories,
  });
  const bookList = useMemo(() => fetchedBooksResponse?.data ?? [], [fetchedBooksResponse]);

  return {
    bookList,
    isFetching,
    totalItems: fetchedBooksResponse?.totalItems ?? 0,
  };
};
