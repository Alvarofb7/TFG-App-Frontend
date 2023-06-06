import {
	calendarSlice,
	onAddNewEvent,
	onClearActiveEvent,
	onDeleteEvent,
	onLoadEvents,
	onLogoutCalendar,
	onSetActiveEvent,
	onUpdateEvent,
} from "../../../src/store/calendar/calendarSlice";

import {
	calendarInitialState,
	calendarWithActiveEventState,
	calendarWithEventsState,
	calendarWithoutActiveEventState,
	eventExample,
} from "../../fixtures/calendarStates";

import { testUserCredentials } from "../../fixtures/testUser";

describe("Pruebas en calendarSlice", () => {
	test("Debe de regresar el estado inicial", () => {
		expect(calendarSlice.getInitialState()).toEqual(calendarInitialState);
	});

	test("Debe de quitar un evento activo", () => {
		const state = calendarSlice.reducer(
			calendarWithActiveEventState,
			onClearActiveEvent()
		);

		expect(state).toEqual({
			isLoadingEvents: false,
			events: [
				{
					id: "1",
					title: "Titulo",
					notes: "",
					start: new Date(2023, 10, 1, 9, 0),
					end: new Date(2023, 10, 1, 10, 0),
					user: testUserCredentials,
					allDay: false,
				},
			],
			activeEvent: null,
		});
	});

	test("Debe de activar un evento", () => {
		const state = calendarSlice.reducer(
			calendarWithoutActiveEventState,
			onSetActiveEvent(eventExample)
		);

		expect(state).toEqual(calendarWithActiveEventState);
	});

	test("Debe de añadir un evento", () => {
		const state = calendarSlice.reducer(
			calendarInitialState,
			onAddNewEvent(eventExample)
		);

		expect(state).toEqual({
			isLoadingEvents: true,
			events: [eventExample],
			activeEvent: null,
		});
	});

	test("Debe de actualizar un evento", () => {
		const state = calendarSlice.reducer(
			calendarWithEventsState,
			onUpdateEvent(eventExample)
		);

		expect(state).toEqual({
			isLoadingEvents: false,
			events: [
				eventExample,
				{
					id: "2",
					title: "Titulo2",
					notes: "",
					start: new Date(2023, 10, 1, 12, 0),
					end: new Date(2023, 10, 1, 15, 0),
					user: testUserCredentials,
					allDay: false,
				},
			],
			activeEvent: null,
		});
	});

	test("Debe de eliminar un evento", () => {
		const state = calendarSlice.reducer(
			calendarWithActiveEventState,
			onDeleteEvent(eventExample)
		);

		expect(state).toEqual({
			isLoadingEvents: false,
			events: [],
			activeEvent: null,
		});
	});

	test("Debe de obtener los eventos", () => {
		const state = calendarSlice.reducer(
			calendarInitialState,
			onLoadEvents([eventExample])
		);

		expect(state).toEqual({
			isLoadingEvents: false,
			events: [eventExample],
			activeEvent: null,
		});
	});

	test("Debe de reestablecer los valores iniales al cerrar sesion", () => {
		const state = calendarSlice.reducer(
			calendarWithEventsState,
			onLogoutCalendar()
		);

		expect(state).toEqual(calendarInitialState);
	});
});
