import { createSlice } from "@reduxjs/toolkit";

const scannedImageSlice = createSlice({
  name: "scannedImage",
  initialState: {
    scannedImage: null,
  },
  reducers: {
    setScannedImage: (state, action) => {
      state.scannedImage = action.payload;
    },
  },
});

export const { setScannedImage } = scannedImageSlice.actions;
export default scannedImageSlice.reducer;
