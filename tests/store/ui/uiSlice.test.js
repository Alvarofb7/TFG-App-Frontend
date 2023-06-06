import {
	onCloseCalendarModal,
	onCloseKanbanModal,
	onLogoutUi,
	onOpenCalendarModal,
	onOpenKanbanModal,
	uiSlice,
} from "../../../src/store/ui/uiSlice";
import { uiInitialState, uiOpenState } from "../../fixtures/uiStates";

describe("Pruebas en uiSlice", () => {
	test("Debe de retornar el estado inicial", () => {
		expect(uiSlice.getInitialState()).toEqual(uiInitialState);
	});

	test("Debe de abrir correctamente el modal de calendario", () => {
		const state = uiSlice.reducer(uiInitialState, onOpenCalendarModal());

		expect(state.isCalendarModalOpen).toBeTruthy();
	});

	test("Debe de cerrar correctamente el modal de calendario", () => {
		const state = uiSlice.reducer(uiInitialState, onCloseCalendarModal());

		expect(state.isCalendarModalOpen).toBeFalsy();
	});

	test("Debe de abrir correctamente el modal de kanban", () => {
		const state = uiSlice.reducer(uiInitialState, onOpenKanbanModal());

		expect(state.isKanbanModalOpen).toBeTruthy();
	});

	test("Debe de cerrar correctamente el modal de kanban", () => {
		const state = uiSlice.reducer(uiInitialState, onCloseKanbanModal());

		expect(state.isKanbanModalOpen).toBeFalsy();
	});

	test("Debe de retornar el estado inicial al cerrar sesion", () => {
		const state = uiSlice.reducer(uiOpenState, onLogoutUi());

		expect(state).toEqual(uiInitialState);
	});
});
