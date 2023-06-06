import { fireEvent, render, screen } from "@testing-library/react";
import { useNoteStore } from "../../../src/hooks";
import { SideBarNote } from "../../../src/notes/components/SideBarNote";
import { noteWithId } from "../../fixtures/notesStates";

jest.mock("../../../src/hooks/useNoteStore");

describe("Pruebas en el componente SideBarNote", () => {
	const mockSetActiveNote = jest.fn();
	const mockSetActiveNewNote = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		jest.clearAllTimers();

		useNoteStore.mockReturnValue({
			setActiveNote: mockSetActiveNote,
			setActiveNewNote: mockSetActiveNewNote,
		});
	});

	test("Debe de mostrarse el componente correctamente", () => {
		const { container } = render(
			<SideBarNote key={noteWithId.id} {...noteWithId} />
		);

		const title = screen.getByText(noteWithId.title);

		expect(title).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	test("Debe de llamar a setActiveNewNote al hacer click en una nota y ya esta activa ", () => {
		useNoteStore.mockReturnValue({
			activeNote: noteWithId,
			setActiveNote: mockSetActiveNote,
			setActiveNewNote: mockSetActiveNewNote,
		});

		render(<SideBarNote key={noteWithId.id} {...noteWithId} />);

		const li = screen.getByLabelText(`note-${noteWithId.id}`);
		fireEvent.click(li);

		expect(mockSetActiveNewNote).toHaveBeenCalled();
	});

	test("Debe de llamar a setActiveNote al hacer click en una nota que no estaba activa", () => {
		useNoteStore.mockReturnValue({
			activeNote: null,
			setActiveNote: mockSetActiveNote,
			setActiveNewNote: mockSetActiveNewNote,
		});

		render(<SideBarNote key={noteWithId.id} {...noteWithId} />);

		const li = screen.getByLabelText(`note-${noteWithId.id}`);
		fireEvent.click(li);

		expect(mockSetActiveNote).toHaveBeenCalled();
	});
});
