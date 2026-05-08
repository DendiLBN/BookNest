import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TUserState = {
  _id: string;
  email: string;
  firstName: string;
  avatarUrl?: string;
};

const initialState: TUserState = {
  _id: "",
  email: "",
  firstName: "",
  avatarUrl: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      { payload: { _id, email, firstName, avatarUrl } }: PayloadAction<TUserState>,
    ) => {
      state._id = _id;
      state.email = email;
      state.firstName = firstName;
      state.avatarUrl = avatarUrl;
    },
    clearUser: (state) => {
      state._id = "";
      state.email = "";
      state.firstName = "";
      state.avatarUrl = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
