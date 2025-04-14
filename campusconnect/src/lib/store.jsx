// lib/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/authSlice";
import uiReducer from "./features/uiSlice"

const store = configureStore({
  reducer: {
    user: userReducer, // authSlice is now named "user"
    ui: uiReducer,
  },
});

export default store;