import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignupSuccess: false,
  userEmail: "",
  displayName: "",
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    signupSuccess: (state, action) => {
      state.isSignupSuccess = true;
      state.userEmail = action.payload;
      state.displayName = action.payload;
    },
    logout: (state) => {
      state.isSignupSuccess = false;
      state.userEmail = null;
    },
  },
});

export const { signupSuccess, logout } = signupSlice.actions;
export default signupSlice.reducer;
