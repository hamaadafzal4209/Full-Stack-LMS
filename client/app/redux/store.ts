import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authSlice from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Ensure the token is loaded on app initialization
const initializeApp = async () => {
  try {
    await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}));
    await store.dispatch(apiSlice.endpoints.loadUser.initiate({}));
  } catch (error: unknown) {
    console.log("Initialization error:", error);
  }
};

initializeApp();
