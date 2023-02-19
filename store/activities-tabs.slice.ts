import { createSlice } from "@reduxjs/toolkit";

const initialState = { currentTab: "appointments" };

const activitiesTabSlice = createSlice({
  name: "activitiesTab",
  initialState,
  reducers: {
    push: (state, action) => {
      state.currentTab = action.payload;
    },
  },
});

export const activitiesTabActions = activitiesTabSlice.actions;

export default activitiesTabSlice;
