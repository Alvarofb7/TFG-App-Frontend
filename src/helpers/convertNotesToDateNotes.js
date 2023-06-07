import { parseISO } from "date-fns";

export const convertNotesToDateNotes = (notes = []) => {
	return notes.map((note) => {
		note.date = parseISO(note.date);

		return note;
	});
};
