import { createSlice } from "@reduxjs/toolkit";

const initialState = { currentTab: "posts" };

const sideNavTabSlice = createSlice({
  name: "sideNavTab",
  initialState,
  reducers: {
    push: (state, action) => {
      state.currentTab = action.payload;
    },
  },
});

export const sideNavTabActions = sideNavTabSlice.actions;

export default sideNavTabSlice;
