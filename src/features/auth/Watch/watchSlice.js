import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import watchService from "./watchService";

const watchSlice = createSlice({
  name: "watch",
  initialState: {
    watches: [],
    watchName: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    // create complaints
    builder
      .addCase(addComplaint.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(addComplaint.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.watchName = action.payload;
      })
      .addCase(addComplaint.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      // get Complaints
      .addCase(getComplaints.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getComplaints.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.watchName = action.payload;
      })
      .addCase(getComplaints.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      // get Complaint
      .addCase(getComplaint.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getComplaint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.watchName = action.payload;
      })
      .addCase(getComplaint.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      // Complaint closed
      .addCase(closeComplaint.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(closeComplaint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.watchName = action.payload;
      })
      .addCase(closeComplaint.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export default watchSlice.reducer;

// Create Complaint

export const addComplaint = createAsyncThunk(
  "WATCH/ADD",
  async (formData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      return await watchService.raiseComplaint(formData, token);
    } catch (error) {
      const message = error.response.data.error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get Complaints

export const getComplaints = createAsyncThunk(
  "WATCHES/FETCH",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      return await watchService.fetchComplaints(token);
    } catch (error) {
      const message = error.response.data.error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get Complaint

export const getComplaint = createAsyncThunk(
  "WATCH/FETCH",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      return await watchService.fetchComplaint(id, token);
    } catch (error) {
      const message = error.response.data.error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// closed Complaint

export const closeComplaint = createAsyncThunk(
  "WATCH/CLOSE",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      return await watchService.updateComplaint(id, token);
    } catch (error) {
      const message = error.response.data.error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
