import { render, screen } from "@testing-library/react";
import { KanbanPage } from "../../../src/kanban/pages/KanbanPage";
import { useKanbanStore } from "../../../src/hooks";
import { kanbanInitialState } from "../../fixtures/kanbanStates";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { kanbanSlice, uiSlice } from "../../../src/store";
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

describe("Pruebas en la página KanbanPage", () => {
	beforeEach(() => {
		useKanbanStore.mockReturnValue({
			startLoadingTasks: mockStartLoadingTasks,
			updateTask: mockUpdateTask,
		});
	});

	test("Debe de mostrarse la página correctamente", () => {
		const mockStore = getMockStore(kanbanInitialState);
		render(
			<Provider store={mockStore}>
				<KanbanPage />
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
