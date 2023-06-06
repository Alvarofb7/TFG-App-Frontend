import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook } from "@testing-library/react";
import { authSlice, calendarSlice } from "../../src/store";
import {
	calendarInitialState,
	calendarLoadEventsState,
	calendarWithActiveEventState,
	calendarWithEventsState,
	calendarWithEventsUpdatedState,
	calendarWithoutActiveEventState,
	eventExample,
	eventInsert,
	eventUpdated,
} from "../fixtures/calendarStates";
import { useCalendarStore } from "../../src/hooks";
import { api } from "../../src/api";
import { testUserCredentials } from "../fixtures/testUser";

const getMockStore = (calendarInitialState) => {
	return configureStore({
		reducer: {
			calendar: calendarSlice.reducer,
			auth: authSlice.reducer,
		},
		preloadedState: {
			calendar: { ...calendarInitialState },
			auth: {
				status: "authenticated",
				user: testUserCredentials,
				errorMessage: undefined,
			},
		},
	});
};

describe("Pruebas en useCalendarStore", () => {
	beforeEach(() => {
		localStorage.clear();
		jest.clearAllMocks();
	});

	test("Debe de regresar los valores por defecto", () => {
		const mockStore = getMockStore({ ...calendarInitialState });
		const { result } = renderHook(() => useCalendarStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		expect(result.current).toEqual({
			activeEvent: null,
			events: [],
			quitActiveEvent: expect.any(Function),
			startDeletingEvent: expect.any(Function),
			setActiveEvent: expect.any(Function),
			startLoadingEvents: expect.any(Function),
			startSavingEvent: expect.any(Function),
		});
	});

	test("StartSavingEvent debe de insertar el evento", async () => {
		const { data } = await api.post("/auth", testUserCredentials);
		localStorage.setItem("token", data.token);

		const mockStore = getMockStore({
			...calendarInitialState,
		});

		const { result } = renderHook(() => useCalendarStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		const mockedResponse = {
			ok: true,
			evento: {
				id: "mocked-id",
				...eventInsert,
			},
		};

		const spy = jest
			.spyOn(api, "post")
			.mockReturnValue({ data: mockedResponse });

		await act(async () => {
			await result.current.startSavingEvent(eventInsert);
		});

		const { activeEvent, events } = result.current;

		expect({ activeEvent, events }).toEqual({
			activeEvent: null,
			events: [
				{
					...eventInsert,
					id: "mocked-id",
				},
			],
		});

		spy.mockRestore();
	});

	test("StartSavingEvent debe de actualizar el evento", async () => {
		const { data } = await api.post("/auth", testUserCredentials);
		localStorage.setItem("token", data.token);

		const mockStore = getMockStore({
			...calendarWithEventsState,
		});

		const { result } = renderHook(() => useCalendarStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		const spy = jest.spyOn(api, "put").mockReturnValue();

		await act(async () => {
			await result.current.startSavingEvent(eventUpdated);
		});

		const { activeEvent, events } = result.current;

		expect({ activeEvent, events }).toEqual({
			activeEvent: null,
			events: calendarWithEventsUpdatedState.events,
		});

		spy.mockRestore();
	});

	test("startLoadingEvents debe de obtener los eventos", async () => {
		const { data } = await api.post("/auth", testUserCredentials);
		localStorage.setItem("token", data.token);

		const mockStore = getMockStore({
			...calendarInitialState,
		});

		const { result } = renderHook(() => useCalendarStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		const mockedResponse = {
			ok: true,
			eventos: calendarLoadEventsState.events,
		};

		const spy = jest
			.spyOn(api, "get")
			.mockReturnValue({ data: mockedResponse });

		await act(async () => {
			await result.current.startLoadingEvents();
		});

		const { activeEvent, events } = result.current;

		expect({ activeEvent, events }).toEqual({
			activeEvent: null,
			events: calendarWithEventsState.events,
		});

		spy.mockRestore();
	});

	test("startDeletingEvent debe de eliminar el evento", async () => {
		const { data } = await api.post("/auth", testUserCredentials);
		localStorage.setItem("token", data.token);

		const mockStore = getMockStore({
			...calendarWithActiveEventState,
		});

		const { result } = renderHook(() => useCalendarStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		const spy = jest.spyOn(api, "delete").mockReturnValue();

		await act(async () => {
			await result.current.startDeletingEvent();
		});

		const { activeEvent, events } = result.current;

		expect({ activeEvent, events }).toEqual({
			activeEvent: null,
			events: [],
		});

		spy.mockRestore();
	});

	test("setActiveEvent debe de activar un evento", async () => {
		const { data } = await api.post("/auth", testUserCredentials);
		localStorage.setItem("token", data.token);

		const mockStore = getMockStore({
			...calendarWithoutActiveEventState,
		});

		const { result } = renderHook(() => useCalendarStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		act(() => {
			result.current.setActiveEvent(eventExample);
		});

		const { activeEvent, events } = result.current;

		expect({ activeEvent, events }).toEqual({
			activeEvent: eventExample,
			events: calendarWithActiveEventState.events,
		});
	});

	test("quitActiveEvent debe de quitar el evento activado", async () => {
		const { data } = await api.post("/auth", testUserCredentials);
		localStorage.setItem("token", data.token);

		const mockStore = getMockStore({
			...calendarWithActiveEventState,
		});

		const { result } = renderHook(() => useCalendarStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		act(() => {
			result.current.quitActiveEvent();
		});

		const { activeEvent, events } = result.current;

		expect({ activeEvent, events }).toEqual({
			activeEvent: null,
			events: calendarWithoutActiveEventState.events,
		});
	});
});
