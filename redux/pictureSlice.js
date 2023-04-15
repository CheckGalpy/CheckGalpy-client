import { createSlice } from "@reduxjs/toolkit";

const pictureSlice = createSlice({
  name: "picture",
  initialState: {
    pictureInfo: null,
  },
  reducers: {
    setPictureInfo: (state, action) => {
      state.pictureInfo = action.payload;
    },
  },
});

export const { setPictureInfo } = pictureSlice.actions;
export default pictureSlice.reducer;
