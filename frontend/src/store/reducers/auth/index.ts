import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/common/hooks/redux-toolkit";

import { removeTokens } from "@/common/utils/removeTokens";
import type { TUser } from "@/features/users/types";

type TAuthReducerState = {
  isLoggedIn: boolean;
  user: TUser | null;
};

const initialState: TAuthReducerState = {
  isLoggedIn: false,
  user: null,
};

export const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean; user: TUser | null }>) {
      state.user = action.payload.user;
      state.isLoggedIn = action.payload.isLoggedIn;
    },

    logOutUser(state) {
      removeTokens();
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const selectIsLoggedIn = (state: RootState) => state.authReducer.isLoggedIn;

export const selectUser = (state: RootState) => state.authReducer.user;

export const { setIsLoggedIn, logOutUser } = authReducer.actions;
