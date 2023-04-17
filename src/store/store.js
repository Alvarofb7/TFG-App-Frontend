import { configureStore } from "@reduxjs/toolkit";
import { authSlice, calendarSlice, kanbanSlice, notesSlice } from "./";


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        calendar: calendarSlice.reducer,
        notes: notesSlice.reducer,
        kanban: kanbanSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})