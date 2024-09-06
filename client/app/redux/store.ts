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
    // Check if tokens are present in localStorage
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    
    console.log('Access Token:', accessToken);
    console.log('Refresh Token:', refreshToken);

    if (accessToken && refreshToken) {
      await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}));
      await store.dispatch(apiSlice.endpoints.loadUser.initiate({}));
    } else {
      console.log("No access token found in localStorage");
    }
  } catch (error) {
    console.log("Initialization error:", error);
  }
};

initializeApp();