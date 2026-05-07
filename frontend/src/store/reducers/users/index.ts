import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TUserState = {
  _id: string;
  email: string;
  firstName: string;
};

const initialState: TUserState = {
  _id: "",
  email: "",
  firstName: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload: { _id, email, firstName } }: PayloadAction<TUserState>) => {
      state._id = _id;
      state.email = email;
      state.firstName = firstName;
    },
    clearUser: (state) => {
      state._id = "";
      state.email = "";
      state.firstName = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
