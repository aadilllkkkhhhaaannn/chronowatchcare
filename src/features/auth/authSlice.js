import authService from "./authService";
const userExist = JSON.parse(localStorage.getItem("user"));
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    isSucess: false,
    isError: false,
    message: "",
    user: userExist || null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // For Register
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSucess = false;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSucess = true;
        state.user = action.payload;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSucess = false;
        state.message = action.payload;
      })

      // For Verification
      .addCase(VerificationUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSucess = false;
      })

      .addCase(VerificationUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSucess = true;
        state.user = action.payload;
      })

      .addCase(VerificationUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSucess = false;
        state.message = action.payload;
      })

      // For Login
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSucess = false;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSucess = true;
        state.user = action.payload;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSucess = false;
        state.message = action.payload;
      })

      // For Logout
      .addCase(LogOutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSucess = false;
        state.message = "";
        state.user = null;
      });
  },
});

export default authSlice.reducer;

// Register User
export const registerUser = createAsyncThunk(
  "AUTH/REGISTER",
  async (formData, thunkAPI) => {
    try {
      return await authService.register(formData);
    } catch (error) {
      const message = error.response.data.error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Verification User
export const VerificationUser = createAsyncThunk(
  "AUTH/VERIFICATION",
  async (formData, thunkAPI) => {
    try {
      return await authService.Verification(formData);
    } catch (error) {
      const message = error.response.data.error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  "AUTH/LOGIN",
  async (formData, thunkAPI) => {
    try {
      return await authService.login(formData);
    } catch (error) {
      const message = error.response.data.error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// LogOut User
export const LogOutUser = createAsyncThunk("AUTH/LOGOUT", async () => {
  localStorage.removeItem("user");
});
