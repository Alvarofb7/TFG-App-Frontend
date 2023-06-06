import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { useKanbanStore } from "../../../src/hooks";
import { kanbanSlice, uiSlice } from "../../../src/store";
import { kanbanInitialState } from "../../fixtures/kanbanStates";
import { DragAndDrop } from "../../../src/kanban/components/DragAndDrop";
import { status } from "../../../src/kanban/interfaces";

jest.mock("../../../src/hooks/useKanbanStore");

const mockStartLoadingTasks = jest.fn();
const mockUpdateTask = jest.fn();

const getMockStore = (initialState) => {
	return configureStore({
		reducer: {
			kanban: kanbanSlice.reducer,
			ui: uiSlice.reducer,
		},
		preloadedState: {
			kanban: { ...initialState },
			ui: { isCalendarModalOpen: false, isKanbanModalOpen: false },
		},
	});
};

describe("Pruebas en DragAndDrop component", () => {
	beforeEach(() => {
		useKanbanStore.mockReturnValue({
			startLoadingTasks: mockStartLoadingTasks,
			updateTask: mockUpdateTask,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test("Debe llamar a startLoadingTasks al montarse", () => {
		const mockStore = getMockStore(kanbanInitialState);
		render(
			<Provider store={mockStore}>
				<DragAndDrop />
			</Provider>
		);

		expect(mockStartLoadingTasks).toHaveBeenCalledTimes(1);
	});

	test("Debe renderizar ContainerCards para cada status", () => {
		const mockStore = getMockStore(kanbanInitialState);
		render(
			<Provider store={mockStore}>
				<DragAndDrop />
			</Provider>
		);

		const toDoContainer = screen.getByText(status.toDo);
		const inProgressContainer = screen.getByText(status.done);
		const doneContainer = screen.getByText(status.inProgress);

		expect(toDoContainer).toBeInTheDocument();
		expect(inProgressContainer).toBeInTheDocument();
		expect(doneContainer).toBeInTheDocument();
	});
});
