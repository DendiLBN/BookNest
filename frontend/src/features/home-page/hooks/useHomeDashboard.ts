import { useMemo } from "react";

import {
  FEATURED_BOOKS_COUNT,
  PREVIEW_BOOKS_COUNT,
  TOP_CATEGORIES_COUNT,
} from "@/features/home-page/consts/dashboard-limits";
import type { THomeDashboardState } from "@/features/home-page/types";
import { useFetchBookDashboardSummaryQuery, useFetchBooksQuery } from "@/store/api/books";

export const useHomeDashboard = (): THomeDashboardState => {
  const {
    data: booksResponse,
    isError: isBooksError,
    isFetching: isBooksFetching,
    isLoading: isBooksLoading,
  } = useFetchBooksQuery({
    page: 1,
    perPage: PREVIEW_BOOKS_COUNT,
    searchString: "",
    category: [],
  });
  const {
    data: dashboardSummary,
    isError: isDashboardSummaryError,
    isFetching: isDashboardSummaryFetching,
    isLoading: isDashboardSummaryLoading,
  } = useFetchBookDashboardSummaryQuery();

  const books = useMemo(() => booksResponse?.data ?? [], [booksResponse]);
  const isLoading = isBooksLoading || isDashboardSummaryLoading;
  const isFetching = isBooksFetching || isDashboardSummaryFetching;
  const isError = isBooksError || isDashboardSummaryError;

  const dashboardStats = useMemo(
    () => [
      {
        label: "Catalog titles",
        value: dashboardSummary?.totalBooks ?? 0,
        helper: isFetching ? "Refreshing catalog" : "Ready to browse",
      },
      {
        label: "Categories",
        value: dashboardSummary?.totalCategories ?? 0,
        helper: "Available shelves",
      },
      {
        label: "Average rating",
        value: (dashboardSummary?.averageRating ?? 0).toFixed(1),
        helper: "Across visible titles",
      },
    ],
    [dashboardSummary, isFetching],
  );

  const topCategories = useMemo(() => {
    const categoryCounts = books
      .flatMap((book) => book.category)
      .reduce<Record<string, number>>((acc, category) => {
        acc[category] = (acc[category] ?? 0) + 1;
        return acc;
      }, {});

    return Object.entries(categoryCounts)
      .sort(([, firstCount], [, secondCount]) => secondCount - firstCount)
      .slice(0, TOP_CATEGORIES_COUNT);
  }, [books]);

  return {
    catalogStatus: isFetching ? "Syncing catalog data" : "Catalog ready",
    dashboardStats,
    featuredBooks: books.slice(0, FEATURED_BOOKS_COUNT),
    hasBooks: books.length > 0,
    isError,
    isLoading,
    topCategories,
  };
};
