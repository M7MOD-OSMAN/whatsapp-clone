import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  name: string;
  email: string;
}

const userSlice = createSlice({
  name: "currentUser",
  initialState: {
    name: "",
    email: "",
  } as User,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    resetUser(state) {
      state.email = "";
      state.name = "";
    },
  },
});
const userReducer = userSlice.reducer;
export const { setUser, resetUser } = userSlice.actions;
export default userReducer;
