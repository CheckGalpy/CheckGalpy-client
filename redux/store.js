import { configureStore } from "@reduxjs/toolkit";

import authStatusSlice from "./authStatusSlice";
import currentUserIdSlice from "./currentUserIdSlice";
import currentBookmarkIdSlice from "./currentBookmarkIdSlice";
import accessedUserSlice from "./accessedUserSlice";
import scannedImageSlice from "./scannedImageSlice";
import scannedTextSlice from "./scannedTextSlice";
import bookmarkTabStatusSlice from "./bookmarkTabStatusSlice";

const store = configureStore({
  reducer: {
    authStatus: authStatusSlice,
    currentUserId: currentUserIdSlice,
    currentBookmarkId: currentBookmarkIdSlice,
    accessedUser: accessedUserSlice,
    scannedImage: scannedImageSlice,
    scannedText: scannedTextSlice,
    bookmarkTabStatus: bookmarkTabStatusSlice,
  },
});

export default store;
