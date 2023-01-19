import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import jwtSlice from "./jwt.slice";
import roleSlice from "./role.slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    jwt: jwtSlice.reducer,
    role: roleSlice.reducer,
  },
});

export default store;
