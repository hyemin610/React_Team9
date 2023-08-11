import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "../modules/signupSlice";
import dataReducer from "../modules/dataSlice";
import commentsReducer from "../modules/commentsSlice";

const store = configureStore({
  reducer: {
    signup: signupReducer,
    data: dataReducer,
    comments: commentsReducer,
  },
});

export default store;
