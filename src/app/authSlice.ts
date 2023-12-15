import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  email: string;
  password: string;
}

interface AuthState {
  loading: boolean;
  user: User | null;
  error: string | null;
}

const initialState: AuthState = {
  loading: false,
  user: null,
  error: null,
};

export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string }
>("user/loginuser", async (userCredentials) => {
  try {
    const request = await axios.post("https://reqres.in/api/login", {
      email: userCredentials.email,
      password: userCredentials.password,
    });

    const response = await request.data;
    localStorage.setItem("user", JSON.stringify(response));
    return response;
  } catch (error) {
    throw new Error("Login failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;

      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message || "Login failed";
      });
  },
});
export const { setError, logoutUser } = authSlice.actions;
export default authSlice.reducer;
