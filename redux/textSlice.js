import { createSlice } from "@reduxjs/toolkit";

const textSlice = createSlice({
  name: "text",
  initialState: {
    textInfo: null,
  },
  reducers: {
    setTextInfo: (state, action) => {
      state.textInfo = action.payload;
    },
  },
});

export const { setTextInfo } = textSlice.actions;
export default textSlice.reducer;
