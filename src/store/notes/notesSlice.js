import { createSlice } from '@reduxjs/toolkit';

export const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        isLoadingNotes: true,
        notes: [],
        activeNote: null,
    },
    reducers: {
        onSetActiveNote: (state, { payload }) => {
            state.activeNote = payload;
        },
        onClearActiveNote: (state) => {
            state.activeNote = null;
        },
        onSetNotes: (state, { payload = [] }) => {
            state.isLoadingNotes = false;
            state.notes = payload;
        },
        onAddNewNote: (state, { payload }) => {
            state.notes = [payload, ...state.notes];
            state.activeNote = null;
        },
        onUpdateNote: (state, { payload }) => {
            state.notes = state.notes.map(note => {
                if (note.id === payload.id) {
                    return payload;
                }
                return note;
            }).sort((a, b) => {
                // Ordena por fecha descendente
                return new Date(b.date) - new Date(a.date);
            });
            state.activeNote = null;
        },
        onDeleteNote: (state) => {
            if (state.activeNote) {
                state.notes = state.notes.filter(note => note.id !== state.activeNote.id)
                state.activeNote = null;
            }
        },
        onLogoutNotes: (state) => {
            state.isLoadingNotes = true;
            state.notes = [];
            state.activeNote = null;
        }
    }
});
export const {
    onAddNewNote,
    onClearActiveNote,
    onDeleteNote,
    onLogoutNotes,
    onSetActiveNote,
    onSetNotes,
    onUpdateNote,
} = notesSlice.actions;