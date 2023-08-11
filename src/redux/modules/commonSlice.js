import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    alertMessage: "",
  },
  reducers: {
    setAlertMessage: (state, action) => {
      state.alertMessage = action.payload;
    },
  },
});

export const { setAlertMessage } = commonSlice.actions;
export default commonSlice.reducer;
