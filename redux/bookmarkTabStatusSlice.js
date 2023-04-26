import { createSlice } from "@reduxjs/toolkit";

const bookmarkTabStatusSlice = createSlice({
  name: "bookmarkTabStatus",
  initialState: {
    bookmarkTabStatus: "MY",
  },
  reducers: {
    setBookmarkTabStatus: (state, action) => {
      state.bookmarkTabStatus = action.payload;
    },
  },
});

export const { setBookmarkTabStatus } = bookmarkTabStatusSlice.actions;
export default bookmarkTabStatusSlice.reducer;
