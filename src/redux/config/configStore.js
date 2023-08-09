import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "../modules/signup";
import dataReducer from "../modules/dataSlice";

const store = configureStore({
  reducer: {
    signup: signupReducer,
    data: dataReducer,
  },
});

export default store;
