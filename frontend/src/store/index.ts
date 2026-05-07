import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "@/store/api/auth";
import { bookApi } from "@/store/api/books";
import { userApi } from "@/store/api/users";
import { authReducer } from "@/store/reducers/auth";
import { userSlice } from "@/store/reducers/users";

const apiReducers = {
  [userApi.reducerPath]: userApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [bookApi.reducerPath]: bookApi.reducer,
  [authReducer.name]: authReducer.reducer,
  [userSlice.name]: userSlice.reducer,
};

export const apiMiddlewares = [authApi.middleware, bookApi.middleware, userApi.middleware];

export const store = configureStore({
  reducer: apiReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...apiMiddlewares),
});
