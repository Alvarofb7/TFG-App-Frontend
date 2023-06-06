import { configureStore } from "@reduxjs/toolkit";
import { authSlice, kanbanSlice } from "../../src/store";
import { testUserCredentials } from "../fixtures/testUser";
import {
	kanbanInitialState,
	kanbanWithActiveTaskState,
	kanbanWithTaskInDoneState,
	kanbanWithTaskState,
	taskWithId,
	taskWithIdUpdated,
	taskWithoutId,
} from "../fixtures/kanbanStates";
import { act, renderHook } from "@testing-library/react";
import { useKanbanStore } from "../../src/hooks";
import { Provider } from "react-redux";
import { api } from "../../src/api";

const getMockStore = (kanbanInitialState) => {
	return configureStore({
		reducer: {
			kanban: kanbanSlice.reducer,
			auth: authSlice.reducer,
		},
		preloadedState: {
			kanban: { ...kanbanInitialState },
			auth: {
				status: "authenticated",
				user: testUserCredentials,
				errorMessage: undefined,
			},
		},
	});
};

describe("Pruebas en useKanbanStore", () => {
	beforeEach(() => {
		localStorage.clear();
		jest.clearAllMocks();
	});

	test("Debe de retornar el estado inicial", () => {
		const mockStore = getMockStore({ ...kanbanInitialState });
		const { result } = renderHook(() => useKanbanStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		expect(result.current).toEqual({
			activeTask: null,
			tasks: [],

			//* Methods
			quitActiveTask: expect.any(Function),
			setActiveTask: expect.any(Function),
			startAddNewTask: expect.any(Function),
			startDeleteAllTasksInDone: expect.any(Function),
			startDeleteTask: expect.any(Function),
			startLoadingTasks: expect.any(Function),
			updateTask: expect.any(Function),
		});
	});

	test("startLoadingTasks debe de obtener las tareas", async () => {
		const { data } = await api.post("/auth", testUserCredentials);
		localStorage.setItem("token", data.token);

		const mockStore = getMockStore({ ...kanbanInitialState });

		const { result } = renderHook(() => useKanbanStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		const mockedResponse = {
			ok: true,
			tasks: [taskWithId],
		};

		const spy = jest
			.spyOn(api, "get")
			.mockReturnValue({ data: mockedResponse });

		await act(async () => {
			await result.current.startLoadingTasks();
		});

		const { tasks } = result.current;

		expect(tasks).toEqual([taskWithId]);

		spy.mockRestore();
	});

	test("setActiveTask debe de activar una nota", async () => {
		const { data } = await api.post("/auth", testUserCredentials);
		localStorage.setItem("token", data.token);

		const mockStore = getMockStore({ ...kanbanWithTaskState });

		const { result } = renderHook(() => useKanbanStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		act(() => {
			result.current.setActiveTask(taskWithId);
		});

		const { tasks, activeTask } = result.current;

		expect({ tasks, activeTask }).toEqual(kanbanWithActiveTaskState);
	});

	test("quitActiveTask debe de quitar una nota activa", async () => {
		const { data } = await api.post("/auth", testUserCredentials);
		localStorage.setItem("token", data.token);

		const mockStore = getMockStore({ ...kanbanWithActiveTaskState });

		const { result } = renderHook(() => useKanbanStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		act(() => {
			result.current.quitActiveTask();
		});

		const { tasks, activeTask } = result.current;

		expect({ tasks, activeTask }).toEqual(kanbanWithTaskState);
	});

	test("startAddNewTask debe de añadir una tarea", async () => {
		const { data } = await api.post("/auth", testUserCredentials);
		localStorage.setItem("token", data.token);

		const mockStore = getMockStore({ ...kanbanInitialState });

		const { result } = renderHook(() => useKanbanStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		const mockedResponse = {
			ok: true,
			task: taskWithId,
		};

		const spy = jest
			.spyOn(api, "post")
			.mockReturnValue({ data: mockedResponse });

		await act(async () => {
			await result.current.startAddNewTask(taskWithoutId);
		});

		const { tasks } = result.current;

		expect(tasks).toEqual([taskWithId]);

		spy.mockRestore();
	});

	test("startAddNewTask/updateTask debe de actualizar una tarea", async () => {
		const { data } = await api.post("/auth", testUserCredentials);
		localStorage.setItem("token", data.token);

		const mockStore = getMockStore({ ...kanbanWithTaskState });

		const { result } = renderHook(() => useKanbanStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		const spy = jest.spyOn(api, "put").mockReturnValue();

		await act(async () => {
			await result.current.startAddNewTask(taskWithIdUpdated);
		});

		const { tasks } = result.current;

		expect(tasks).toEqual([taskWithIdUpdated]);

		spy.mockRestore();
	});

	test("startDeleteAllTasksInDone debe de eliminar todas las tareas terminadas", async () => {
		const { data } = await api.post("/auth", testUserCredentials);
		localStorage.setItem("token", data.token);

		const mockStore = getMockStore({ ...kanbanWithTaskInDoneState });

		const { result } = renderHook(() => useKanbanStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		const spy = jest.spyOn(api, "delete").mockReturnValue();

		await act(async () => {
			await result.current.startDeleteAllTasksInDone();
		});

		const { tasks } = result.current;

		expect(tasks).toEqual(kanbanWithTaskState.tasks);

		spy.mockRestore();
	});
});
