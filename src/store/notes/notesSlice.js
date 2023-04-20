import { createSlice } from '@reduxjs/toolkit';

const tempNote = {
    _id: new Date().getTime(),
    title:"TituloNota",
    description:"DescripcionNota",
    date: new Date(),
    user: {
        _id: "ABC",
        name: "Alvaro"
    }
}


export const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        isLoadingNotes: true,
        notes: [tempNote],
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
            state.notes.push(payload);
            state.activeNote = null;
        },
        onUpdateNote: (state, { payload }) => {
            state.notes = state.notes.map(note => {
                if (note._id === payload._id) {
                    return payload;
                }
                return note;
            });
            state.activeNote = null;
        },
        onDeleteNote: (state) => {
            if (state.activeNote) {
                state.notes = state.notes.filter(note => note._id !== state.activeNote._id)
                state.activeNote = null;
            }
        }
    }
});
export const {
    onAddNewNote,
    onClearActiveNote,
    onDeleteNote,
    onSetActiveNote,
    onSetNotes,
    onUpdateNote,
} = notesSlice.actions;