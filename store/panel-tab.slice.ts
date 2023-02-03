import { createSlice } from "@reduxjs/toolkit";

const initialState = { currentTab: "dashboard" };

const panelTabSlice = createSlice({
  name: "panelTab",
  initialState,
  reducers: {
    push: (state, action) => {
      state.currentTab = action.payload;
    },
  },
});

export const panelTabActions = panelTabSlice.actions;

export default panelTabSlice;
