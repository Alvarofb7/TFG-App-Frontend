import { fireEvent, render, screen } from "@testing-library/react";
import { useKanbanStore, useUiStore } from "../../../src/hooks";
import { TaskModal } from "../../../src/kanban/components/TaskModal";
import { taskWithId } from "../../fixtures/kanbanStates";

jest.mock("../../../src/hooks/useUiStore");
jest.mock("../../../src/hooks/useKanbanStore");

describe("Pruebas en el componente TaskModal", () => {
	const mockStartAddNewTask = jest.fn();
	const mockQuitActiveEvent = jest.fn();
	const mockCloseKanbanModal = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		jest.clearAllTimers();
	});

	test("Debe de mostrarse el componente y el título 'Editar Tarea' si la tarea tiene id", () => {
		useKanbanStore.mockReturnValue({
			activeTask: { id: "1" },
			startAddNewTask: mockStartAddNewTask,
			quitActiveTask: mockQuitActiveEvent,
		});

		useUiStore.mockReturnValue({
			isKanbanModalOpen: true,
			closeKanbanModal: mockCloseKanbanModal,
		});

		render(<TaskModal />);

		const titleModal = screen.getByText("Editar Tarea");
		const form = screen.getByLabelText("form-task");
		const titleInput = screen.getByRole("textbox", { name: "title" });

		expect(titleModal).toBeInTheDocument();
		expect(form).toBeInTheDocument();
		expect(titleInput).toBeInTheDocument();
	});

	test("Debe de mostrarse el componente y el título 'Nueva Tarea' si la tarea no tiene id", () => {
		useKanbanStore.mockReturnValue({
			activeTask: null,
			startAddNewTask: mockStartAddNewTask,
			quitActiveTask: mockQuitActiveEvent,
		});

		useUiStore.mockReturnValue({
			isKanbanModalOpen: true,
			closeKanbanModal: mockCloseKanbanModal,
		});

		render(<TaskModal />);

		const titleModal = screen.getByText("Nueva Tarea");
		const form = screen.getByLabelText("form-task");
		const titleInput = screen.getByRole("textbox", { name: "title" });

		expect(titleModal).toBeInTheDocument();
		expect(form).toBeInTheDocument();
		expect(titleInput).toBeInTheDocument();
	});

	test("No debe de mostrar el componente", () => {
		useKanbanStore.mockReturnValue({
			activeTask: null,
			startAddNewTask: mockStartAddNewTask,
			quitActiveTask: mockQuitActiveEvent,
		});

		useUiStore.mockReturnValue({
			isKanbanModalOpen: false,
			closeKanbanModal: mockCloseKanbanModal,
		});

		render(<TaskModal />);

		const form = screen.queryByText("form-task");

		expect(form).toBeNull();
	});

	test("Debe llamar a la función startAddNewTask al hacer clic en el botón 'Guardar' si se cumplen las condiciones", () => {
		useKanbanStore.mockReturnValue({
			activeTask: null,
			startAddNewTask: mockStartAddNewTask,
			quitActiveTask: mockQuitActiveEvent,
		});

		useUiStore.mockReturnValue({
			isKanbanModalOpen: true,
			closeKanbanModal: mockCloseKanbanModal,
		});

		render(<TaskModal />);

		const titleExample = "Titulo";

		const titleInput = screen.getByRole("textbox", { name: "title" });
		fireEvent.change(titleInput, {
			target: { name: "title", value: titleExample },
		});

		const saveButton = screen.getByText("Guardar");
		fireEvent.click(saveButton);

		expect(mockStartAddNewTask).toHaveBeenCalledTimes(1);
		expect(mockCloseKanbanModal).toHaveBeenCalledTimes(1);
	});

	test("No debe llamar a la función startAddNewTask al hacer clic en el botón 'Guardar' si no se cumplen las condiciones", () => {
		useKanbanStore.mockReturnValue({
			activeTask: null,
			startAddNewTask: mockStartAddNewTask,
			quitActiveTask: mockQuitActiveEvent,
		});

		useUiStore.mockReturnValue({
			isKanbanModalOpen: true,
			closeKanbanModal: mockCloseKanbanModal,
		});

		render(<TaskModal />);

		const saveButton = screen.getByText("Guardar");
		fireEvent.click(saveButton);

		expect(mockStartAddNewTask).toHaveBeenCalledTimes(0);
	});
});
