import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { useNoteStore } from "../../../src/hooks";
import { noteInitialState } from "../../fixtures/notesStates";
import { notesSlice } from "../../../src/store";
import { NotesPage } from "../../../src/notes/pages/NotesPage";

jest.mock("../../../src/hooks/useNoteStore");

const getMockStore = (initialState) => {
	return configureStore({
		reducer: {
			notes: notesSlice.reducer,
		},
		preloadedState: {
			notes: { ...initialState },
		},
	});
};

describe("Pruebas en el layout NotesLayout", () => {
	const mockStartLoadingNote = jest.fn();
	const mockSetActiveNewNote = jest.fn();
	const mockStartSavingNote = jest.fn();
	const mockStartDeletingNote = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		jest.clearAllTimers();
	});

	test("Debe de mostrarse correctamente", () => {
		useNoteStore.mockReturnValue({
			setActiveNewNote: mockSetActiveNewNote,
			startLoadingNote: mockStartLoadingNote,
			startSavingNote: mockStartSavingNote,
			startDeletingNote: mockStartDeletingNote,
			activeNote: {
				title: "",
				description: "",
				date: new Date(),
				user: {},
			},
		});
		const mockStore = getMockStore(noteInitialState);

		render(
			<Provider store={mockStore}>
				<NotesPage />
			</Provider>
		);

		const btnCollapse = screen.getByLabelText("btn-collapse-sidebar");
		const inputTitle = screen.getByLabelText("input-title-note");

		expect(btnCollapse).toBeInTheDocument();
		expect(inputTitle).toBeInTheDocument();

		expect(mockStartLoadingNote).toHaveBeenCalled();
	});
});
