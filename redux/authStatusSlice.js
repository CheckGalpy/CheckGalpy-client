import { createSlice } from "@reduxjs/toolkit";

const authStatusSlice = createSlice({
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

export const { setAuthStatus } = authStatusSlice.actions;
export default authStatusSlice.reducer;
