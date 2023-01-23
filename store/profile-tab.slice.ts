import { createSlice } from "@reduxjs/toolkit";

const initialState = { currentTab: "timeline" };

const profileTabSlice = createSlice({
  name: "profileTab",
  initialState,
  reducers: {
    timeline: (state) => {
      state.currentTab = "timeline";
    },
    accountDetails: (state) => {
      state.currentTab = "accountDetails";
    },
    friends: (state) => {
      state.currentTab = "friends";
    },
    activities: (state) => {
      state.currentTab = "activities";
    },
  },
});

export const profileTabActions = profileTabSlice.actions;

export default profileTabSlice;
