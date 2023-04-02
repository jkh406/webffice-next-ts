import { configureStore } from "@reduxjs/toolkit";
import scheduleSlice from "./slice/schedule-slice";
import authSlice from "./slice/auth-slice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  // localStorage에 저장.
  storage,
  // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장.
  whitelist: ["auth"]
  // blacklist -> 제외.
};

export const store = configureStore({
    reducer: {
        schedule: scheduleSlice,
        auth: authSlice
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;