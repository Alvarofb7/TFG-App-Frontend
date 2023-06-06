import { fireEvent, render, screen } from "@testing-library/react";
import { useNoteStore } from "../../../src/hooks";
import { SideBar } from "../../../src/notes/components/SideBar";
import { notesSlice } from "../../../src/store";
import {
	noteInitialState,
	noteWithId,
	noteWithNoteState,
} from "../../fixtures/notesStates";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

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

describe("Pruebas del componente SideBar", () => {
	const mockStartLoadingNote = jest.fn();
	const mockSetActiveNewNote = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		jest.clearAllTimers();

		useNoteStore.mockReturnValue({
			setActiveNewNote: mockSetActiveNewNote,
			startLoadingNote: mockStartLoadingNote,
		});
	});

	test("No debe de mostrarse el componente", () => {
		const mockStore = getMockStore(noteInitialState);

		render(
			<Provider store={mockStore}>
				<SideBar show={"none"} />
			</Provider>
		);

		const sideBar = screen.getByLabelText("sideBar");

		expect(sideBar.style.display).toBe("none");
		expect(mockStartLoadingNote).toHaveBeenCalled();
	});

	test("Debe de mostrarse el componente correctamente", () => {
		const mockStore = getMockStore(noteInitialState);

		const { container } = render(
			<Provider store={mockStore}>
				<SideBar show={""} />
			</Provider>
		);

		expect(container).toMatchSnapshot();
		expect(mockStartLoadingNote).toHaveBeenCalled();
	});

	test("Deben de mostrarse los eventos en el componente correctamente", () => {
		const mockStore = getMockStore(noteWithNoteState);

		render(
			<Provider store={mockStore}>
				<SideBar show={""} />
			</Provider>
		);

		const li = screen.getByLabelText(`note-${noteWithId.id}`);
		expect(li).toBeInTheDocument();
		expect(mockStartLoadingNote).toHaveBeenCalled();
	});

	test("Deben de llamar a setActiveNewNote cuando se haga click en el botón", () => {
		const mockStore = getMockStore(noteWithNoteState);

		render(
			<Provider store={mockStore}>
				<SideBar show={""} />
			</Provider>
		);

		const btn = screen.getByLabelText("btn-add-new-note");
		fireEvent.click(btn);

		expect(mockSetActiveNewNote).toHaveBeenCalled();
	});
});
