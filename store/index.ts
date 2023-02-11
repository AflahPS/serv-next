import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import jwtSlice from "./jwt.slice";
import roleSlice from "./role.slice";
import profileTabSlice from "./profile-tab.slice";
import userDataSlice from "./user-data.slice";
import { Chat, User, Vendor } from "../types";
import sideNavTabSlice from "./sidenav-tab.slice";
import layoutLoadingSlice from "./layout-loading.slice";
import panelTabSlice from "./panel-tab.slice";
import notifierSlice from "./notifier.slice";
import chatSlice from "./chatId.slice";
import chatListSlice from "./chatList.slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    jwt: jwtSlice.reducer,
    role: roleSlice.reducer,
    profileTab: profileTabSlice.reducer,
    panelTab: panelTabSlice.reducer,
    user: userDataSlice.reducer,
    sideNavTab: sideNavTabSlice.reducer,
    layoutLoading: layoutLoadingSlice.reducer,
    notifier: notifierSlice.reducer,
    chat: chatSlice.reducer,
    chatList: chatListSlice.reducer,
  },
});

export default store;

export interface StoreState {
  auth: { isAuth: boolean };
  jwt: { token: string };
  role: { currentUser: string };
  profileTab: { currentTab: string };
  sideNavTab: { currentTab: string };
  panelTab: { currentTab: string };
  user: { data: User & Vendor };
  layoutLoading: { isLayoutLoading: boolean };
  notifier: {
    errorMessage: string;
    OpenError: boolean;
    successMessage: string;
    OpenSuccess: boolean;
    infoMessage: string;
    OpenInfo: boolean;
  };
  chat: { chatId: string };
  chatList: { chats: Chat[] };
}
