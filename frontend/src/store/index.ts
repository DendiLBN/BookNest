import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "@/store/api/auth";
import { bookApi } from "@/store/api/books";
import { orderApi } from "@/store/api/orders";
import { userApi } from "@/store/api/users";
import { authReducer } from "@/store/reducers/auth";

const apiReducers = {
  [userApi.reducerPath]: userApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [bookApi.reducerPath]: bookApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [authReducer.name]: authReducer.reducer,
};

export const apiMiddlewares = [
  authApi.middleware,
  bookApi.middleware,
  orderApi.middleware,
  userApi.middleware,
];

export const store = configureStore({
  reducer: apiReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...apiMiddlewares),
});
