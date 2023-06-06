import {
	kanbanSlice,
	onAddNewTask,
	onDeleteAllTasksDone,
	onDeleteTask,
	onLoadTasks,
	onLogoutKanban,
	onQuitActiveTask,
	onSetActiveTask,
	onUpdateTask,
} from "../../../src/store/kanban/kanbanSlice";
import {
	kanbanInitialState,
	kanbanWithActiveTaskState,
	kanbanWithTaskInDoneState,
	kanbanWithTaskState,
	taskWithId,
	taskWithIdUpdated,
	taskWithOtherId,
} from "../../fixtures/kanbanStates";

describe("Pruebas en kanbanSlice", () => {
	test("Debe de retornar el estado inicial", () => {
		expect(kanbanSlice.getInitialState()).toEqual(kanbanInitialState);
	});

	test("Debe de obtener las tareas correctamente", () => {
		const state = kanbanSlice.reducer(
			kanbanInitialState,
			onLoadTasks([taskWithId])
		);

		expect(state).toEqual(kanbanWithTaskState);
	});

	test("Debe de activar una tarea correctamente", () => {
		const state = kanbanSlice.reducer(
			kanbanWithTaskState,
			onSetActiveTask(taskWithId)
		);

		expect(state).toEqual(kanbanWithActiveTaskState);
	});

	test("Debe de quitar la tarea activa correctamente", () => {
		const state = kanbanSlice.reducer(
			kanbanWithActiveTaskState,
			onQuitActiveTask()
		);

		expect(state).toEqual(kanbanWithTaskState);
	});

	test("Debe de guardar una tarea correctamente", () => {
		const state = kanbanSlice.reducer(
			kanbanInitialState,
			onAddNewTask(taskWithId)
		);

		expect(state).toEqual(kanbanWithTaskState);
	});

	test("Debe de actualizar una tarea correctamente", () => {
		const state = kanbanSlice.reducer(
			kanbanWithTaskState,
			onUpdateTask(taskWithIdUpdated)
		);

		expect(state).toEqual({
			activeTask: null,
			tasks: [taskWithIdUpdated],
		});
	});

	test("No debe de actualizar ninguna tarea si no coincide el id", () => {
		const state = kanbanSlice.reducer(
			kanbanWithTaskState,
			onUpdateTask(taskWithOtherId)
		);

		expect(state).toEqual(kanbanWithTaskState);
	});

	test("Debe de eliminar correctamente", () => {
		const state = kanbanSlice.reducer(
			kanbanWithTaskState,
			onDeleteTask(taskWithId)
		);

		expect(state).toEqual(kanbanInitialState);
	});

	test("No debe de eliminar ninguna nota si no existe tarea con ese id", () => {
		const state = kanbanSlice.reducer(
			kanbanWithTaskState,
			onDeleteTask(taskWithOtherId)
		);

		expect(state).toEqual(kanbanWithTaskState);
	});

	test("Debe de eliminar todas las tareas terminadas correctamente", () => {
		expect(kanbanWithTaskInDoneState.tasks.length).toBe(2);

		const state = kanbanSlice.reducer(
			kanbanWithTaskInDoneState,
			onDeleteAllTasksDone()
		);

		expect(state.tasks.length).toBe(1);
	});

	test("Debe de retornar el estado inicial tras cerrar sesión", () => {
		const state = kanbanSlice.reducer(kanbanWithTaskState, onLogoutKanban());

		expect(state).toEqual(kanbanInitialState);
	});
});
