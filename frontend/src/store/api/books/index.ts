import type { Key } from "react";

import { createApi } from "@reduxjs/toolkit/query/react";

import fetchBaseQuery from "@/common/api/fetch-base-query";
import {
  TBook,
  TBookDashboardSummary,
  TBooksQueryParams,
  TPaginatedBooksResponse,
} from "@/features/book-page/types";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery(),
  tagTypes: ["books"],
  endpoints: (builder) => ({
    fetchBooks: builder.query<TPaginatedBooksResponse, TBooksQueryParams>({
      query: ({ page = 1, perPage = 100, category = [], searchString }) => ({
        method: "GET",
        url: "books",
        params: {
          page,
          perPage,
          searchString,
          category,
        },
      }),
      providesTags: (response) =>
        response
          ? response.data.map((book) => ({ type: "books", id: book._id }))
          : [{ type: "books" }],
    }),
    fetchBookById: builder.query<TBook, string>({
      query: (bookId) => ({
        method: "GET",
        url: `books/${bookId}`,
      }),
      providesTags: (response) => (response ? [{ type: "books", id: response._id }] : []),
    }),
    fetchBookDashboardSummary: builder.query<TBookDashboardSummary, void>({
      query: () => ({
        method: "GET",
        url: "books/dashboard/summary",
      }),
    }),
    uploadBookCover: builder.mutation<TBook, { bookId: string; data: FormData }>({
      query: ({ bookId, data }) => ({
        method: "PATCH",
        url: `books/${bookId}/cover`,
        data,
      }),
      invalidatesTags: (_response, _error, { bookId }) => [{ type: "books", id: bookId }],
    }),
    deleteManyBooks: builder.mutation<void, Key[]>({
      query: (ids) => ({
        method: "POST",
        url: "books/ids",
        data: { ids },
      }),
      invalidatesTags: (response) => (response ? [{ type: "books" }] : []),
    }),
  }),
});

export const {
  useFetchBooksQuery,
  useFetchBookByIdQuery,
  useFetchBookDashboardSummaryQuery,
  useUploadBookCoverMutation,
  useDeleteManyBooksMutation,
} = bookApi;
