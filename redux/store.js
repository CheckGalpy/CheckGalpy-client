import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import userSlice from "./userSlice";
import pictureSlice from "./pictureSlice";
import textSlice from "./textSlice";
import currentBookmarkSlice from "./currentBookmarkSlice";

const store = configureStore({
  reducer: {
    authStatus: authSlice,
    user: userSlice,
    picture: pictureSlice,
    text: textSlice,
    currentBookmark: currentBookmarkSlice,
  },
});

export default store;
