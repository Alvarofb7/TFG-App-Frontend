import { fireEvent, render, screen } from "@testing-library/react";
import { FabAddNew } from "../../../src/calendar/components/FabAddNew";
import { useCalendarStore, useUiStore } from "../../../src/hooks";

jest.mock("../../../src/hooks/useUiStore");
jest.mock("../../../src/hooks/useCalendarStore");

describe("Pruebas del componente FabAddNew", () => {
	const mockOpenCalendarModal = jest.fn();
	const mockSetActiveEvent = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		jest.clearAllTimers();
	});

	test("Debe de mostrar el componente correctamente", () => {
		useUiStore.mockReturnValue({
			openCalendarModal: jest.fn(),
		});

		useCalendarStore.mockReturnValue({
			setActiveEvent: jest.fn(),
		});

		render(<FabAddNew />);

		const btn = screen.getByLabelText("btn-add-event");

		expect(btn.classList).toContain("btn");
		expect(btn.classList).toContain("btn-primary");
		expect(btn.classList).toContain("fab");
	});

	test("Debe de llamar a setActiveEvent y openCalendarModal al hacer click", () => {
		useUiStore.mockReturnValue({
			openCalendarModal: mockOpenCalendarModal,
		});

		useCalendarStore.mockReturnValue({
			setActiveEvent: mockSetActiveEvent,
		});

		render(<FabAddNew />);
		const btn = screen.getByLabelText("btn-add-event");
		fireEvent.click(btn);

    expect(mockSetActiveEvent).toHaveBeenCalled();
    expect(mockOpenCalendarModal).toHaveBeenCalled();
	});
});
