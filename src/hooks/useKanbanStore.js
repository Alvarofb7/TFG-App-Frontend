import { useDispatch, useSelector } from "react-redux";
import {
	onAddNewTask,
	onDeleteAllTasksDone,
	onDeleteTask,
	onLoadTasks,
	onQuitActiveTask,
	onSetActiveTask,
	onUpdateTask,
} from "../store";
import Swal from "sweetalert2";
import { api } from "../api";
import { convertTaskToDateTask } from "../helpers/convertTaskToDateTask";

export const useKanbanStore = () => {
	const dispatch = useDispatch();
	const { activeTask, isLoadingTasks, tasks } = useSelector(
		(state) => state.kanban
	);
	const { user } = useSelector((state) => state.auth);

	const startLoadingTasks = async () => {
		try {
			const { data } = await api.get("/kanban");
			const tasks = convertTaskToDateTask(data.tasks);

			dispatch(onLoadTasks(tasks));
		} catch (error) {
			console.log(error);
			Swal.fire(
				"Error al cargar las tareas",
				"No se han podido cargar los elementos",
				"error"
			);
		}
	};

	const setActiveTask = (task) => {
		dispatch(onSetActiveTask(task));
	};

	const quitActiveTask = () => {
		dispatch(onQuitActiveTask());
	};

	const startAddNewTask = async (task) => {
		try {
			if (task.id) {
				// Actualizamos
				const updatedTask = {
					...task,
				};

				await updateTask(updatedTask);
			} else {
				// Creamos
				const { data } = await api.post("/kanban", task);

				dispatch(onAddNewTask({ ...task, id: data.task.id, user }));
			}
		} catch (error) {
			console.log(error);
			Swal.fire(
				"Error al guardar",
				error.response?.data?.msg || "No se ha podido crear la tarea",
				"error"
			);
		}
	};

	const updateTask = async (task) => {
		try {
			await api.put(`/kanban/${task.id}`, task);

			dispatch(onUpdateTask({ ...task }));
		} catch (error) {
			console.log(error);
			Swal.fire(
				"Error al guardar",
				error.response?.data?.msg || "No se ha podido crear la tarea",
				"error"
			);
		}
	};

	const startDeleteTask = async (id) => {
		try {
			await api.delete(`/kanban/delete/${id}`);

			dispatch(onDeleteTask({ id }));
		} catch (error) {
			console.log(error);
			Swal.fire(
				"Error al eliminar",
				error.response?.data?.msg || "No se ha podido eliminar la tarea",
				"error"
			);
		}
	};

	const startDeleteAllTasksInDone = async () => {
		try {
			await api.delete("/kanban/deleteTasksDone");

			dispatch(onDeleteAllTasksDone());
		} catch (error) {
			console.log(error);
			Swal.fire(
				"Error al eliminar",
				"No se han podido eliminar las tareas",
				"error"
			);
		}
	};

	return {
		//* Properties
		activeTask,
		isLoadingTasks,
		tasks,
		hasTasksSelected: !!activeTask?.id,

		//* Methods
		quitActiveTask,
		setActiveTask,
		startAddNewTask,
		startDeleteAllTasksInDone,
		startDeleteTask,
		startLoadingTasks,
		updateTask,
	};
};
