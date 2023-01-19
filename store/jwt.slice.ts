import { createSlice } from "@reduxjs/toolkit";

const initialState = { token: "" };

const jwtSlice = createSlice({
  name: "jwt",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const jwtActions = jwtSlice.actions;

export default jwtSlice;
