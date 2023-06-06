import { testUserCredentials } from "./testUser";

export const newNote = {
	title: "",
	description: "",
	date: new Date(),
	user: {},
};

export const noteWithId = {
	title: "Nota",
	description: "Descripcion nota",
	date: new Date(2023, 10, 1, 11, 0),
	user: testUserCredentials,
	id: "1",
};

export const noteWithIdAndDate = {
	title: "Nota",
	description: "Descripcion nota",
	date: "2023-11-01T10:00:00.000Z",
	user: testUserCredentials,
	id: "1",
};

export const noteWithIdAndDateUpdated = {
	title: "Nota actualizada",
	description: "Descripcion nota",
	date: "2023-11-01T10:00:00.000Z",
	user: testUserCredentials,
	id: "1",
};

export const noteWithoutIdAndDate = {
	title: "Nota",
	description: "Descripcion nota",
	date: "2023-11-01T10:00:00.000Z",
	user: testUserCredentials,
};

export const noteWithIdUpdated = {
	title: "Nota actualizada",
	description: "Descripcion nota",
	date: expect.any(Date),
	user: testUserCredentials,
	id: "1",
};

export const noteWithoutId = {
	title: "Nota",
	description: "Descripcion nota",
	date: expect.any(Date),
	user: testUserCredentials,
};

export const noteInitialState = {
	isLoadingNotes: true,
	notes: [],
	activeNote: {
		title: "",
		description: "",
		date: expect.any(Date),
		user: {},
	},
};

export const noteWithNoteState = {
	isLoadingNotes: false,
	notes: [noteWithId],
	activeNote: {
		title: "",
		description: "",
		date: expect.any(Date),
		user: {},
	},
};

export const noteWithNoteAndActiveState = {
	isLoadingNotes: false,
	notes: [noteWithId],
	activeNote: noteWithId,
};
