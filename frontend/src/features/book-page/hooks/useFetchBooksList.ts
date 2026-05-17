import { useMemo } from "react";

import { useBooksFormContext } from "@/features/book-page/contexts/hooks/use-form-book-context";

import { useFetchBooksQuery } from "@/store/api/books";

type TUseBooksListParams = {
  currentPage: number;
  itemsPerPage: number;
};

export const useBooksList = ({ currentPage, itemsPerPage }: TUseBooksListParams) => {
  const { bookSearchText, maxPriceCents, minPriceCents, selectedCategories, sortBy } =
    useBooksFormContext();

  const { data: fetchedBooksResponse, isFetching } = useFetchBooksQuery({
    page: currentPage,
    perPage: itemsPerPage,
    searchString: bookSearchText,
    category: selectedCategories,
    maxPriceCents,
    minPriceCents,
    sortBy,
  });
  const bookList = useMemo(() => fetchedBooksResponse?.data ?? [], [fetchedBooksResponse]);

  return {
    bookList,
    isFetching,
    totalItems: fetchedBooksResponse?.totalItems ?? 0,
  };
};
