import { createSlice } from "@reduxjs/toolkit";
import { status } from "../../kanban/interfaces/Status";

export const kanbanSlice = createSlice({
	name: "kanban",
	initialState: {
		activeTask: null,
		tasks: [],
	},
	reducers: {
		onLoadTasks: (state, { payload }) => {
			state.tasks = payload;
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
		onLogoutKanban: (state) => {
			state.activeTask = null;
			state.tasks = [];
		},
	},
});

export const {
	onAddNewTask,
	onDeleteAllTasksDone,
	onDeleteTask,
	onQuitActiveTask,
	onLoadTasks,
	onLogoutKanban,
	onSetActiveTask,
	onUpdateTask,
} = kanbanSlice.actions;
