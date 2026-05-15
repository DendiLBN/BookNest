import { createApi } from "@reduxjs/toolkit/query/react";

import fetchBaseQuery from "@/common/api/fetch-base-query";
import type { TUser } from "@/features/users/types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery(),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    fetchUsers: builder.query<TUser, void>({
      query: () => ({
        method: "GET",
        url: "users/me",
      }),
      providesTags: ["users"],
    }),
    uploadAvatar: builder.mutation<TUser, FormData>({
      query: (data) => ({
        method: "PATCH",
        url: "users/me/avatar",
        data,
      }),
      invalidatesTags: ["users"],
    }),
    addFavoriteBook: builder.mutation<TUser, string>({
      query: (bookId) => ({
        method: "PATCH",
        url: `users/me/favorites/${bookId}`,
      }),
      invalidatesTags: ["users"],
    }),
    removeFavoriteBook: builder.mutation<TUser, string>({
      query: (bookId) => ({
        method: "DELETE",
        url: `users/me/favorites/${bookId}`,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useFetchUsersQuery,
  useUploadAvatarMutation,
  useAddFavoriteBookMutation,
  useRemoveFavoriteBookMutation,
} = userApi;
