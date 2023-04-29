import { parseISO } from "date-fns";

export const convertTaskToDateTask = (tasks = []) => {
	return tasks.map((task) => {
		task.finish = parseISO(task.finish);

		return task;
	});
};
