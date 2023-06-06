import { fireEvent, render, screen } from "@testing-library/react";
import { useKanbanStore, useUiStore } from "../../../src/hooks";
import Swal from "sweetalert2";
import { status } from "../../../src/kanban/interfaces";
import { addHours } from "date-fns";
import { ContainerCards } from "../../../src/kanban/components/ContainerCards";

jest.mock("../../../src/hooks/useKanbanStore");
jest.mock("../../../src/hooks/useUiStore");
jest.mock("sweetalert2", () => ({
	fire: jest.fn(() => Promise.resolve({ isConfirmed: true })),
}));

jest.mock("react-beautiful-dnd", () => ({
	Droppable: jest.fn(({ children }) => children({})),
	Draggable: jest.fn(({ children }) => children({}, {})),
}));

describe("Pruebas en el componente ContainerCards", () => {
	const mockOpenKanbanModal = jest.fn();
	const mockStartDeleteAllTasksInDone = jest.fn();
	const mockSetActiveTask = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		jest.clearAllTimers();
	});

	const tasks = [
		{
			id: "1",
			title: "Task 1",
			status: status.toDo,
			finish: addHours(new Date(), 2),
		},
		{
			id: "2",
			title: "Task 2",
			status: status.inProgress,
			finish: addHours(new Date(), 2),
		},
		{
			id: "3",
			title: "Task 3",
			status: status.done,
			finish: addHours(new Date(), 2),
		},
	];

	test("Debe llamar a la función para abrir el modal al hacer clic en el botón de agregar", () => {
		useUiStore.mockReturnValue({ openKanbanModal: mockOpenKanbanModal });
		useKanbanStore.mockReturnValue({
			setActiveTask: mockSetActiveTask,
			startDeleteAllTasksInDone: mockStartDeleteAllTasksInDone,
		});

		const { getByLabelText } = render(
			<ContainerCards status={status.toDo} items={tasks} />
		);

		const addButton = getByLabelText("btn-add-task");
		fireEvent.click(addButton);

		expect(mockSetActiveTask).toHaveBeenCalled();
		expect(mockOpenKanbanModal).toHaveBeenCalled();
	});

	test("Debe llamar a la función para eliminar todas las tareas terminadas al hacer clic en el botón de eliminar", async () => {
		useUiStore.mockReturnValue({ openKanbanModal: mockOpenKanbanModal });
		useKanbanStore.mockReturnValue({
			setActiveTask: mockSetActiveTask,
			startDeleteAllTasksInDone: mockStartDeleteAllTasksInDone,
		});

		const { getByLabelText } = render(
			<ContainerCards status={status.done} items={tasks} />
		);

		const deleteButton = getByLabelText("btn-delete-all-task-done");
		fireEvent.click(deleteButton);

		await Promise.resolve();

		expect(Swal.fire).toHaveBeenCalled();
		expect(mockStartDeleteAllTasksInDone).toHaveBeenCalled();
	});

	test("Debe renderizar el componente Droppable correctamente", () => {
		useUiStore.mockReturnValue({ openKanbanModal: mockOpenKanbanModal });
		useKanbanStore.mockReturnValue({
			setActiveTask: mockSetActiveTask,
			startDeleteAllTasksInDone: mockStartDeleteAllTasksInDone,
		});
		render(<ContainerCards status={status.toDo} items={tasks} />);

		const droppableElement = screen.getByText(status.toDo);

		expect(droppableElement).toBeInTheDocument();
	});
});
