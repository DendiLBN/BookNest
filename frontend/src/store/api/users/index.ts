import { createApi } from "@reduxjs/toolkit/query/react";

import fetchBaseQuery from "@/common/api/fetch-base-query";
import type { TCartItem, TUpdateProfilePayload, TUser } from "@/features/users/types";

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
    updateProfile: builder.mutation<TUser, TUpdateProfilePayload>({
      query: (data) => ({
        method: "PATCH",
        url: "users/me/profile",
        data,
      }),
      invalidatesTags: ["users"],
    }),
    deleteAccount: builder.mutation<void, void>({
      query: () => ({
        method: "DELETE",
        url: "users/me",
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
    updateCartItem: builder.mutation<TUser, TCartItem>({
      query: ({ bookId, quantity }) => ({
        method: "PATCH",
        url: `users/me/cart/${bookId}`,
        data: { quantity },
      }),
      invalidatesTags: ["users"],
    }),
    removeCartItem: builder.mutation<TUser, string>({
      query: (bookId) => ({
        method: "DELETE",
        url: `users/me/cart/${bookId}`,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useFetchUsersQuery,
  useUploadAvatarMutation,
  useUpdateProfileMutation,
  useDeleteAccountMutation,
  useAddFavoriteBookMutation,
  useRemoveFavoriteBookMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
} = userApi;
