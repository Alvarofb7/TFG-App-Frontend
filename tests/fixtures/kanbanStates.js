import { status } from "../../src/kanban/interfaces/Status";
import { testUserCredentials } from "./testUser";

export const kanbanInitialState = {
	activeTask: null,
	tasks: [],
};

export const taskWithId = {
	title: "Prueba",
	description: "",
	status: status.inProgress,
	finish: expect.any(Date),
	user: testUserCredentials,
	id: "1",
};

export const taskWithoutId = {
	title: "Prueba",
	description: "",
	status: status.inProgress,
	finish: expect.any(Date),
	user: testUserCredentials,
};

export const taskDone = {
	title: "Prueba",
	description: "",
	status: status.done,
	finish: expect.any(Date),
	user: testUserCredentials,
	id: "1",
};

export const taskWithIdUpdated = {
	title: "Titulo actualizado",
	description: "",
	status: status.done,
	finish: expect.any(Date),
	user: testUserCredentials,
	id: "1",
};

export const taskWithOtherId = {
	title: "Prueba",
	description: "",
	status: status.inProgress,
	finish: expect.any(Date),
	user: testUserCredentials,
	id: "2",
};

export const kanbanWithTaskState = {
	activeTask: null,
	tasks: [taskWithId],
};

export const kanbanWithActiveTaskState = {
	activeTask: taskWithId,
	tasks: [taskWithId],
};

export const kanbanWithTaskInDoneState = {
	activeTask: null,
	tasks: [taskWithId, taskDone],
};
