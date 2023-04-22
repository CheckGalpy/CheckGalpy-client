import { createSlice } from "@reduxjs/toolkit";

const currentUserIdSlice = createSlice({
  name: "currentUserId",
  initialState: {
    currentUserId: null,
  },
  reducers: {
    setCurrentUserId: (state, action) => {
      state.currentUserId = action.payload;
    },
  },
});

export const { setCurrentUserId } = currentUserIdSlice.actions;
export default currentUserIdSlice.reducer;
