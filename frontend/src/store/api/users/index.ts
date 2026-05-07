import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "@/common/services/axios-base-query";
import { TUserState } from "@/store/reducers/users";

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
  }),
});

export const { useFetchUsersQuery } = userApi;
