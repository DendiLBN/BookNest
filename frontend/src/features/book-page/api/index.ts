import type { Key } from "react";

import { createApi } from "@reduxjs/toolkit/query/react";
import type { AxiosResponse } from "axios";

import { TBookBodyParams, TBookBodyResponse } from "@/types/api/books";

import axiosBaseQuery from "@/common/api/axios-base-query";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["books"],
  endpoints: (builder) => ({
    fetchBooks: builder.query<TBookBodyResponse[], TBookBodyParams>({
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
      transformResponse: ({ data }: AxiosResponse<TBookBodyResponse[]>) => data || [],
      providesTags: (response) =>
        response ? response.map((book) => ({ type: "books", id: book._id })) : [{ type: "books" }],
    }),
    fetchBookById: builder.query<TBookBodyResponse, string>({
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
