import { createSlice } from "@reduxjs/toolkit";

const initialState = { chatId: "" };

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat: (state, action) => {
      state.chatId = action.payload;
    },
    removeChat: (state) => {
      state.chatId = "";
    },
  },
});

export const chatActions = chatSlice.actions;

export default chatSlice;
