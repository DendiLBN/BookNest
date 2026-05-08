import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TUserState = {
  _id: string;
  email: string;
  firstName: string;
  favoriteBookIds: string[];
  avatarUrl?: string;
};

const initialState: TUserState = {
  _id: "",
  email: "",
  firstName: "",
  favoriteBookIds: [],
  avatarUrl: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      { payload: { _id, email, firstName, favoriteBookIds, avatarUrl } }: PayloadAction<TUserState>,
    ) => {
      state._id = _id;
      state.email = email;
      state.firstName = firstName;
      state.favoriteBookIds = favoriteBookIds ?? [];
      state.avatarUrl = avatarUrl;
    },
    clearUser: (state) => {
      state._id = "";
      state.email = "";
      state.firstName = "";
      state.favoriteBookIds = [];
      state.avatarUrl = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
