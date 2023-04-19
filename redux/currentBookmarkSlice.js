import { createSlice } from "@reduxjs/toolkit";

const currentBookmarkSlice = createSlice({
  name: "currentBookmark",
  initialState: {
    bookmarkId: null,
  },
  reducers: {
    setBookmarkId: (state, action) => {
      state.bookmarkId = action.payload;
    },
  },
});

export const { setBookmarkId } = currentBookmarkSlice.actions;
export default currentBookmarkSlice.reducer;
