import type { BaseQueryFn } from "@reduxjs/toolkit/query";

import { API_BASE_URL } from "@/common/config/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/common/consts/local-storage";
import { removeTokens } from "@/common/utils/removeTokens";
import { setTokens } from "@/common/utils/setTokens";
import type { TTokens } from "@/features/auth/types";

export type TBaseQueryParams = {
  url: string;
  method?: string;
  data?: BodyInit | Record<string, unknown> | null;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
};

type TRequestOptions = Omit<TBaseQueryParams, "url"> & {
  url: string;
};

const buildRequestUrl = (baseUrl: string, url: string, params?: Record<string, unknown>) => {
  const requestUrl = new URL(url, baseUrl);

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => requestUrl.searchParams.append(key, String(item)));
      return;
    }

    requestUrl.searchParams.set(key, String(value));
  });

  return requestUrl.toString();
};

const parseResponseBody = async (response: Response) => {
  const contentType = response.headers.get("content-type");

  if (response.status === 204) {
    return undefined;
  }

  if (contentType?.includes("application/json")) {
    return response.json();
  }

  return response.text();
};

const createRequestInit = ({
  data,
  headers,
  method = "GET",
}: Pick<TRequestOptions, "data" | "headers" | "method">): RequestInit => {
  const isFormData = data instanceof FormData;
  const hasBody = data !== undefined && data !== null;

  return {
    method,
    headers: {
      ...(hasBody && !isFormData ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body:
      hasBody && !isFormData && typeof data !== "string" && !(data instanceof Blob)
        ? JSON.stringify(data)
        : data,
  };
};

const fetchBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = {
      baseUrl: API_BASE_URL,
    },
  ): BaseQueryFn<TBaseQueryParams, unknown, unknown> =>
  async ({ url, method, data, params, headers: additionalHeaders }) => {
    const executeRequest = async (requestHeaders: Record<string, string>) => {
      const response = await fetch(buildRequestUrl(baseUrl, url, params), {
        ...createRequestInit({
          data,
          method,
          headers: requestHeaders,
        }),
      });

      const responseData = await parseResponseBody(response);

      return {
        response,
        responseData,
      };
    };

    const accessToken = window.localStorage.getItem(ACCESS_TOKEN);
    const headers = {
      ...additionalHeaders,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    };

    try {
      const initialResult = await executeRequest(headers);

      if (initialResult.response.ok) {
        return { data: initialResult.responseData };
      }

      if (initialResult.response.status !== 401) {
        return {
          error: {
            status: initialResult.response.status,
            data: initialResult.responseData,
          },
        };
      }

      const refreshToken = localStorage.getItem(REFRESH_TOKEN);

      if (!refreshToken) {
        return {
          error: {
            status: 401,
            data: "Refresh token not found",
          },
        };
      }

      const refreshResponse = await fetch(buildRequestUrl(baseUrl, "auth/refresh-token"), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      const refreshData = (await parseResponseBody(refreshResponse)) as TTokens;

      if (!refreshResponse.ok) {
        removeTokens();

        return {
          error: {
            status: refreshResponse.status,
            data: refreshData,
          },
        };
      }

      setTokens(refreshData);

      const retryResult = await executeRequest({
        ...additionalHeaders,
        Authorization: `Bearer ${refreshData.accessToken}`,
      });

      if (!retryResult.response.ok) {
        return {
          error: {
            status: retryResult.response.status,
            data: retryResult.responseData,
          },
        };
      }

      return { data: retryResult.responseData };
    } catch (error) {
      return {
        error: {
          status: 500,
          data: error instanceof Error ? error.message : "Request failed",
        },
      };
    }
  };

export default fetchBaseQuery;
