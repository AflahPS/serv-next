import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorMessage: "",
  OpenError: false,
  successMessage: "",
  OpenSuccess: false,
  infoMessage: "",
  OpenInfo: false,
};

const notifierSlice = createSlice({
  name: "notifier",
  initialState,
  reducers: {
    success: (state, action) => {
      state.successMessage = action.payload;
      state.OpenSuccess = true;
    },
    error: (state, action) => {
      state.errorMessage = action.payload;
      state.OpenError = true;
    },
    info: (state, action) => {
      state.infoMessage = action.payload;
      state.OpenInfo = true;
    },
    closeSuccess: (state) => {
      state.successMessage = "";
      state.OpenSuccess = false;
    },
    closeError: (state) => {
      state.errorMessage = "";
      state.OpenError = false;
    },
    closeInfo: (state) => {
      state.infoMessage = "";
      state.OpenInfo = false;
    },
  },
});

export const notifierActions = notifierSlice.actions;

export default notifierSlice;
