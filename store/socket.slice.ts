import { createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

interface SocketSlice {
  current: Socket<any> | undefined;
}

const initialState: SocketSlice = { current: undefined };

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.current = action.payload;
    },
    removeSocket: (state) => {
      state.current = undefined;
    },
  },
});

export const socketActions = socketSlice.actions;

export default socketSlice;
