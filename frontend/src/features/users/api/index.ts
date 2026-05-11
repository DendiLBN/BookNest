import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "@/common/api/axios-base-query";
import type { TUserState } from "@/features/users/types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    fetchUsers: builder.query<TUserState, void>({
      query: () => ({
        method: "GET",
        url: "users/me",
      }),
      providesTags: ["users"],
    }),
    uploadAvatar: builder.mutation<TUserState, FormData>({
      query: (data) => ({
        method: "PATCH",
        url: "users/me/avatar",
        data,
      }),
      invalidatesTags: ["users"],
    }),
    addFavoriteBook: builder.mutation<TUserState, string>({
      query: (bookId) => ({
        method: "PATCH",
        url: `users/me/favorites/${bookId}`,
      }),
      invalidatesTags: ["users"],
    }),
    removeFavoriteBook: builder.mutation<TUserState, string>({
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
