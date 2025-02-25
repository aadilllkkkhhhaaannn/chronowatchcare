import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import watchReducer from "./auth/Watch/watchSlice";
import noteReducer from "./notes/noteSlice";
import adminSlice from "./admin/adminSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    watch: watchReducer,
    note: noteReducer,
    admin: adminSlice,
  },
});

export default store;
