import { Provider } from "react-redux";
import { authSlice, notesSlice } from "../../src/store";
import {
	newNote,
	noteInitialState,
	noteWithId,
	noteWithIdAndDate,
	noteWithIdAndDateUpdated,
	noteWithNoteAndActiveState,
	noteWithNoteState,
	noteWithoutIdAndDate,
} from "../fixtures/notesStates";
import { configureStore } from "@reduxjs/toolkit";
import { testUserCredentials } from "../fixtures/testUser";
import { act, renderHook } from "@testing-library/react";
import { useNoteStore } from "../../src/hooks";
import { api } from "../../src/api";

const getMockStore = (notesInitialState) => {
	return configureStore({
		reducer: {
			notes: notesSlice.reducer,
			auth: authSlice.reducer,
		},
		preloadedState: {
			notes: { ...notesInitialState },
			auth: {
				status: "authenticated",
				user: testUserCredentials,
				errorMessage: undefined,
			},
		},
	});
};

describe("Pruebas en useNoteStore", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("Debe de regresar los valores por defecto", () => {
		const mockStore = getMockStore({ ...noteInitialState });
		const { result } = renderHook(() => useNoteStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		expect(result.current).toEqual({
			activeNote: {
				title: "",
				description: "",
				date: expect.any(Date),
				user: {},
			},
			notes: [],
			isLoadingNotes: true,
			clearActiveNote: expect.any(Function),
			setActiveNewNote: expect.any(Function),
			setActiveNote: expect.any(Function),
			startDeletingNote: expect.any(Function),
			startLoadingNote: expect.any(Function),
			startSavingNote: expect.any(Function),
		});
	});

	test("setActiveNote debe de activar una nota existente", async () => {
		const mockStore = getMockStore({ ...noteWithNoteState });
		const { result } = renderHook(() => useNoteStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		act(() => {
			result.current.setActiveNote(noteWithId);
		});

		const { isLoadingNotes, notes, activeNote } = result.current;

		expect({ isLoadingNotes, notes, activeNote }).toEqual(
			noteWithNoteAndActiveState
		);
	});

	test("setActiveNewNote debe de activar una nota nueva", async () => {
		const mockStore = getMockStore({ ...noteInitialState });
		const { result } = renderHook(() => useNoteStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		act(() => {
			result.current.setActiveNewNote(newNote);
		});

		const { isLoadingNotes, notes, activeNote } = result.current;

		expect({ isLoadingNotes, notes, activeNote }).toEqual(noteInitialState);
	});

	test("clearActiveNote debe de quitar una nota activa", async () => {
		const mockStore = getMockStore({ ...noteWithNoteAndActiveState });
		const { result } = renderHook(() => useNoteStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		act(() => {
			result.current.clearActiveNote();
		});

		const { isLoadingNotes, notes, activeNote } = result.current;

		expect({ isLoadingNotes, notes, activeNote }).toEqual(noteWithNoteState);
	});

	test("startLoadingNote tiene que obtener las notas correctamente", async () => {
		const mockStore = getMockStore({ ...noteInitialState });
		const { result } = renderHook(() => useNoteStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		const mockedResponse = {
			ok: true,
			notes: [noteWithIdAndDate],
		};

		const spy = jest
			.spyOn(api, "get")
			.mockReturnValue({ data: mockedResponse });

		await act(async () => {
			await result.current.startLoadingNote();
		});

		const { isLoadingNotes, notes, activeNote } = result.current;

		expect({ isLoadingNotes, notes, activeNote }).toEqual(noteWithNoteState);

		spy.mockRestore();
	});

	test("startSavingNote debe de añadir una nota nueva", async () => {
		const mockStore = getMockStore({ ...noteInitialState });
		const { result } = renderHook(() => useNoteStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		const mockedResponse = {
			ok: true,
			note: noteWithId,
		};

		const spy = jest
			.spyOn(api, "post")
			.mockReturnValue({ data: mockedResponse });

		await act(async () => {
			await result.current.startSavingNote(noteWithoutIdAndDate);
		});

		const { notes, activeNote } = result.current;

		expect({ notes, activeNote }).toEqual({
			notes: [
				{
					title: "Nota",
					description: "Descripcion nota",
					date: "2023-11-01T10:00:00.000Z",
					user: testUserCredentials,
					id: "1",
				},
			],
			activeNote: noteWithNoteState.activeNote,
		});

		spy.mockRestore();
	});

	test("startSavingNote debe de actualizar una nota", async () => {
		const mockStore = getMockStore({ ...noteWithNoteState });
		const { result } = renderHook(() => useNoteStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		const spy = jest.spyOn(api, "put").mockReturnValue();

		await act(async () => {
			await result.current.startSavingNote(noteWithIdAndDateUpdated);
		});

		const { notes, activeNote } = result.current;

		expect({ notes, activeNote }).toEqual({
			notes: [
				{
					title: "Nota actualizada",
					description: "Descripcion nota",
					date: expect.any(Date),
					user: testUserCredentials,
					id: "1",
				},
			],
			activeNote: {
				title: "",
				description: "",
				date: expect.any(Date),
				user: {},
			},
		});

		spy.mockRestore();
	});

	test("startDeletingNote debe de eliminar una nota", async () => {
		// const { data } = await api.post("/auth", testUserCredentials);
		// localStorage.setItem("token", data.token);

		const mockStore = getMockStore({ ...noteWithNoteAndActiveState });
		const { result } = renderHook(() => useNoteStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		const spy = jest.spyOn(api, "delete").mockReturnValue();

		await act(async () => {
			await result.current.startDeletingNote();
		});

		const { notes, activeNote } = result.current;

		expect({ notes, activeNote }).toEqual({
			notes: [],
			activeNote: {
				title: "",
				description: "",
				date: expect.any(Date),
				user: {},
			},
		});

		spy.mockRestore();
	});
});
