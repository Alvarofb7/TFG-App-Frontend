import { createSlice } from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [],
        activeEvent: null,
    },
    reducers: {
        onClearActiveEvent: (state) => {
            state.activeEvent = null;
        },
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(event => {
                if (event.id === payload.id) {
                    return payload;
                }
                return event;
            });
            state.activeEvent = null;
        },
        onDeleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter(event => event.id !== state.activeEvent.id);
                state.activeEvent = null;
            }
        },
        onLoadEvents: (state, { payload = [] }) => {
            state.isLoadingEvents = false;
            payload.forEach(event => {
                const exists = state.events.some(dbEvent => dbEvent.id === event.id);
                if (!exists) {
                    state.events.push(event);
                }
            })
        },
        onLogoutCalendar: (state) => {
            state.activeEvent = null;
            state.events = [];
            state.isLoadingEvents = true
        }
    }
});

export const {
    onAddNewEvent,
    onClearActiveEvent,
    onDeleteEvent,
    onLoadEvents,
    onLogoutCalendar,
    onSetActiveEvent,
    onUpdateEvent,
} = calendarSlice.actions;