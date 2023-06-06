import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { NotesLayout } from "../../../src/notes/layout/NotesLayout";
import { useNoteStore } from "../../../src/hooks";
import { noteInitialState } from "../../fixtures/notesStates";
import { notesSlice } from "../../../src/store";

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

	beforeEach(() => {
		jest.clearAllMocks();
		jest.clearAllTimers();
	});

	test("Debe de mostrarse correctamente", () => {
		useNoteStore.mockReturnValue({
			setActiveNewNote: mockSetActiveNewNote,
			startLoadingNote: mockStartLoadingNote,
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
				<NotesLayout />
			</Provider>
		);

		const btnCollapse = screen.getByLabelText("btn-collapse-sidebar");
		expect(btnCollapse).toBeInTheDocument();

		expect(mockStartLoadingNote).toHaveBeenCalled();
	});
});
