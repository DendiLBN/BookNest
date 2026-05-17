import { createApi } from "@reduxjs/toolkit/query/react";

import fetchBaseQuery from "@/common/api/fetch-base-query";
import type { TOrder } from "@/features/orders/types";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery(),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation<TOrder, void>({
      query: () => ({
        method: "POST",
        url: "orders",
      }),
      invalidatesTags: ["orders"],
    }),
    fetchMyOrders: builder.query<TOrder[], void>({
      query: () => ({
        method: "GET",
        url: "orders/me",
      }),
      providesTags: ["orders"],
    }),
  }),
});

export const { useCreateOrderMutation, useFetchMyOrdersQuery } = orderApi;
