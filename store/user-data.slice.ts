import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: {} };

const userDataSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserData: (state, action) => {
      state.data = action.payload;
    },
    removeUserData: (state) => {
      state.data = {};
    },
  },
});

export const userDataActions = userDataSlice.actions;

export default userDataSlice;
