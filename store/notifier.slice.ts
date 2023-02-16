import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorMessage: "",
  OpenError: false,
  successMessage: "",
  OpenSuccess: false,
  infoMessage: "",
  OpenInfo: false,
  warningMessage: "",
  OpenWarning: false,
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
    warning: (state, action) => {
      state.warningMessage = action.payload;
      state.OpenWarning = true;
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
    closeWarning: (state) => {
      state.warningMessage = "";
      state.OpenWarning = false;
    },
    somethingWentWrong: (state) => {
      state.errorMessage = "Something Went Wrong !";
      state.OpenError = true;
    },
    successfullySignedIn: (state) => {
      state.successMessage = "Successfully Signed In !";
      state.OpenSuccess = true;
    },
  },
});

export const notifierActions = notifierSlice.actions;

export default notifierSlice;
