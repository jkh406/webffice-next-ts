import { configureStore } from "@reduxjs/toolkit";
import scheduleSlice from "store/slice/scheduleslice";

export const store = configureStore({
    reducer: {
        schedule: scheduleSlice,
    }
})