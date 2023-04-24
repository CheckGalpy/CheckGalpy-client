import { createSlice } from "@reduxjs/toolkit";

const accessedUserSlice = createSlice({
  name: "accessedUser",
  initialState: {
    accessedUser: {},
  },
  reducers: {
    setAccessedUser: (state, action) => {
      state.accessedUser = action.payload;
    },
  },
});

export const { setAccessedUser } = accessedUserSlice.actions;
export default accessedUserSlice.reducer;
