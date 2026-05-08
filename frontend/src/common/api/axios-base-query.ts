import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { type AxiosError, type AxiosRequestConfig } from "axios";

import { API_BASE_URL } from "@/common/config/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/common/consts/local-storage";
import { removeTokens } from "@/common/utils/removeTokens";
import { setTokens } from "@/common/utils/setTokens";

import { API_BASE_URL } from "./config";

export type TBaseQueryParams = {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
};

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = {
      baseUrl: API_BASE_URL,
    },
  ): BaseQueryFn<TBaseQueryParams, unknown, unknown> =>
  async ({ method, url, data, params, headers: additionalHeader }) => {
    let token = window.localStorage.getItem(ACCESS_TOKEN);
    let headers = { ...additionalHeader };

    if (token) {
      headers = { ...headers, Authorization: `Bearer ${token}` };
    }

    const source = axios.CancelToken.source();

    try {
      const { data: result } = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
        cancelToken: source.token,
      });

      return { data: result };
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status === 401) {
        const originalRequest = err.config;

        if (!originalRequest) {
          return {
            error: {
              status: err.response.status,
              data: "Original request not found",
            },
          };
        }

        const refreshToken = localStorage.getItem(REFRESH_TOKEN);

        if (!refreshToken) {
          return {
            error: {
              status: err.response.status,
              data: "Refresh token not found",
            },
          };
        }

        try {
          const res = await axios.post(`/api/auth/refresh-token`, null, {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });

          const response = res.data;

          setTokens(response);

          token = response.accessToken;

          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          const retryResult = await axios({
            ...originalRequest,

            headers: {
              ...originalRequest.headers,
              Authorization: `Bearer ${token}`,
            },
          });

          return { data: retryResult.data };
        } catch (refreshError) {
          removeTokens();

          return {
            error: {
              status: (refreshError as AxiosError).response?.status || 500,
              data: (refreshError as AxiosError).response?.data || "Failed to refresh token",
            },
          };
        }
      }

      return {
        error: {
          status: err.response?.status || 500,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery;
