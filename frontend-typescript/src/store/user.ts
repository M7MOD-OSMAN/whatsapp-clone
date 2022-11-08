import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  name: string;
  email: string;
}
interface UserState {
  currentUser?: User;
  currentReceiver?: User;
}
const userSlice = createSlice({
  name: "user",
  initialState: {} as UserState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<User>) {
      if (state.currentUser) {
        state.currentUser.email = action.payload.email;
        state.currentUser.name = action.payload.name;
      } else {
        state.currentUser = {
          email: action.payload.email,
          name: action.payload.name,
        };
      }
    },
    resetCurrentUser(state) {
      state.currentUser = undefined;
      delete state.currentUser;
    },
    chooseChatUser(state, action: PayloadAction<User>) {
      state.currentReceiver = action.payload;
    },
  },
});
const userReducer = userSlice.reducer;
export const { setCurrentUser, resetCurrentUser, chooseChatUser } =
  userSlice.actions;
export default userReducer;
