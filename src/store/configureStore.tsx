import { configureStore } from "@reduxjs/toolkit";
import scheduleSlice from "store/slice/scheduleslice";

export const store = configureStore({
    reducer: {
        schedule: scheduleSlice,
    },
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;