import { render, screen } from "@testing-library/react";
import { RenderNotes } from "../../../src/notes/components/RenderNotes";
import { noteWithId } from "../../fixtures/notesStates";
import { useNoteStore } from "../../../src/hooks";

jest.mock("../../../src/hooks/useNoteStore");

describe("Pruebas en el componente RenderNotes", () => {
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

	test("Debe de mostrar el evento si hay notas creadas", () => {
		render(<RenderNotes notes={[noteWithId]} />);

		const li = screen.getByLabelText(`note-${noteWithId.id}`);

		expect(li).toBeInTheDocument();
	});

	test("Debe de mostrar el mensaje si no existen notas creadas", () => {
		render(<RenderNotes notes={[]} />);

		const li = screen.getByText("Cree una nota para empezar");

		expect(li).toBeInTheDocument();
	});
});
