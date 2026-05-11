import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "@/common/api/axios-base-query";
import { setTokens } from "@/common/utils/setTokens";
import type {
  TForgotPasswordParams,
  TLoginUserParams,
  TLoginUserResponse,
  TLogoutUserParams,
  TLogOutUserResponse,
  TRegisterUserParams,
  TRegisterUserResponse,
} from "@/features/auth/types";
import { userApi } from "@/features/users/api";
import { logOutUser, setIsLoggedIn } from "@/store/reducers/auth";
import { clearUser } from "@/store/reducers/users";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(),
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

    logOutUser: builder.mutation<TLogOutUserResponse, TLogoutUserParams>({
      query: () => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

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
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            onSuccess();
            dispatch(clearUser());
            dispatch(logOutUser());
            dispatch(setIsLoggedIn({ isLoggedIn: false, user: null }));
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
