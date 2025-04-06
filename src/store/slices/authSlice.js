import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../http/AuthService";
import { jwtDecode } from "jwt-decode";

export const fetchToken = createAsyncThunk(
  "auth/fetchToken",
  async function (_, { rejectWithValue }) {
    const errorMessage500 =
      "Не удается подключиться к серверу. Попробуйте позже.";
    try {
      const response = await AuthService.login(_.email, _.password);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        const decoded = jwtDecode(response.data.token);
        return decoded.roles;
      }
    } catch (error) {
      if (!error.response) {
        return rejectWithValue(errorMessage500);
      } else {
        if (error.status === 401) {
          return rejectWithValue(error.response.data["error_details"][0]);
        } else {
          return rejectWithValue(error);
        }
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: !!localStorage.getItem('token'),
    roles: [],
    loading: false,
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.auth = true;
      state.roles = action.payload.roles;
    },
    removeUser(state) {
      state.auth = false;
      state.roles = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchToken.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    }),
      builder.addCase(fetchToken.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.auth = true;
        state.roles = action.payload.roles;
    }),
      builder.addCase(fetchToken.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});
export const { setUser, removeUser } = authSlice.actions;

export default authSlice.reducer;
