import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook } from "@testing-library/react";
import { initialState, notAuthenticatedState } from "../fixtures/authStates";
import { authSlice } from "../../src/store";
import { useAuthStore } from "../../src/hooks";
import { newUserCredentials, testUserCredentials } from "../fixtures/testUser";
import { api } from "../../src/api";

const getMockStore = (initialState) => {
	return configureStore({
		reducer: {
			auth: authSlice.reducer,
		},
		preloadedState: {
			auth: { ...initialState },
		},
	});
};

describe("Pruebas en useAuthStore", () => {
	beforeEach(() => localStorage.clear());

	test("Debe de regresar los valores por defecto", () => {
		const mockStore = getMockStore(initialState);
		const { result } = renderHook(() => useAuthStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		expect(result.current).toEqual({
			errorMessage: undefined,
			status: "not-authenticated",
			user: {},
			checkAuthToken: expect.any(Function),
			startLogin: expect.any(Function),
			startLogout: expect.any(Function),
			startRegister: expect.any(Function),
		});
	});

	test("StartLogin debe de realizar el login correctamente", async () => {
		const mockStore = getMockStore({ ...notAuthenticatedState });
		const { result } = renderHook(() => useAuthStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		const spy = jest.spyOn(api, "post").mockReturnValue({
			data: {
				ok: true,
				uid: testUserCredentials.uid,
				name: testUserCredentials.name,
				token: "ALGUN_TOKEN",
			},
		});

		await act(async () => {
			await result.current.startLogin(testUserCredentials);
		});

		const { errorMessage, status, user } = result.current;

		expect({ errorMessage, status, user }).toEqual({
			errorMessage: undefined,
			status: "authenticated",
			user: {
				name: testUserCredentials.name,
				uid: testUserCredentials.uid,
			},
		});

		expect(localStorage.getItem("token")).toEqual(expect.any(String));
		expect(localStorage.getItem("token-init-date")).toEqual(expect.any(String));

		spy.mockRestore();
	});

	test("startRegister debe de crear un usuario", async () => {
		const mockStore = getMockStore({ ...notAuthenticatedState });
		const { result } = renderHook(() => useAuthStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		const spy = jest.spyOn(api, "post").mockReturnValue({
			data: {
				ok: true,
				uid: "ALGUN_ID",
				name: newUserCredentials.name,
				token: "ALGUN_TOKEN",
			},
		});

		await act(async () => {
			await result.current.startRegister(newUserCredentials);
		});

		const { errorMessage, status, user } = result.current;

		expect({ errorMessage, status, user }).toEqual({
			errorMessage: undefined,
			status: "authenticated",
			user: { name: newUserCredentials.name, uid: "ALGUN_ID" },
		});

		spy.mockRestore();
	});

	test("checkAuthToken debe de fallar si no hay token", async () => {
		const mockStore = getMockStore({ ...initialState });
		const { result } = renderHook(() => useAuthStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		await act(async () => {
			await result.current.checkAuthToken();
		});

		const { errorMessage, status, user } = result.current;

		expect({ errorMessage, status, user }).toEqual({
			errorMessage: undefined,
			status: "not-authenticated",
			user: {},
		});
	});

	test("checkAuthToken debe de autenticar al usuario si hay token", async () => {
		localStorage.setItem("token", "ALGUN_TOKEN");

		const mockStore = getMockStore({ ...initialState });
		const { result } = renderHook(() => useAuthStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		const spy = jest.spyOn(api, "get").mockReturnValue({
			data: {
				ok: true,
				uid: testUserCredentials.uid,
				name: testUserCredentials.name,
				token: "ALGUN_TOKEN",
			},
		});

		await act(async () => {
			await result.current.checkAuthToken();
		});

		const { errorMessage, status, user } = result.current;

		expect({ errorMessage, status, user }).toEqual({
			errorMessage: undefined,
			status: "authenticated",
			user: {
				name: testUserCredentials.name,
				uid: testUserCredentials.uid,
			},
		});

		spy.mockRestore();
	});
});
