import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slices/userSlice.js";

export default configureStore({
  reducer: {
    user: UserReducer,
  }
});
