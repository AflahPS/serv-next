import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLayoutLoading: false };

const layoutLoadingSlice = createSlice({
  name: "layoutLoading",
  initialState,
  reducers: {
    loading: (state) => {
      state.isLayoutLoading = true;
    },
    finishedLoading: (state) => {
      state.isLayoutLoading = false;
    },
  },
});

export const layoutLoadingActions = layoutLoadingSlice.actions;

export default layoutLoadingSlice;
