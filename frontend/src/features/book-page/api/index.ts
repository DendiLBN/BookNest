import type { Key } from "react";

import { createApi } from "@reduxjs/toolkit/query/react";

import fetchBaseQuery from "@/common/api/fetch-base-query";
import { TBook, TBooksQueryParams, TPaginatedBooksResponse } from "@/features/book-page/types";

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

export const { useFetchBooksQuery, useFetchBookByIdQuery, useDeleteManyBooksMutation } = bookApi;
