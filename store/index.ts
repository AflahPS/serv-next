import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import jwtSlice from "./jwt.slice";
import roleSlice from "./role.slice";
import profileTabSlice from "./profile-tab.slice";
import userDataSlice from "./user-data.slice";
import { User, Vendor } from "../types";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    jwt: jwtSlice.reducer,
    role: roleSlice.reducer,
    profileTab: profileTabSlice.reducer,
    user: userDataSlice.reducer,
  },
});

export default store;

export interface StoreState {
  auth: { isAuth: boolean };
  jwt: { token: string };
  role: { currentUser: string };
  profileTab: { currentTab: string };
  user: { data: User | Vendor };
}
