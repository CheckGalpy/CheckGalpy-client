import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authStatus",
  initialState: {
    authStatus: "pending",
  },
  reducers: {
    setAuthStatus: (state, action) => {
      state.authStatus = action.payload;
    },
  },
});

export const { setAuthStatus } = authSlice.actions;
export default authSlice.reducer;
