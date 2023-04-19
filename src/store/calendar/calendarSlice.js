import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
    _id: new Date().getTime(),
    title: "Cumpleaños del Jefe",
    notes: "Hay que comprar la tarta",
    start: new Date(),
    allDay: true,
    end: addHours(new Date(), 2),
    user: {
        _id: "123",
        name: "Alvaro"
    }
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [
            tempEvent
        ],
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
                state.events = state.events.filter(event => event._id !== state.activeEvent._id);
                state.activeEvent = null;
            }
        },
        onLoadEvents: (state, { payload = [] }) => {
            state.isLoadingEvents = false;
            payload.forEach(event => {
                const exists = state.events.some(dbEvent => dbEvent._id === event._id);
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