import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    auth: false,
    roles: [],
  },
  reducers: {
    setUser(state, action) {
      state.auth = true;
      state.roles = action.payload.roles;
    },
    removeUser(state) {
      (state.auth = false), 
      (state.roles = []);
    },
  },
});
export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
