import { configureStore } from "@reduxjs/toolkit";
import { save, load } from "redux-localstorage-simple";
import userReducer from "./user";

export const store = configureStore({
  reducer: {
    currentUser: userReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(
      save({
        states: ["currentUser"],
      })
    );
  },
  preloadedState: load({ states: ["currentUser"] }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
