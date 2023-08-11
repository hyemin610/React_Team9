import { createSlice } from "@reduxjs/toolkit";

export const validationSlice = createSlice({
  name: "validation",
  initialState: {
    isValid: true,
    errorMessages: {},
  },
  reducers: {
    setValidity: (state, action) => {
      state.isValid = action.payload.isValid;
      state.errorMessages = action.payload.errorMessages;
    },
    clearValidity: (state) => {
      state.isValid = true;
      state.errorMessages = {};
    },
  },
});

export const { setValidity, clearValidity } = validationSlice.actions;
export default validationSlice.reducer;
