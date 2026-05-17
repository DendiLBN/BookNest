import { createApi } from "@reduxjs/toolkit/query/react";

import fetchBaseQuery from "@/common/api/fetch-base-query";
import type { TOrder, TShippingAddress } from "@/features/orders/types";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery(),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation<TOrder, TShippingAddress>({
      query: (data) => ({
        method: "POST",
        url: "orders",
        data,
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
    fetchOrders: builder.query<TOrder[], void>({
      query: () => ({
        method: "GET",
        url: "orders",
      }),
      providesTags: ["orders"],
    }),
    updateOrderStatus: builder.mutation<TOrder, { orderId: string; status: TOrder["status"] }>({
      query: ({ orderId, status }) => ({
        method: "PATCH",
        url: `orders/${orderId}/status`,
        data: { status },
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useFetchMyOrdersQuery,
  useFetchOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
