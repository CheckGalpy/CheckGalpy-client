import { createSlice } from "@reduxjs/toolkit";

const scannedTextSlice = createSlice({
  name: "scannedText",
  initialState: {
    scannedText: null,
  },
  reducers: {
    setScannedText: (state, action) => {
      state.scannedText = action.payload;
    },
  },
});

export const { setScannedText } = scannedTextSlice.actions;
export default scannedTextSlice.reducer;
