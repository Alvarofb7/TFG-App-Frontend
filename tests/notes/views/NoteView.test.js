import { render, fireEvent, screen } from "@testing-library/react";
import { useNoteStore } from "../../../src/hooks";
import Swal from "sweetalert2";
import { NoteView } from "../../../src/notes/views/NoteView";

jest.mock("../../../src/hooks/useNoteStore");
jest.mock("sweetalert2", () => ({
	fire: jest.fn(),
}));

describe("Pruebas en la vista NoteView", () => {
	const mockStartSavingNote = jest.fn();
	const mockStartDeletingNote = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("Debe mostrarse correctamente", () => {
		useNoteStore.mockReturnValue({
			activeNote: {
				title: "Test title",
				description: "Test description",
				date: new Date(),
			},
			startSavingNote: mockStartSavingNote,
			startDeletingNote: mockStartDeletingNote,
		});

		render(<NoteView />);

		const titleInput = screen.getByLabelText("input-title-note");
		const descriptionTextarea = screen.getByPlaceholderText("Descripción");

		expect(titleInput).not.toBe();
		expect(descriptionTextarea).not.toBe();
	});

	test("Debe llamar a startSavingNote cuando se envía el formulario con un título", () => {
		useNoteStore.mockReturnValue({
			activeNote: {
				title: "Test title",
				description: "Test description",
				date: new Date(),
			},
			startSavingNote: mockStartSavingNote,
			startDeletingNote: mockStartDeletingNote,
		});

		render(<NoteView />);

		const titleInput = screen.getByLabelText("input-title-note");
		const form = screen.getByRole("form");

		fireEvent.change(titleInput, { target: { value: "New title" } });
		fireEvent.submit(form);

		expect(mockStartSavingNote).toHaveBeenCalled();
	});

	test("Debe llamar a Swal.fire cuando se envía el formulario sin un título", () => {
		useNoteStore.mockReturnValue({
			activeNote: {
				title: "",
				description: "Test description",
				date: new Date(),
			},
			startSavingNote: mockStartSavingNote,
			startDeletingNote: mockStartDeletingNote,
		});

		render(<NoteView />);

		const titleInput = screen.getByLabelText("input-title-note");
		const form = screen.getByLabelText("form-note");

		fireEvent.change(titleInput, { target: { value: "" } });
		fireEvent.submit(form);

		expect(Swal.fire).toHaveBeenCalled();
	});

	test("Debe llamar a startDeletingNote cuando se hace click en el botón de eliminar", () => {
		useNoteStore.mockReturnValue({
			activeNote: {
				id: 1,
				title: "Test title",
				description: "Test description",
				date: new Date(),
			},
			startSavingNote: mockStartSavingNote,
			startDeletingNote: mockStartDeletingNote,
		});

		render(<NoteView />);

		const deleteButton = screen.getByRole("button", { name: /Eliminar/i });

		fireEvent.click(deleteButton);

		expect(mockStartDeletingNote).toHaveBeenCalled();
	});
});
