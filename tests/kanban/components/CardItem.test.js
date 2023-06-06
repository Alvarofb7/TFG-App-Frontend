import { fireEvent, render } from "@testing-library/react";
import { useKanbanStore, useUiStore } from "../../../src/hooks";
import { CardItem } from "../../../src/kanban/components/CardItem";
import { taskWithId } from "../../fixtures/kanbanStates";
import { Draggable } from "react-beautiful-dnd";

jest.mock("../../../src/hooks/useKanbanStore");
jest.mock("../../../src/hooks/useUiStore");

jest.mock("react-beautiful-dnd", () => ({
	Draggable: jest.fn(({ children }) => children({})),
}));

describe("Pruebas en el componente CardItem", () => {
	const mockOpenKanbanModal = jest.fn();
	const mockStartDeleteTask = jest.fn();
	const mockSetActiveTask = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		jest.clearAllTimers();
	});

	test("Debe de mostrar el componente correctamente", () => {
		useUiStore.mockReturnValue({
			openKanbanModal: mockOpenKanbanModal,
		});

		useKanbanStore.mockReturnValue({
			setActiveTask: mockSetActiveTask,
			startDeleteTask: mockStartDeleteTask,
		});

		const { container } = render(<CardItem data={taskWithId} index={1} />);

		expect(container).toMatchSnapshot();
	});

	test("Debe mostrar el título correctamente", () => {
		useUiStore.mockReturnValue({
			openKanbanModal: mockOpenKanbanModal,
		});

		useKanbanStore.mockReturnValue({
			setActiveTask: mockSetActiveTask,
			startDeleteTask: mockStartDeleteTask,
		});

		const { getByText } = render(<CardItem data={taskWithId} index={1} />);
		const title = getByText("Prueba");
		expect(title).toBeInTheDocument();
	});

	test("Debe llamar a la función para abrir el modal al hacer clic en el componente", () => {
		useUiStore.mockReturnValue({
			openKanbanModal: mockOpenKanbanModal,
		});

		useKanbanStore.mockReturnValue({
			setActiveTask: mockSetActiveTask,
			startDeleteTask: mockStartDeleteTask,
		});
		const { getByText } = render(<CardItem data={taskWithId} index={1} />);
		const cardContainer = getByText("Prueba");
		fireEvent.click(cardContainer);
		expect(mockSetActiveTask).toHaveBeenCalledWith(taskWithId);
		expect(mockOpenKanbanModal).toHaveBeenCalled();
	});

	test("Debe llamar a la función para eliminar la tarea al hacer clic en el botón de eliminar", () => {
		useUiStore.mockReturnValue({
			openKanbanModal: mockOpenKanbanModal,
		});

		useKanbanStore.mockReturnValue({
			setActiveTask: mockSetActiveTask,
			startDeleteTask: mockStartDeleteTask,
		});
		const { getByLabelText } = render(<CardItem data={taskWithId} index={1} />);
		const deleteButton = getByLabelText("btn-delete-task");
		
		fireEvent.click(deleteButton);
		expect(mockStartDeleteTask).toHaveBeenCalledWith(taskWithId.id);
	});

	test("Debe renderizar el componente Draggable correctamente", () => {
		useUiStore.mockReturnValue({
			openKanbanModal: mockOpenKanbanModal,
		});

		useKanbanStore.mockReturnValue({
			setActiveTask: mockSetActiveTask,
			startDeleteTask: mockStartDeleteTask,
		});
		render(<CardItem data={taskWithId} index={1} />);
		expect(Draggable).toHaveBeenCalledWith(
			expect.objectContaining({
				draggableId: taskWithId.id,
				index: 1,
			}),
			{}
		);
	});
});
