import { configureStore } from "@reduxjs/toolkit";
import { save, load } from "redux-localstorage-simple";
import userReducer from "./user";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(
      save({
        states: ["user"],
      })
    );
  },
  preloadedState: load({ states: ["user"] }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
