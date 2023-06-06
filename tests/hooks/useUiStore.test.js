import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook } from "@testing-library/react";

import { uiSlice } from "../../src/store";
import { useUiStore } from "../../src/hooks";
import { uiInitialState } from "../fixtures/uiStates";

const getMockStore = (initialState) => {
	return configureStore({
		reducer: {
			ui: uiSlice.reducer,
		},
		preloadedState: {
			ui: { ...initialState },
		},
	});
};

describe("Pruebas en useUiStore", () => {
	test("Debe de regresar los valores por defecto", () => {
		const mockStore = getMockStore(uiInitialState);

		const { result } = renderHook(() => useUiStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		expect(result.current).toEqual({
			isCalendarModalOpen: false,
			openCalendarModal: expect.any(Function),
			closeCalendarModal: expect.any(Function),
			isKanbanModalOpen: false,
			openKanbanModal: expect.any(Function),
			closeKanbanModal: expect.any(Function),
		});
	});

	test("openCalendarModal debe de colocar true en isCalendarModalOpen", () => {
		const mockStore = getMockStore(uiInitialState);
		const { result } = renderHook(() => useUiStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		act(() => {
			result.current.openCalendarModal();
		});

		expect(result.current.isCalendarModalOpen).toBeTruthy();
	});

	test("closeCalendarModal debe de colocar false en isCalendarModalOpen", () => {
		const mockStore = getMockStore(uiInitialState);
		const { result } = renderHook(() => useUiStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		act(() => {
			result.current.closeCalendarModal();
		});

		expect(result.current.isCalendarModalOpen).toBeFalsy();
	});

	test("openKanbanModal debe de colocar true en isKanbanModalOpen", () => {
		const mockStore = getMockStore(uiInitialState);
		const { result } = renderHook(() => useUiStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		act(() => {
			result.current.openKanbanModal();
		});

		expect(result.current.isKanbanModalOpen).toBeTruthy();
	});

	test("closeKanbanModal debe de colocar false en isKanbanModalOpen", () => {
		const mockStore = getMockStore(uiInitialState);
		const { result } = renderHook(() => useUiStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		act(() => {
			result.current.closeKanbanModal();
		});

		expect(result.current.isKanbanModalOpen).toBeFalsy();
	});
});
