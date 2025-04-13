import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const authModalSlice = createSlice({
  name: "authModal",
  initialState: {
    modalType: null,
  },
  reducers: {
    setLoginModal(state) {
      state.modalType = "login";
    },
    setRegisterModal(state) {
      state.modalType = "register";
    },
    clearModal(state) {
      state.modalType = null;
    },
  },
});
export const { setLoginModal, setRegisterModal, clearModal } =
  authModalSlice.actions;

export default authModalSlice.reducer;
