import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./userSlice";
import pictureSlice from "./pictureSlice";
import textSlice from "./textSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    picture: pictureSlice,
    text: textSlice,
  },
});

export default store;
