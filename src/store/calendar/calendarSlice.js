import { createSlice } from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        counter: 10
    },
    reducers: {
        increment: (state, /* action */ ) => {
            state.counter += 1; /* action.payload */
        },
    }
});
// Action creators are generated for each case reducer function,
export const { increment } = calendarSlice.actions;