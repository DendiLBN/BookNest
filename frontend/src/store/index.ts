import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "@/features/auth/api";
import { bookApi } from "@/features/book-page/api";
import { userApi } from "@/features/users/api";
import { authReducer } from "@/store/reducers/auth";

const apiReducers = {
  [userApi.reducerPath]: userApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [bookApi.reducerPath]: bookApi.reducer,
  [authReducer.name]: authReducer.reducer,
};

export const apiMiddlewares = [authApi.middleware, bookApi.middleware, userApi.middleware];

export const store = configureStore({
  reducer: apiReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...apiMiddlewares),
});
