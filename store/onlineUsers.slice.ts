import { createSlice } from "@reduxjs/toolkit";
import { ActiveUser } from "../types";

const users: ActiveUser[] = [];

const initialState = { users };

const onlineUsersSlice = createSlice({
  name: "onlineUsers",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    removeUsers: (state) => {
      state.users = [];
    },
  },
});

export const onlineUsersActions = onlineUsersSlice.actions;

export default onlineUsersSlice;
