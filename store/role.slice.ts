import { createSlice } from "@reduxjs/toolkit";

const initialState = { currentUser: "guest" };

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    user: (state) => {
      state.currentUser = "user";
    },
    vendor: (state) => {
      state.currentUser = "vendor";
    },
    admin: (state) => {
      state.currentUser = "admin";
    },
    superAdmin: (state) => {
      state.currentUser = "super-admin";
    },
    guest: (state) => {
      state.currentUser = "guest";
    },
  },
});

export const roleActions = roleSlice.actions;

export default roleSlice;
