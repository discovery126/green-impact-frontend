import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slices/authSlice";
import ModalAuthReducer from "./slices/authModalSlice"
export default configureStore({
  reducer: {
    auth: AuthReducer,
    authModal: ModalAuthReducer,
  },
});
