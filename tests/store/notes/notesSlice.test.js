import {
	notesSlice,
	onAddNewNote,
	onClearActiveNote,
	onDeleteNote,
	onLogoutNotes,
	onSetActiveNote,
	onSetNotes,
	onUpdateNote,
} from "../../../src/store/notes/notesSlice";
import {
	noteInitialState,
	noteWithId,
	noteWithIdUpdated,
	noteWithNoteAndActiveState,
	noteWithNoteState,
} from "../../fixtures/notesStates";

describe("Pruebas en notesSlice", () => {
	test("Debe de retornar el estado inicial", () => {
		expect(notesSlice.getInitialState()).toEqual(noteInitialState);
	});

	test("Debe de activar la nota", () => {
		const state = notesSlice.reducer(
			noteWithNoteState,
			onSetActiveNote(noteWithId)
		);

		expect(state).toEqual(noteWithNoteAndActiveState);
	});

	test("Debe de quitar la nota activa", () => {
		const state = notesSlice.reducer(
			noteWithNoteAndActiveState,
			onClearActiveNote()
		);

		expect(state).toEqual(noteWithNoteState);
	});

	test("Debe de obtener las notas", () => {
		const state = notesSlice.reducer(
			noteInitialState,
			onSetNotes([noteWithId])
		);

		expect(state).toEqual(noteWithNoteState);
	});

	test("Debe de guardar una nota", () => {
		const state = notesSlice.reducer(
			noteInitialState,
			onAddNewNote(noteWithId)
		);

		expect(state).toEqual({
			isLoadingNotes: true,
			notes: [noteWithId],
			activeNote: {
				title: "",
				description: "",
				date: expect.any(Date),
				user: {},
			},
		});
	});

	test("Debe de actualizar una nota", () => {
		const state = notesSlice.reducer(
			noteWithNoteState,
			onUpdateNote(noteWithIdUpdated)
		);

		expect(state).toEqual({
			isLoadingNotes: false,
			notes: [noteWithIdUpdated],
			activeNote: {
				title: "",
				description: "",
				date: expect.any(Date),
				user: {},
			},
		});
	});

	test("Debe de eliminar una nota", () => {
		const state = notesSlice.reducer(
			noteWithNoteAndActiveState,
			onDeleteNote()
		);

		expect(state).toEqual({
			isLoadingNotes: false,
			notes: [],
			activeNote: {
				title: "",
				description: "",
				date: expect.any(Date),
				user: {},
			},
		});
	});

	test("Debe de retornar el estado inicial cuando se cierrra sesión", () => {
		const state = notesSlice.reducer(noteWithNoteState, onLogoutNotes());

		expect(state).toEqual(noteInitialState);
	});
});
