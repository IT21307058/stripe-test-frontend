import { configureStore } from "@reduxjs/toolkit";
import fileReducer from "../features/files/fileSlice";
import authReducer from "../features/user/authSlice";

export const store = configureStore({
  reducer: {
    files: fileReducer,
    auth: authReducer,
  },
});
