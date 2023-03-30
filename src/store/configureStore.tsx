import { configureStore } from "@reduxjs/toolkit";
import scheduleSlice from "./slice/schedule-slice";
import authSlice from "./slice/auth-slice";

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