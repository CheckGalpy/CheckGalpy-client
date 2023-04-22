import { configureStore } from "@reduxjs/toolkit";

import authStatusSlice from "./authStatusSlice";
import currentUserIdSlice from "./currentUserIdSlice";
import scannedImageSlice from "./scannedImageSlice";
import scannedTextSlice from "./scannedTextSlice";
import currentBookmarkIdSlice from "./currentBookmarkIdSlice";

const store = configureStore({
  reducer: {
    authStatus: authStatusSlice,
    scannedImage: scannedImageSlice,
    scannedText: scannedTextSlice,
    currentUserId: currentUserIdSlice,
    currentBookmarkId: currentBookmarkIdSlice,
  },
});

export default store;
