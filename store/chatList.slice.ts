import { createSlice } from "@reduxjs/toolkit";
import { Chat } from "../types";

const chats: Chat[] = [];

const initialState = { chats };

const chatListSlice = createSlice({
  name: "chatList",
  initialState,
  reducers: {
    setChatList: (state, action) => {
      state.chats = [...action.payload];
    },
    addToChatList: (state, action) => {
      state.chats = [...state.chats, action.payload];
    },
    removeFromChatList: (state, action) => {
      state.chats = state.chats.filter((ch) => ch._id !== action.payload);
    },
  },
});

export const chatListActions = chatListSlice.actions;

export default chatListSlice;
