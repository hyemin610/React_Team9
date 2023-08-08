import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignupSuccess: false,
  userEmail: "",
};

const signup = createSlice({
  name: "signup",
  initialState,
  reducers: {
    signupSuccess: (state, action) => {
      state.isSignupSuccess = true;
      state.userEmail = action.payload;
    },
    logout: (state) => {
      state.isSignupSuccess = false;
      state.userEmail = null;
    },
  },
});

export const { signupSuccess, logout } = signup.actions;
export default signup.reducer;
