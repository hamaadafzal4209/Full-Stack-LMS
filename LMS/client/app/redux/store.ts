"use client";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authSlice from "./features/auth/authSlice";
import toast from "react-hot-toast";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// call the load token on every page load
const initializeApp = async () => {
  try {
    await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}));
    await store.dispatch(apiSlice.endpoints.loadUser.initiate({}));
  } catch (error) {
    console.log("Initialization error:", error);
    toast.error(error);
  }
};

initializeApp();

