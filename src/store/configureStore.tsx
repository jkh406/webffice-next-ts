import { configureStore } from "@reduxjs/toolkit";
import scheduleSlice from "./slice/schedule-slice";
import authSlice from "./slice/auth-slice";
import adminSlice from "./slice/admin-slice";
import boardSlice from "./slice/board-slice";

export const store = configureStore({
    reducer: {
        schedule: scheduleSlice,
        auth: authSlice,
        admin: adminSlice,
        board: boardSlice
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    devTools: true
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;