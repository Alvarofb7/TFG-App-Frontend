import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";
import { status } from "../../kanban/interfaces/Status";

const tempTask = {
	id: new Date().getTime(),
	title: "Prueba titulo",
	description: "Prueba descripcion",
	status: status.inPogress,
	finish: addHours(new Date(), 2),
	user: {
		id: "ABC",
		name: "Alvaro",
	},
};

export const kanbanSlice = createSlice({
	name: "kanban",
	initialState: {
		activeTask: null,
		isLoadingTasks: true,
		tasks: [
			// tempTask
		],
	},
	reducers: {
		onLoadTasks: (state, { payload }) => {
			state.tasks = payload;
			state.isLoadingTasks = false;
		},
		onSetActiveTask: (state, { payload }) => {
			state.activeTask = payload;
		},
		onQuitActiveTask: (state) => {
			state.activeTask = null;
		},
		onAddNewTask: (state, { payload }) => {
			state.tasks.push(payload);
		},
		onUpdateTask: (state, { payload }) => {
			state.tasks = state.tasks.map((task) => {
				if (task.id === payload.id) {
					return payload;
				}
				return task;
			});
		},
		onDeleteTask: (state, { payload }) => {
			state.tasks = state.tasks.filter((task) => task.id !== payload?.id);
		},
		onDeleteAllTasksDone: (state) => {
			state.tasks = state.tasks.filter((task) => task.status !== status.done);
		},
	},
});

export const {
	onAddNewTask,
	onDeleteAllTasksDone,
	onDeleteTask,
	onQuitActiveTask,
	onLoadTasks,
	onSetActiveTask,
	onUpdateTask,
} = kanbanSlice.actions;
