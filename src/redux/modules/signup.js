import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignupSuccess: false,
  displayName: "",
};

const signup = createSlice({
  name: "signup",
  initialState,
  reducers: {
    signupSuccess: (state, action) => {
      state.isSignupSuccess = true;
      state.displayName = action.payload;
    },
    logout: (state) => {
      state.isSignupSuccess = false;
    },
  },
});

export const { signupSuccess, logout } = signup.actions;
export default signup.reducer;
