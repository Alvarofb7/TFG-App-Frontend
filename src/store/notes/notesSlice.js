import { createSlice } from "@reduxjs/toolkit";

export const notesSlice = createSlice({
	name: "notes",
	initialState: {
		isLoadingNotes: true,
		notes: [],
		activeNote: {
			title: "",
			description: "",
			date: new Date(),
			user: {},
		},
	},
	reducers: {
		onSetActiveNote: (state, { payload }) => {
			state.activeNote = payload;
		},
		onClearActiveNote: (state) => {
			state.activeNote = {
				title: "",
				description: "",
				date: new Date(),
				user: {},
			};
		},
		onSetNotes: (state, { payload = [] }) => {
			state.isLoadingNotes = false;
			state.notes = payload;
		},
		onAddNewNote: (state, { payload }) => {
			state.notes = [payload, ...state.notes];
			state.activeNote = {
				title: "",
				description: "",
				date: new Date(),
				user: {},
			};
		},
		onUpdateNote: (state, { payload }) => {
			state.notes = state.notes
				.map((note) => {
					if (note.id === payload.id) {
						return payload;
					}
					return note;
				})
				.sort((a, b) => {
					// Ordena por fecha descendente
					return new Date(b.date) - new Date(a.date);
				});
			state.activeNote = {
				title: "",
				description: "",
				date: new Date(),
				user: {},
			};
		},
		onDeleteNote: (state) => {
			if (state.activeNote) {
				state.notes = state.notes.filter(
					(note) => note.id !== state.activeNote.id
				);
				state.activeNote = {
					title: "",
					description: "",
					date: new Date(),
					user: {},
				};
			}
		},
		onLogoutNotes: (state) => {
			state.isLoadingNotes = true;
			state.notes = [];
			state.activeNote = {
				title: "",
				description: "",
				date: new Date(),
				user: {},
			};
		},
	},
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
