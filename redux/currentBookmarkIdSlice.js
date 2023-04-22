import { createSlice } from "@reduxjs/toolkit";

const currentBookmarkIdSlice = createSlice({
  name: "currentBookmarkId",
  initialState: {
    currentBookmarkId: null,
  },
  reducers: {
    setCurrentBookmarkId: (state, action) => {
      state.currentBookmarkId = action.payload;
    },
  },
});

export const { setCurrentBookmarkId } = currentBookmarkIdSlice.actions;
export default currentBookmarkIdSlice.reducer;
