import { createApi } from "@reduxjs/toolkit/query/react";

import fetchBaseQuery from "@/common/api/fetch-base-query";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/common/consts/local-storage";
import { removeTokens } from "@/common/utils/removeTokens";
import { setTokens } from "@/common/utils/setTokens";
import type {
  TForgotPasswordParams,
  TLoginUserParams,
  TLoginUserResponse,
  TLogoutUserParams,
  TLogoutUserResponse,
  TRegisterUserParams,
  TRegisterUserResponse,
} from "@/features/auth/types";
import { userApi } from "@/features/users/api";
import { logOutUser, setIsLoggedIn } from "@/store/reducers/auth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    registerUser: builder.mutation<TRegisterUserResponse, TRegisterUserParams>({
      query: ({ data }) => ({
        method: "POST",
        url: `auth/register/`,
        data,
      }),
      async onQueryStarted({ onSuccess, onError }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          const userResponse = await dispatch(userApi.endpoints.fetchUsers.initiate());
          if (userResponse?.data) {
            onSuccess(userResponse.data);
          }
        } catch {
          onError();
        }
      },
    }),

    loginUser: builder.mutation<TLoginUserResponse, TLoginUserParams>({
      query: ({ data }) => ({
        method: "POST",
        url: `auth/login/`,
        data,
      }),
      async onQueryStarted({ onSuccess, onError }, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          const { accessToken, refreshToken } = response.data;
          setTokens({ accessToken, refreshToken });
          dispatch(setIsLoggedIn({ isLoggedIn: false, user: null }));

          const userResponse = await dispatch(
            userApi.endpoints.fetchUsers.initiate(undefined, {
              forceRefetch: true,
            }),
          );

          if (userResponse?.data) {
            dispatch(setIsLoggedIn({ isLoggedIn: true, user: userResponse.data }));
            onSuccess(userResponse.data);
          }
        } catch {
          onError();
        }
      },
    }),

    logOutUser: builder.mutation<TLogoutUserResponse, TLogoutUserParams>({
      query: () => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);

        return {
          method: "POST",
          url: `auth/logout/`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: { refreshToken },
        };
      },

      onQueryStarted: async ({ onSuccess, onError }, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;

          if (response) {
            removeTokens();
            onSuccess();
            dispatch(logOutUser());
          }
        } catch {
          onError();
        }
      },
    }),

    forgotPassword: builder.mutation<void, TForgotPasswordParams>({
      query: ({ data }) => ({
        method: "POST",
        url: `auth/forgot-password/`,
        data,
      }),
      async onQueryStarted({ onSuccess, onError }, { queryFulfilled }) {
        try {
          await queryFulfilled;
          onSuccess();
        } catch {
          onError();
        }
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogOutUserMutation,
  useForgotPasswordMutation,
} = authApi;
