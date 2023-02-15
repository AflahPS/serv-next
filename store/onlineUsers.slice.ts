import { createSlice } from "@reduxjs/toolkit";

const initialState = { users: null };

const onlineUsersSlice = createSlice({
  name: "onlineUsers",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    removeUsers: (state) => {
      state.users = null;
    },
  },
});

export const onlineUsersActions = onlineUsersSlice.actions;

export default onlineUsersSlice;
